import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import {
  adminRoutes,
  userRoutes,
  bikeRoutes,
  reservationRoutes,
} from "./routes";
import { authorizeRole, authorizeUser } from "./controllers/middlewares/auth";
import { errorHandler } from "./controllers/middlewares/errorHandler";
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

app.use("/users", userRoutes, errorHandler);
app.use("/bikes", authorizeUser, bikeRoutes, errorHandler);
app.use("/reviews", authorizeUser, reservationRoutes, errorHandler);
app.use("/reservations", authorizeUser, reservationRoutes, errorHandler);
app.use(
  "/admin",
  authorizeUser,
  authorizeRole(UserRoleEnum.Admin),
  adminRoutes,
  errorHandler
);

app.listen(<string>process.env.PORT, () => {
  console.log(`Connected to server on port ${process.env.PORT}`);
});
