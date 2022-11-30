import { NextFunction, Request, Response } from "express";
import { compareParams, Info, ResponseTypes } from "../helpers/restHelper";
import { UserServices } from "../services/user.service";
import { UserFunctions } from "../database/functions/user.function";
import userModel, { UserInterface } from "../database/models/user.model";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../constants";
import { ObjectId } from "mongoose";
import farmerModel from "../database/models/farmer.model";
import companyModel from "../database/models/company.model";

export async function fetchMetaData(
  userType: string,
  metamask_address: string
) {
  let metadata = null;
  switch (userType) {
    case "farmer":
      metadata = await farmerModel.findOne({
        farmer_id: metamask_address,
      });
      break;
    case "company":
      metadata = await companyModel.findOne({
        company_id: metamask_address,
      });
      break;
    case "government":
      break;
    default:
      break;
  }
  return metadata;
}

export const UserController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = [
      "email",
      "password",
      "phone",
      "metamask_address",
      "userType",
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
      const errors: String[] = await UserServices.checkConflicts(reqBody);
      if (errors.length) {
        const returnVal = new Info(
          400,
          "Please check the error stack: ",
          ResponseTypes._ERROR_,
          errors
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
      const savedUserDoc: UserInterface = await UserFunctions.insert(reqBody);
      const token: string = jwt.sign(
        {
          metamask_address: savedUserDoc.metamask_address,
          phone: savedUserDoc.phone,
          _id: savedUserDoc._id,
        },
        TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );
      return res.status(201).json({
        user: savedUserDoc,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    const reqBody: any = req.body;
    const paramsReq: Array<string> = ["phone", "password"];
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
      const userExists: {
        _id: ObjectId;
      } | null = await userModel.exists({ phone: reqBody.phone });
      if (userExists) {
        const user: UserInterface | null = await userModel.findOne({
          userId: reqBody.phone,
        });
        if (user?.validPassword(req.body.password)) {
          delete user.password;
          delete user.salt;
          const token: string = jwt.sign(
            {
              phone: user.phone,
              _id: user._id,
              metamask_address: user.metamask_address,
            },
            TOKEN_KEY,
            {
              expiresIn: "2d",
            }
          );
          const metadata = await fetchMetaData(
            user.userType,
            user.metamask_address
          );
          return res.status(200).json({
            user,
            metadata,
            token,
          });
        } else {
          const returnVal = new Info(
            400,
            "Wrong Password",
            ResponseTypes._ERROR_
          );
          return res.status(returnVal.getCode()).json(returnVal.getArray());
        }
      } else {
        const returnVal = new Info(
          400,
          "No user found with the given phone",
          ResponseTypes._ERROR_
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
    } catch (error) {
      next(error);
    }
  },

  async verifyToken(req: Request, res: Response, _: NextFunction) {
    const token: string =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      const returnVal = new Info(403, "No Token Found", ResponseTypes._ERROR_);
      return res.status(returnVal.getCode()).json(returnVal.getArray());
    }
    try {
      const decoded: any = jwt.verify(token, TOKEN_KEY);
      const { _id }: { _id: ObjectId } = decoded;
      const user: any = await UserFunctions.getById(_id);
      const newToken: string = jwt.sign(
        {
          email: user.email,
          phone: user.phone,
          _id: user._id,
          userId: user.userId,
        },
        TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );
      const metadata = await fetchMetaData(
        user.userType,
        user.metamask_address
      );
      return res.status(200).json({
        user,
        metadata,
        token: newToken,
      });
    } catch (err) {
      const returnVal = new Info(401, "Invalid Token", ResponseTypes._ERROR_);
      return res.status(returnVal.getCode()).json(returnVal.getArray());
    }
  },

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { metamask_address } = req.params;
      const users = await UserFunctions.get({ metamask_address });
      if (users.length) {
        const metadata = fetchMetaData(users[0].userType, metamask_address);
        return res.status(200).json(users[0]);
      } else {
        const returnVal = new Info(
          404,
          "Invalid user identifier.",
          ResponseTypes._ERROR_
        );
        return res.status(returnVal.getCode()).json(returnVal.getArray());
      }
    } catch (error) {
      next(error);
    }
  },

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { limit, page } = req.query;
      const users = await UserFunctions.getAll(Number(limit), Number(page));
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
};
