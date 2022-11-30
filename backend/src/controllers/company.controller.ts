import { NextFunction, Request, Response } from "express";
import { CompanyFunctions } from "../database/functions/company.function";
import { CompanyInterface } from "../database/models/company.model";
import userModel from "../database/models/user.model";
import { compareParams, Info, ResponseTypes } from "../helpers/restHelper";
import { CompanyServices } from "../services/company.service";

export const CompanyController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = [
      "company_name",
      "address",
      "admin_emp_id",
      "company_id",
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

      return res.status(201).json({
        farmer_data: savedCompanyDoc,
      });
    } catch (error) {
      next(error);
    }
  },
};
