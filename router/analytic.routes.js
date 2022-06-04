import { Router } from "express";
import AnalyticController from "../controllers/analytic.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/:id", authMiddleware, AnalyticController.read);

export default router;
