import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { authorizeRole } from "./middlewares/auth";
import { bikeService, reservationService } from "../services";
import {
  TBikeModel,
  TReservationModel,
  TUserModel,
  UserRoleEnum,
} from "../models/model.type";
import { BikeReviewsModel } from "../models";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const bikes = await bikeService.findAllBy();
    res.status(200).send(bikes);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router
  .get("/:bikeId", async (req, res) => {
    try {
      const bike = await bikeService.findById(req.params.bikeId);
      res.status(200).send(bike);
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .post("/:bikeId/reservations", async (req, res) => {
    const body: Omit<TReservationModel, "userId" | "bikeId"> = req.body;
    const bikeId = req.params.bikeId;
    const user: TUserModel = (req as any).user;

    try {
      const reservation = await reservationService.create({
        ...body,
        id: uuidv4(),
        bikeId: bikeId,
        userId: user.id,
      });
      res.status(200).send(reservation);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  })
  .put("/:bikeId/reservations/:reservationId", async (req, res) => {
    const body: Omit<TReservationModel, "userId" | "bikeId"> = req.body;

    try {
      await reservationService.updateById(req.params.reservationId, body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  });

router
  .use(authorizeRole(UserRoleEnum.Admin))
  .post("/", async (req, res) => {
    const body: TBikeModel = req.body;
    try {
      const bike = await bikeService.create(body);
      res.status(200).send(bike);
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .put("/:bikeId", async (req, res) => {
    const body: TBikeModel = req.body;
    try {
      await bikeService.updateById(req.params.bikeId, body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .delete("/:bikeId", async (req, res) => {
    try {
      await bikeService.destroy(req.params.bikeId);
      res.status(200).send({ deleted: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  });

export default router;
