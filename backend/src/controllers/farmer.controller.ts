import { NextFunction, Response } from "express";
import { compareParams, Info, ResponseTypes } from "../helpers/restHelper";
import { FarmerInterface } from "../database/models/farmer.model";
import { farmerFunctions } from "../database/functions/farmer.function";
import { FarmerServices } from "../services/farmer.service";
import userModel from "../database/models/user.model";
import { RequestJwt } from "../middlewares/jwt";

export const FarmerControlller = {
  async register(
    req: RequestJwt,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = [
      "first_name",
      "middle_name",
      "last_name",
      "post_office",
      "police_station",
      "district",
      "pincode",
      "state",
      "landmark",
      "plot_desc",
      "farmer_type",
      "farmer_category",
      "bank_details",
      "crop_details",
    ];
    const errors: String[] = compareParams(paramsReq, reqBody);
    if (errors.length) {
      const returnVal = new Info(
        400,
        "Following parameters are required in the request body: " +
          JSON.stringify(errors),
        ResponseTypes._ERROR_
      );
      return res.status(returnVal.getCode()).json(returnVal.getArray());
    }
    try {
      reqBody.farmer_id = req.user?.metamask_address;
      const errors: String[] = await FarmerServices.checkConflicts(reqBody);
      if (errors.length) {
        const returnVal = new Info(
          400,
          "Please check the error stack: ",
          ResponseTypes._ERROR_,
          errors
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
      const farmer: FarmerInterface = FarmerServices.prepareFarmerData(reqBody);
      const savedFarmerDoc: FarmerInterface = await farmerFunctions.insert(
        farmer
      );

      await userModel.updateOne(
        { metamask_address: savedFarmerDoc.farmer_id },
        { farmer_ref: savedFarmerDoc._id }
      );

      return res.status(201).json(savedFarmerDoc);
    } catch (error) {
      next(error);
    }
  },
};
