import { Router } from "express";
import QRController from "../controllers/qr.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router
  .get("/", authMiddleware, QRController.create)
  .delete("/", authMiddleware, QRController.delete)
  .patch("/", authMiddleware, QRController.update);

export default router;
