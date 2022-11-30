require("dotenv").config();
import express, { Application, NextFunction, Request, Response } from "express";
import colors from "ansi-colors";
import "./database";
import mainRouter from "./routes";
import bodyParser from "body-parser";
import timeout from "connect-timeout";
import { CLIENT_URL, ISDEV, PORT, UPLOAD_PATH } from "./constants";
import cors from "cors";
import morgan from "morgan";

// Main Application
const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: [CLIENT_URL],
  })
);
app.use(timeout("120s"));
app.use(bodyParser.json());
app.use(haltOnTimedout);
app.use(morgan("dev"));

// Static file serving
app.use("/static", express.static(UPLOAD_PATH));

function haltOnTimedout(req: Request, _: Response, next: NextFunction) {
  if (!req.timedout) next();
}

app.get("/", (_: Request, res: Response, __: NextFunction) => {
  res.status(200).json({
    data: null,
    message: "Server running!",
  });
});

// Main routes
app.use("/api", mainRouter);

// 404 Route
const route404: (req: Request, res: Response, next: NextFunction) => void = (
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  res.status(404).json({ message: "Route not Found", data: {} });
};

app.use("*", timeout("1200s"), route404);

// Error Handler
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "Something went wrong",
    errs: Array.isArray(err)
      ? err
      : typeof err === "object" && err.message
      ? [err.message]
      : [err],
  });
});

export const server = app.listen(PORT, () => {
  ISDEV && console.clear();
  console.log(
    ` Server running on PORT \n\t${
      ISDEV
        ? colors.cyan("http://localhost:" + PORT)
        : colors.cyan(String(PORT))
    }\n at ${Date()}`
  );
});
