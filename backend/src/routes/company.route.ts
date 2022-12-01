import Router, { Application } from "express";
import { CompanyController } from "../controllers/company.controller";
import Authenticate from "../middlewares/jwt";

const companyRouter: Application = Router();

companyRouter.post("/register", Authenticate, CompanyController.register);
companyRouter.post(
  "/insurance/create",
  Authenticate,
  CompanyController.createInsurance
);

export default companyRouter;
