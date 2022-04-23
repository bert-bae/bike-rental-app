import { Router } from "express";
import { userService, authService } from "../services";
import { TUserModel } from "../models/model.type";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body as TUserModel;

  try {
    const newUser = await userService.create(body);
    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body as Pick<
    TUserModel,
    "username" | "password"
  >;

  try {
    const token = await authService.login(username, password);
    res.status(200).json(token);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
