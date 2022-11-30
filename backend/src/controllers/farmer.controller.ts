import { NextFunction, Request, Response } from "express";
import { compareParams, Info, ResponseTypes } from "../helpers/restHelper";
import { FarmerInterface } from "../database/models/farmer.model";
import { farmerFunctions } from "../database/functions/farmer.function";
import { FarmerServices } from "../services/farmer.service";

export const FarmerControlller = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = [
      "farmer_id",
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

      return res.status(201).json({
        farmer_data: savedFarmerDoc,
      });
    } catch (error) {
      next(error);
    }
  },
};
