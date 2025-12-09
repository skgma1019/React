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
    // 1. 파라미터 받기
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // 👇 [추가됨] 장르 ID 받기 (없으면 전체 조회)
    const genre = req.query.genre;

    // 2. 필터 조건 만들기
    let whereCondition = {};
    if (genre && genre !== "ALL") {
      // JSON 배열 안에 해당 장르 ID가 있는지 검사 (MySQL 전용 함수)
      whereCondition = Sequelize.literal(`JSON_CONTAINS(genreIds, '${genre}')`);
    }

    // 3. DB 조회 (장르 필터 + 승률 계산 + 정렬)
    const { count, rows } = await Movie.findAndCountAll({
      where: whereCondition, // 👈 여기에 장르 필터가 들어감!
      attributes: {
        include: [
          // 승률 계산 로직 (기존과 동일)
          [
            Sequelize.literal(
              "CASE WHEN matchCount = 0 THEN 0 ELSE (winCount / matchCount) * 100 END"
            ),
            "winRate",
          ],
        ],
      },
      order: [
        [Sequelize.literal("winRate"), "DESC"], // 승률 높은 순
        ["matchCount", "DESC"], // 경기수 많은 순
        ["name", "ASC"],
      ],
      limit: limit,
      offset: offset,
    });

    // 4. 응답 보내기
    res.json({
      success: true,
      page: page,
      genre: genre || "ALL", // 현재 무슨 장르 랭킹인지 알려줌
      totalMovies: count, // 해당 장르의 총 영화 수
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "랭킹 조회 실패" });
  }
};
