import { Router } from "express";
import { userService, authService } from "../services";
import { TUserModel, UserRoleEnum } from "../models/model.type";
import { authorizeRole, authorizeUser } from "./middlewares/auth";

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
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router
  .use(authorizeUser)
  .use(authorizeRole(UserRoleEnum.Admin))
  .get("/", async (req, res) => {
    try {
      const users = await userService.findAllBy();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  })
  .put("/:userId", async (req, res) => {
    const body = req.body as TUserModel;

    try {
      const updateFields: Partial<
        Pick<TUserModel, "name" | "password" | "role">
      > = {
        name: body.name,
        role: body.role,
      };

      if (body.password) {
        updateFields.password = body.password;
      }

      const newUser = await userService.updateById(
        req.params.userId,
        updateFields
      );
      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  })
  .delete("/:userId", async (req, res) => {
    try {
      await userService.destroy(req.params.userId);
      res.status(200).send();
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

export default router;
