import Router, { Application } from "express";
import { FarmerControlller } from "../controllers/farmer.controller";
import Authenticate from "../middlewares/jwt";

const farmerRouter: Application = Router();

farmerRouter.post("/register", Authenticate, FarmerControlller.register);

export default farmerRouter;
