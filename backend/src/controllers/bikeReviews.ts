import { Router } from "express";
import { UserRoleEnum } from "../models/model.type";
import { bikeReviewsService } from "../services";
import { authorizeRole } from "./middlewares/auth";

const router = Router();

router
  .use(authorizeRole(UserRoleEnum.Admin))
  .get("/", async (req, res) => {
    try {
      const reviews = await bikeReviewsService.findAllBy();
      res.status(200).send(reviews);
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .get("/:reviewId", async (req, res) => {
    try {
      const bike = await bikeReviewsService.findById(req.params.reviewId);
      res.status(200).send(bike);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

export default router;
