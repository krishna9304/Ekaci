import Router, { Application } from "express";
import userRouter from "./user.route";

const mainRouter: Application = Router();

mainRouter.use("/user", userRouter);

export default mainRouter;
