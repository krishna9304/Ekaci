import Router, { Application } from "express";
import { UserController } from "../controllers/user.controller";
import Authenticate from "../middlewares/jwt";

const userRouter: Application = Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/self", UserController.verifyToken);
userRouter.get("/:phone", Authenticate, UserController.getUser);
userRouter.get("/", Authenticate, UserController.getAll);

export default userRouter;
