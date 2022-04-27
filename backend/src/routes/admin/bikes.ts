import { Router } from "express";
import bikeController from "../../controllers/bikes";
const router = Router();

router
  .get("/", bikeController.getBikesForAdmin)
  .post("/", bikeController.createBike)
  .put("/:bikeId", bikeController.updateBike)
  .delete("/:bikeId", bikeController.deleteBike);

export default router;
