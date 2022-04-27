import { Router } from "express";
import reservationController from "../../controllers/reservations";

const router = Router();

router.get("/", reservationController.getReservationsForAdmin);

export default router;
