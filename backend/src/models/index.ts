import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  <string>process.env.DB_NAME,
  <string>process.env.DB_USER,
  <string>process.env.DB_PASSWORD,
  {
    host: <string>process.env.DB_HOST,
    dialect: "postgres",
  }
);
