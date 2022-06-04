import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router
  .post("/", UserController.create)
  .get("/", authMiddleware, UserController.read)
  .patch("/", authMiddleware, UserController.update);

export default router;
