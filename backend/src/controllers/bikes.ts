import { Router } from "express";
import { Sequelize, Op, where } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { authorizeRole } from "./middlewares/auth";
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
  UserRoleEnum,
} from "../models/model.type";
import { BikeReviewsModel } from "../models";

const router = Router();

const buildBikeFilters = (filters?: {
  color: string;
  model: string;
  rating: string;
}) => {
  const operation: Record<string, any> = {
    where: {},
    having: {},
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
  if (filters.rating) {
    operation.having.rating = {
      [Op.between]: [filters.rating, 5],
    };
  }

  return operation;
};

router.get("/", async (req, res) => {
  const { where, having } = buildBikeFilters(req.query as any);

  try {
    const bikes = await bikeService.findAllBy({
      where,
      having,
      attributes: [
        "id",
        "color",
        "location",
        "model",
        [Sequelize.fn("AVG", Sequelize.col("reviews.rating")), "rating"],
      ],
      group: ["Bikes.id", "rating"],
      include: [
        {
          model: BikeReviewsModel,
          as: "reviews",
          attributes: [],
        },
      ],
    });

    res.status(200).send(bikes);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:bikeId", async (req, res) => {
  try {
    const bike = await bikeService.findById(req.params.bikeId);
    res.status(200).send(bike);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Bike reservations
router
  .post("/:bikeId/reservations", async (req, res) => {
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

// Bike reviews
router
  .post("/:bikeId/reviews", async (req, res) => {
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
      res.status(500).send({ error });
    }
  })
  .put("/:bikeId/reviews/:reviewId", async (req, res) => {
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
      res.status(500).send({ error });
    }
  });

// Admin specific routes
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
