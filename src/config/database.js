// src/config/database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "192.168.1.96",
  username: "lgomez",
  password: "MySQL2024*",
  database: "PPW",
});

module.exports = sequelize;
