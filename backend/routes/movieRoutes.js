const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// 주소 정의
router.get("/game/candidates", movieController.getCandidates); // 후보 뽑기
router.post("/game/result", movieController.saveResult); // 결과 저장
router.get("/ranks", movieController.getRanks); // 랭킹 조회
router.get("/game/recommend/:movieId", movieController.getRecommendations);

module.exports = router;
