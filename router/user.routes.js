import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router
  .post("/", UserController.create)
  .get("/", authMiddleware, UserController.read)
  .patch("/", authMiddleware, UserController.update)
  .patch("/reset-activation-mail", UserController.resetActivationMail)
  .get("/activate-user/:link", UserController.activateUser)
  .post("/reset-password", UserController.resetPassword)
  .patch("/set-new-password/:link", UserController.setNewPassword);

export default router;
