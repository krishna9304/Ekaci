import { NextFunction, Response } from "express";
import { SERVER_URL } from "../constants";
import { CompanyFunctions } from "../database/functions/company.function";
import { InsuranceFunctions } from "../database/functions/insurance.function";
import { CompanyInterface } from "../database/models/company.model";
import { InsuranceInterface } from "../database/models/insurance.model";
import userModel from "../database/models/user.model";
import { compareParams, Info, ResponseTypes } from "../helpers/restHelper";
import { RequestJwt } from "../middlewares/jwt";
import { CompanyServices } from "../services/company.service";
import { InsuranceServices } from "../services/insurance.service";

export const CompanyController = {
  async register(
    req: RequestJwt,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = [
      "company_name",
      "address",
      "admin_emp_id",
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
      reqBody.company_id = req.user?.metamask_address;
      const errors: String[] = await CompanyServices.checkConflicts(reqBody);
      if (errors.length) {
        const returnVal = new Info(
          400,
          "Please check the error stack: ",
          ResponseTypes._ERROR_,
          errors
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
      const company: CompanyInterface =
        CompanyServices.prepareCompanyData(reqBody);
      const savedCompanyDoc: CompanyInterface = await CompanyFunctions.insert(
        company
      );

      await userModel.updateOne(
        { metamask_address: savedCompanyDoc.company_id },
        { company_ref: savedCompanyDoc._id }
      );
      return res.status(201).json(savedCompanyDoc);
    } catch (error) {
      next(error);
    }
  },

  async createInsurance(
    req: RequestJwt,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    console.log(reqBody);
    const paramsReq: Array<string> = [
      "name",
      "tenure",
      "premium",
      "total_amount",
      "covered_crops",
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
    if (req.file) {
      const url =
        req.protocol + "://" + SERVER_URL + "/static/" + req.file.filename;
      reqBody.content = url;
    }
    try {
      if (req.user?.userType !== "company") {
        const returnVal = new Info(
          401,
          "Illegal request.",
          ResponseTypes._ERROR_
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }

      reqBody.company_ref = req.user?._id;
      const errors: String[] = await InsuranceServices.checkConflicts(reqBody);
      if (errors.length) {
        const returnVal = new Info(
          400,
          "Please check the error stack: ",
          ResponseTypes._ERROR_,
          errors
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
      const savedInsuranceDoc: InsuranceInterface =
        await InsuranceFunctions.insert(reqBody);
      return res.status(201).json(savedInsuranceDoc);
    } catch (error) {
      next(error);
    }
  },
};
