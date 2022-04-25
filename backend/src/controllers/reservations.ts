import { Router } from "express";
import { bikeReviewsService, reservationService } from "../services";
import { BikeReviewsModel, BikesModel } from "../models";
import { TUserModel, UserRoleEnum } from "../models/model.type";

const router = Router();

router
  .get("/", async (req, res, next) => {
    const user: TUserModel = (req as any).user;
    try {
      const reservations = await reservationService.findAllBy({
        where:
          user.role === UserRoleEnum.Admin ? undefined : { userId: user.id },
        include: [
          {
            model: BikesModel,
            as: "bike",
            include: [
              {
                model: BikeReviewsModel,
                as: "reviews",
                required: false,
                where: {
                  userId: user.id,
                },
              },
            ],
          },
        ],
      });
      res.status(200).send(reservations);
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .get("/:reservationId", async (req, res, next) => {
    const user: TUserModel = (req as any).user;

    try {
      const reservation = await reservationService.findById(
        req.params.reservationId
      );
      if (!reservation) {
        return res.status(404).send({ message: "Reservation not found" });
      }

      if (user.role === UserRoleEnum.Member && reservation.userId !== user.id) {
        return res.status(403).send({
          message: "User does not have permission to view this reservation",
        });
      }

      res.status(200).send(reservation);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

export default router;
