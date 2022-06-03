import http from "http";
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "config";
import { exit } from "process";

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

app.get("/", (req, res) => res.json("Hello World"));

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
