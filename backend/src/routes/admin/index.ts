import { Router } from "express";
import adminReservationRoutes from "./reservations";
import adminBikeRoutes from "./bikes";
import adminBikeLotRoutes from "./bikeLots";
import adminUserRoutes from "./users";

const router = Router();

router.use("/reservations", adminReservationRoutes);
router.use("/bikes", adminBikeRoutes);
router.use("/bikelots", adminBikeLotRoutes);
router.use("/users", adminUserRoutes);

export default router;
