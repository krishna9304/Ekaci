import Router, { Application } from "express";
import companyRouter from "./company.route";
import farmerRouter from "./farmer.route";
import userRouter from "./user.route";

const mainRouter: Application = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/farmer", farmerRouter);
mainRouter.use("/company", companyRouter);

export default mainRouter;
