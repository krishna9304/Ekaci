import Router, { Application } from "express";
import { CompanyController } from "../controllers/company.controller";
import upload from "../helpers/fileUpload";
import Authenticate from "../middlewares/jwt";

const companyRouter: Application = Router();

companyRouter.post("/register", Authenticate, CompanyController.register);
companyRouter.post(
  "/insurance/create",
  upload.single("content"),
  Authenticate,
  CompanyController.createInsurance
);

export default companyRouter;
