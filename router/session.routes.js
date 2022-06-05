import { Router } from "express";
import SessionController from "../controllers/session.controller.js";

const router = new Router();

router
  .post("/", SessionController.create)
  .delete("/", SessionController.delete)
  .put("/", SessionController.update);

export default router;
