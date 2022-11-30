import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../constants";
import { UserFunctions } from "../database/functions/user.function";
import { UserInterface } from "../database/models/user.model";
import { Info, ResponseTypes } from "../helpers/restHelper";

export interface RequestJwt extends Request {
  user?: UserInterface;
}
const Authenticate: (
  req: RequestJwt,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>> = async (
  req: RequestJwt,
  res: Response,
  next: NextFunction
) => {
  const token: string =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    const returnVal = new Info(403, "No Token Found", ResponseTypes._ERROR_);
    return res.status(returnVal.getCode()).json(returnVal.getArray());
  }
  try {
    const decoded: any = jwt.verify(token, TOKEN_KEY);
    const { _id } = decoded;
    const user: UserInterface | null = await UserFunctions.getById(_id);
    if (user) {
      req.user = user;
    } else {
      const returnVal = new Info(
        401,
        "User cannot be identified",
        ResponseTypes._ERROR_
      );
      return res.status(returnVal.getCode()).json(returnVal.getArray());
    }
  } catch (err) {
    const returnVal = new Info(401, "Invalid Token", ResponseTypes._ERROR_);
    return res.status(returnVal.getCode()).json(returnVal.getArray());
  }
  return next();
};

export default Authenticate;
