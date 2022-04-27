import { Request, Response, NextFunction } from "express";
import { bikeLotsService } from "../services";

const getBikeLots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lots = await bikeLotsService.findAllBy();

    res.status(200).send(lots);
  } catch (error) {
    (req as any).error = error;
    next();
  }
};

export default { getBikeLots };
