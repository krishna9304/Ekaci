import Router, { Application } from "express";
import { FarmerControlller } from "../controllers/farmer.controller";
import upload from "../helpers/fileUpload";
import Authenticate from "../middlewares/jwt";

const farmerRouter: Application = Router();

farmerRouter.post(
  "/register",
  upload.single("plot_image"),
  Authenticate,
  FarmerControlller.register
);
farmerRouter.post(
  "/claim/create",
  upload.array("site_images"),
  Authenticate,
  FarmerControlller.createClaim
);
farmerRouter.post(
  "/insurance/buy",
  Authenticate,
  FarmerControlller.buyInsurance
);
farmerRouter.post(
  "/insurance/get",
  Authenticate,
  FarmerControlller.getInsurances
);
farmerRouter.get(
  "/insurance/:insurance_id",
  Authenticate,
  FarmerControlller.getInsuranceById
);

export default farmerRouter;
