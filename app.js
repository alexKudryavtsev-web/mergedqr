import http from "http";
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "config";
import { exit } from "process";

import userRouter from "./router/user.routes.js";
import avatarRouter from "./router/avatar.routes.js";
import qrRouter from "./router/qr.routes.js";
import sessionRouter from "./router/session.routes.js";
import redirectRouter from "./router/redirect.routes.js";
import analyticRouter from "./router/analytic.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const CORS_OPTIONS = {
  origin: config.get("CLIENT_URL"),
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

const app = express();
const server = http.createServer(app);

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.use("/api/user", userRouter);
app.use("/api/avatar", avatarRouter);
app.use("/api/session", sessionRouter);
app.use("/api/qr", qrRouter);
app.use("/api/analytic", analyticRouter);
app.use("/api/t", redirectRouter);

app.use(errorMiddleware);

async function start() {
  try {
    const PORT = config.get("PORT");
    server.listen(PORT);

    server.on("listening", () => {
      console.log(`Listening on port: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log("Server has failed");
    exit(1);
  }
}

start();
