import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.listen(<string>process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
