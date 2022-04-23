import express from "express";
const db = require("./models");
const app = express();

app.get("/", async (req, res) => {
  const bikes = await db.Bikes.findAll();
  res.status(200).send(bikes);
});

app.listen(<string>process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
