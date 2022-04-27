import { Sequelize, Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";
import { Request, Response, NextFunction } from "express";
import {
  bikeService,
  bikeReviewsService,
  reservationService,
} from "../services";
import {
  TBikeModel,
  TReservationModel,
  TBikeReviewModel,
  TUserModel,
  ReservationStatusEnum,
} from "../models/model.type";
import { BikeLotsModel, BikeReviewsModel, ReservationsModel } from "../models";

const buildBikeFilters = (filters?: {
  color: string;
  model: string;
  rating: string;
  lat: string;
  lng: string;
  availableFrom: string;
}) => {
  const operation: Record<string, any> = {
    where: {},
    having: {},
    location: {},
    reservationWhere: {},
  };

  if (!filters) {
    return operation;
  }

  if (filters.color) {
    operation.where.color = { [Op.in]: filters.color.split(",") || [] };
  }
  if (filters.model) {
    operation.where.model = { [Op.in]: filters.model.split(",") || [] };
  }
  if (filters.model) {
    operation.where.model = { [Op.in]: filters.model.split(",") || [] };
  }
  if (filters.rating) {
    operation.having.rating = {
      [Op.between]: [filters.rating, 5],
    };
  }
  if (filters.lat && filters.lng) {
    operation.location = {
      lat: filters.lat,
      lng: filters.lng,
    };
  }

  if (filters.availableFrom) {
    operation.reservationWhere.startTime = {
      [Op.lt]: filters.availableFrom,
    };
    operation.reservationWhere.endTime = {
      [Op.gt]: filters.availableFrom,
    };
  }

  return operation;
};

const searchDistance = 10000; // meters

const getBikesForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { where, having } = buildBikeFilters(req.query as any);

  try {
    const bikes = await bikeService.findAllBy({
      where,
      having,
      attributes: [
        "id",
        "color",
        "model",
        "available",
        [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "rating"],
      ],
      include: [
        {
          model: BikeReviewsModel,
          as: "reviews",
          attributes: [],
        },
        {
          model: BikeLotsModel,
          as: "location",
        },
      ],
      group: ["Bikes.id", "rating", "location.id"],
      order: [
        [Sequelize.fn("coalesce", Sequelize.literal("rating, 0")), "DESC"],
      ],
    });
    res.status(200).send(bikes);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const getBikesForMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { where, having, location, reservationWhere } = buildBikeFilters(
    req.query as any
  );

  try {
    const bikes = await bikeService.findAllBy({
      replacements: [location.lat, location.lng],
      attributes: [
        "id",
        "color",
        "model",
        "available",
        [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "rating"],
      ],
      where: { ...where, available: true },
      having,
      include: [
        {
          model: BikeReviewsModel,
          as: "reviews",
          attributes: [],
        },
        {
          model: BikeLotsModel,
          as: "location",
          where: Sequelize.fn(
            "ST_DWithin",
            Sequelize.literal(
              `geom::geography, ST_SetSRID(ST_MakePoint(?,?),4326)::geography,${searchDistance}`
            )
          ),
        },
        {
          required: false,
          model: ReservationsModel,
          as: "reservations",
          attributes: ["id"],
          where: !isEmpty(reservationWhere) ? reservationWhere : undefined,
        },
      ],
      group: ["Bikes.id", "rating", "location.id", "reservations.id"],
      order: [
        [Sequelize.fn("coalesce", Sequelize.literal("rating, 0")), "DESC"],
      ],
    });

    const availableBikes = bikes.filter(
      (bike) => (bike as any).reservations.length === 0
    );
    res.status(200).send(availableBikes);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const getBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bike = await bikeService.findById(req.params.bikeId, {
      include: {
        model: ReservationsModel,
        required: false,
        as: "reservations",
        attributes: ["startTime", "endTime"],
        where: {
          status: ReservationStatusEnum.Active,
          startTime: {
            [Op.gte]: new Date(),
          },
        },
      },
      order: [[Sequelize.col("startTime"), "ASC"]],
    });
    res.status(200).send(bike);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

// Bike reservations
const getBikeReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: Omit<TReservationModel, "userId" | "bikeId"> = req.body;
  const bikeId = req.params.bikeId;
  const user: TUserModel = (req as any).user;

  try {
    const bike = await bikeService.findById(bikeId);
    // TODO: by availability
    if (!bike) {
      return res
        .status(404)
        .send({ message: "Bike is not available in our store." });
    }

    const reservation = await reservationService.create({
      ...body,
      id: uuidv4(),
      bikeId: bikeId,
      userId: user.id,
    });
    res.status(200).send(reservation);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const createBikeReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: Omit<TReservationModel, "userId" | "bikeId"> = req.body;
  const bikeId = req.params.bikeId;
  const user: TUserModel = (req as any).user;

  try {
    const bike = await bikeService.findById(bikeId);
    // TODO: by availability
    if (!bike) {
      return res
        .status(404)
        .send({ message: "Bike is not available in our store." });
    }

    const reservation = await reservationService.create({
      ...body,
      id: uuidv4(),
      bikeId: bikeId,
      userId: user.id,
    });
    res.status(200).send(reservation);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const updateBikeReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: Omit<TReservationModel, "userId"> = req.body;
  try {
    await reservationService.updateById(req.params.reservationId, body);
    res.status(200).send({ updated: true });
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

// Bike reviews
const createBikeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: Omit<TBikeReviewModel, "userId" | "bikeId" | "id"> = req.body;
  const bikeId = req.params.bikeId;
  const user: TUserModel = (req as any).user;

  try {
    const bike = await bikeService.findById(bikeId);
    if (!bike) {
      return res
        .status(404)
        .send({ message: "Bike is not available in our store." });
    }

    // TODO store date as datetime and do where end date is before now
    const reviews = await bikeReviewsService.findAllBy({
      where: {
        userId: user.id,
        bikeId: bikeId,
      },
    });
    if (reviews.length > 0) {
      return res
        .status(403)
        .send({ message: "You can only create review per bike once." });
    }

    const review = await bikeReviewsService.create({
      ...body,
      id: uuidv4(),
      bikeId: bikeId,
      userId: user.id,
    });
    res.status(200).send(review);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const updateBikeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: Omit<TBikeReviewModel, "userId" | "bikeId" | "id"> = req.body;
  const parameters = req.params;
  const user: TUserModel = (req as any).user;

  try {
    const bike = await bikeService.findById(parameters.bikeId);
    if (!bike) {
      return res
        .status(404)
        .send({ message: "Bike is not available in our store." });
    }

    const review = await bikeReviewsService.findById(parameters.reviewId);
    if (!review || review.userId !== user.id) {
      return res.status(403).send({
        message: "User does not have permission to modify this review.",
      });
    }

    await bikeReviewsService.updateById(parameters.reviewId, body);
    res.status(200).send();
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

// Admin specific controllers
const createBike = async (req: Request, res: Response, next: NextFunction) => {
  const body: TBikeModel = req.body;
  try {
    const bike = await bikeService.create({ ...body, id: uuidv4() });
    res.status(200).send(bike);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const updateBike = async (req: Request, res: Response, next: NextFunction) => {
  const body: TBikeModel = req.body;
  try {
    await bikeService.updateById(req.params.bikeId, body);
    res.status(200).send({ updated: true });
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

const deleteBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bikeService.destroy(req.params.bikeId);
    res.status(200).send({ deleted: true });
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

export default {
  getBike,
  getBikeReservations,
  getBikesForAdmin,
  getBikesForMembers,
  createBike,
  createBikeReservation,
  createBikeReview,
  updateBike,
  updateBikeReservation,
  updateBikeReview,
  deleteBike,
};
