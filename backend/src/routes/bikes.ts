import { Router } from "express";
import bikeController from "../controllers/bikes";

const router = Router();

router.get("/", bikeController.getBikesForMembers);

router.get("/:bikeId", bikeController.getBike);

// Bike reservations
router.post("/:bikeId/reservations", bikeController.createBikeReservation);
router.put(
  "/:bikeId/reservations/:reservationId",
  bikeController.updateBikeReservation
);

// Bike reviews
router.post("/:bikeId/reviews", bikeController.createBikeReview);
router.put("/:bikeId/reviews/:reviewId", bikeController.updateBikeReview);

export default router;
