import Router, { Application } from "express";
import { FarmerControlller } from "../controllers/farmer.controller";
import Authenticate from "../middlewares/jwt";

const farmerRouter: Application = Router();

farmerRouter.post("/register", Authenticate, FarmerControlller.register);
farmerRouter.post("/claim/create", Authenticate, FarmerControlller.createClaim);

export default farmerRouter;
