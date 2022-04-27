import { Router, Request, Response, NextFunction } from "express";
import { bikeReviewsService, reservationService } from "../services";
import {
  BikeLotsModel,
  BikeReviewsModel,
  BikesModel,
  UsersModel,
} from "../models";
import { TUserModel, UserRoleEnum } from "../models/model.type";

const getReservationsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: TUserModel = (req as any).user;
  try {
    const reservations = await reservationService.findAllBy({
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
            {
              model: BikeLotsModel,
              as: "location",
              attributes: ["address", "lotName", "id"],
            },
          ],
        },
        {
          model: UsersModel,
          as: "user",
          attributes: ["username", "name", "id"],
        },
      ],
      order: [["startTime", "desc"]],
    });
    res.status(200).send(reservations);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const getReservationsForMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: TUserModel = (req as any).user;
  try {
    const reservations = await reservationService.findAllBy({
      where: { userId: user.id },
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
            {
              model: BikeLotsModel,
              as: "location",
              attributes: ["address", "lotName", "id"],
            },
          ],
        },
        {
          model: UsersModel,
          as: "user",
          attributes: [],
        },
      ],
      order: [["startTime", "desc"]],
    });
    res.status(200).send(reservations);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const getReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    (req as any).error = error;
    next();
  }
};

export default {
  getReservation,
  getReservationsForAdmin,
  getReservationsForMembers,
};
