import { Router } from "express";
import bikeLotController from "../../controllers/bikeLots";

const router = Router();

router.get("/", bikeLotController.getBikeLots);

export default router;
