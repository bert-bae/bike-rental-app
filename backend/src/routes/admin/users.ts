import { Router } from "express";
import usersController from "../../controllers/users";

const router = Router();

router
  .get("/", usersController.getAllUsers)
  .post("/", usersController.createUser)
  .put("/:userId", usersController.updateUser)
  .delete("/:userId", usersController.deleteUser);

export default router;
