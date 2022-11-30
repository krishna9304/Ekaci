import Router, { Application } from "express";
import farmerRouter from "./farmer.route";
import userRouter from "./user.route";

const mainRouter: Application = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/farmer", farmerRouter);

export default mainRouter;
