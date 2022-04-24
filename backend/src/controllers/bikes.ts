import { Router } from "express";
import authorize from "./middlewares/auth";
import { bikeService } from "../services";
import { TBikeModel, UserRoleEnum } from "../models/model.type";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const bikes = await bikeService.findAllBy();
    res.status(200).send(bikes);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:bikeId", async (req, res, next) => {
  try {
    const bike = await bikeService.findById(req.params.bikeId);
    res.status(200).send(bike);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router
  .use(authorize(UserRoleEnum.Admin))
  .post("/", async (req, res, next) => {
    const body: TBikeModel = req.body;
    try {
      const bike = await bikeService.create(body);
      res.status(200).send(bike);
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .put("/:bikeId", async (req, res, next) => {
    const body: TBikeModel = req.body;
    try {
      await bikeService.updateOne(req.params.bikeId, body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  })
  .delete("/:bikeId", async (req, res, next) => {
    try {
      await bikeService.destroy(req.params.bikeId);
      res.status(200).send({ deleted: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  });

export default router;
