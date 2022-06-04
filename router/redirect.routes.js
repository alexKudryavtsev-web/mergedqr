import { Router } from "express";

import RedirectController from "../controllers/redirect.controller.js";

const router = new Router();

router.get("/:code", RedirectController.redirect);

export default router;
