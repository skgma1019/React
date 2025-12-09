const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // 위에서 만든 연결 가져오기

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genreIds: {
      type: DataTypes.JSON, // 핵심: 배열 저장용
      allowNull: true,
    },
    winCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    matchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "Movies",
  }
);

module.exports = Movie;
