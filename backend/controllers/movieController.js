const { Sequelize } = require("sequelize");
const { spawn } = require("child_process");
const path = require("path");
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
``;
exports.getRecommendations = async (req, res) => {
  // 👇 [수정됨] req.params 대신 req.query 사용!
  // 요청 URL 예시: /api/game/recommend?movieId=123
  const { movieId } = req.query;

  // 🛡️ 안전장치: movieId가 없으면 Python 돌리지 말고 바로 에러 반환
  if (!movieId) {
    return res.status(400).json({ error: "movieId 파라미터가 필요합니다." });
  }

  // 1. 파이썬 스크립트 경로 (utils 폴더 안에 있음)
  const pythonScriptPath = path.join(__dirname, "../utils/recommend_movie.py");

  // 2. 파이썬 실행
  const pythonProcess = spawn("python", [pythonScriptPath, movieId]);
  // ⚠️ 주의: Mac/Linux는 'python3'라고 써야 할 수도 있습니다!

  let resultData = "";

  // 3. 데이터 받기 (stdout)
  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  // 4. 에러 로그 (stderr)
  pythonProcess.stderr.on("data", (data) => {
    console.error(`🐍 Python Error: ${data}`);
  });

  // 5. 종료 시 응답
  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      return res.status(500).json({ error: "추천 시스템 오류" });
    }

    try {
      // 파이썬이 준 JSON 문자열을 진짜 자바스크립트 객체로 변환
      const recommendations = JSON.parse(resultData);

      console.log(
        `✨ 영화 ID ${movieId}에 대한 추천 ${recommendations.length}개 완료`
      );
      res.json(recommendations);
    } catch (err) {
      console.error("JSON 파싱 실패:", err);
      // 파싱 실패해도 에러 띄우지 말고 빈 배열 주거나 로그 확인
      res.json([]);
    }
  });
};
