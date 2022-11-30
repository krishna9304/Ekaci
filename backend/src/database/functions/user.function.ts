import { ObjectId } from "mongoose";
import userModel, { UserInterface } from "../models/user.model";
import crypto from "crypto";

export const UserFunctions = {
  insert(userData: UserInterface): Promise<UserInterface> {
    return new Promise(
      async (
        resolve: (value: UserInterface | PromiseLike<UserInterface>) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const user: UserInterface = new userModel(userData);
          user.setPassword(userData.password);
          const userDoc: UserInterface = await user.save();
          resolve(userDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
  update(filter: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.password) {
          data.salt = crypto.randomBytes(16).toString("hex");

          data.password = crypto
            .pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`)
            .toString(`hex`);
        }
        const updated = await userModel.updateMany({ ...filter }, { ...data });
        resolve(updated);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll(limit: number = 10, page: number = 1): Promise<UserInterface[]> {
    return new Promise(
      async (
        resolve: (value: UserInterface[]) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const allusers: UserInterface[] = await userModel
            .find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
          resolve(allusers);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
  getById(_id: ObjectId): Promise<UserInterface | null> {
    return new Promise(
      async (
        resolve: (value: UserInterface | null) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const user: UserInterface | null = await userModel.findById(_id);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
  get(filter: any): Promise<UserInterface[]> {
    return new Promise(
      async (
        resolve: (value: UserInterface[]) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const usersMatched: UserInterface[] = await userModel.find({
            ...filter,
          });
          resolve(usersMatched);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
};
