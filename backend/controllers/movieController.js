const { Sequelize } = require("sequelize");
const Movie = require("../models/Movie");

// 1. 게임 후보 뽑기
exports.getCandidates = async (req, res) => {
  console.log("--------------------------------");
  console.log("🔍 요청 들어옴:", req.query);
  const genre = req.query.genre;
  const round = parseInt(req.query.round);

  const allowedRounds = [4, 8, 16, 32, 64, 128, 256, 512, 1024];
  const limitCount = allowedRounds.includes(round) ? round : 32;
  let whereCondition = {};

  if (genre) {
    // MySQL JSON 필드 검색 함수
    whereCondition = Sequelize.literal(`JSON_CONTAINS(genreIds, '${genre}')`);
  }

  try {
    const candidates = await Movie.findAll({
      where: whereCondition,
      order: Sequelize.literal("RAND()"),
      limit: limitCount,
    });
    if (candidates.length < limitCount) {
      console.log(
        `⚠️ 영화가 부족합니다. (요청: ${limitCount}, 실제: ${candidates.length})`
      );
    }
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "후보 추천 실패" });
  }
};

// 2. 게임 결과 저장
exports.saveResult = async (req, res) => {
  const { winnerId, loserId } = req.body;
  try {
    await Movie.increment(
      { winCount: 1, matchCount: 1 },
      { where: { id: winnerId } }
    );
    await Movie.increment({ matchCount: 1 }, { where: { id: loserId } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "결과 저장 실패" });
  }
};

// 3. 랭킹 조회
exports.getRanks = async (req, res) => {
  try {
    // 1. 페이지 설정 (기본 1페이지, 20개씩 보기)
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // 2. DB 조회 (승률 계산과 정렬을 동시에!)
    const { count, rows } = await Movie.findAndCountAll({
      attributes: {
        include: [
          // 🧠 핵심 로직: SQL에서 직접 승률 계산하기
          // (matchCount가 0이면 0점으로 처리해서 에러 방지)
          [
            Sequelize.literal(
              "CASE WHEN matchCount = 0 THEN 0 ELSE (winCount / matchCount) * 100 END"
            ),
            "winRate",
          ],
        ],
      },
      order: [
        [Sequelize.literal("winRate"), "DESC"], // 1순위: 승률 높은 순
        ["matchCount", "DESC"], // 2순위: 경기수 많은 순 (동점자 처리)
        ["name", "ASC"], // 3순위: 가나다 순
      ],
      limit: limit, // 20개만 가져오기
      offset: offset, // 건너뛰기
    });

    // 3. 응답 보내기
    res.json({
      success: true,
      page: page,
      totalMovies: count, // 전체 영화 수
      totalPages: Math.ceil(count / limit), // 전체 페이지 수
      data: rows, // 이번 페이지 데이터 (20개)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "랭킹 조회 실패" });
  }
};
