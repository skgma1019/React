const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const initData = require("./utils/initData");
const authRoutes = require("./routes/authRoutes");
const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use("/api", movieRoutes);
app.use("/api/auth", authRoutes);
// 서버 실행 및 DB 연결
const startServer = async () => {
  try {
    await sequelize.authenticate(); // DB 연결 확인
    await sequelize.sync(); // 테이블 생성
    console.log("💾 DB 연결 성공!");

    // await initData(); // 데이터 적재 실행

    app.listen(8080, () => {
      console.log("🚀 서버 가동 중: http://localhost:8080");
    });
  } catch (err) {
    console.error("서버 시작 실패:", err);
  }
};

startServer();
