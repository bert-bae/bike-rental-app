import { Request, Response, NextFunction } from "express";
import { userService, authService } from "../services";
import { TUserModel, UserRoleEnum } from "../models/model.type";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as TUserModel;
  const user = (req as any).user as TUserModel;

  try {
    if (user?.role !== UserRoleEnum.Admin && body.role === UserRoleEnum.Admin) {
      (req as any).error = {
        status: 403,
        message: "User does not have permission to create admin users.",
      };
      return next();
    }

    const newUser = await userService.create(body);
    res.status(200).json(newUser);
  } catch (error: any) {
    (req as any).error = error;
    next();
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as Pick<
    TUserModel,
    "username" | "password"
  >;

  try {
    const token = await authService.login(username, password);
    res.status(200).json(token);
  } catch (error: any) {
    (req as any).error = error;
    next();
  }
};

// Admin specific controllers
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAllBy();
    res.status(200).json(users);
  } catch (error: any) {
    (req as any).error = error;
    next();
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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
    (req as any).error = error;
    next();
  }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.destroy(req.params.userId);
    res.status(200).send();
  } catch (error: any) {
    (req as any).error = error;
    next();
  }
};

export default {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
};
