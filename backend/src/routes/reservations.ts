import { Router } from "express";
import { errorHandler } from "../controllers/middlewares/errorHandler";
import reservationController from "../controllers/reservations";

const router = Router();

router
  .get("/", reservationController.getReservationsForMembers, errorHandler)
  .get("/:reservationId", reservationController.getReservation, errorHandler);

export default router;
