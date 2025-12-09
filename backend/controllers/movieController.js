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
    const movies = await Movie.findAll();

    // 승률 계산 (JS 처리)
    const rankedMovies = movies
      .map((m) => {
        const data = m.toJSON();
        const winRate =
          data.matchCount === 0 ? 0 : (data.winCount / data.matchCount) * 100;
        return { ...data, winRate };
      })
      .sort((a, b) => b.winRate - a.winRate); // 승률 내림차순

    res.json(rankedMovies.slice(0, 30)); // 상위 30개
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "랭킹 조회 실패" });
  }
};
