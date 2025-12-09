const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 주소 정의
router.post("/signup", authController.signup); // 회원가입
router.post("/login", authController.login); // 로그인

module.exports = router;
