import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { userRoutes, bikeRoutes, reservationRoutes } from "./controllers";
import { authorizeRole, authorizeUser } from "./controllers/middlewares/auth";

import { UserRoleEnum } from "./models/model.type";

const db = require("./models");
const app = express();

app.use(cors());
app.get("/", async (req, res) => {
  const bikes = await db.Bikes.findAll();
  res.status(200).send(bikes);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/bikes", authorizeUser, bikeRoutes);
app.use("/reservations", authorizeUser, reservationRoutes);

app.listen(<string>process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
