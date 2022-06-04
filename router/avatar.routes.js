import { Router } from "express";
import AvatarController from "../controllers/avatar.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.put("/", authMiddleware, AvatarController.update);

export default router;
