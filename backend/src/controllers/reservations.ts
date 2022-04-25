import { Router } from "express";
import { authorizeRole } from "./middlewares/auth";
import { reservationService } from "../services";
import { BikesModel } from "../models";
import { TUserModel, UserRoleEnum } from "../models/model.type";

const router = Router();

router
  .get("/", async (req, res, next) => {
    const user: TUserModel = (req as any).user;
    try {
      const reservations = await reservationService.findAllBy({
        where: { userId: user.id },
        includes: "bike",
      });
      res.status(200).send(reservations);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  })
  .get("/:reservationId", async (req, res, next) => {
    try {
      const reservation = await reservationService.findById(
        req.params.reservationId
      );
      res.status(200).send(reservation);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

export default router;
