import mongoose, { ObjectId } from "mongoose";
import insuranceModel, { InsuranceInterface } from "../models/insurance.model";

export const InsuranceFunctions = {
  insert(insuranceData: InsuranceInterface): Promise<InsuranceInterface> {
    return new Promise(
      async (
        resolve: (
          value: InsuranceInterface | PromiseLike<InsuranceInterface>
        ) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const insurance = new insuranceModel(insuranceData);
          const insuranceDoc: InsuranceInterface = await insurance.save();
          resolve(insuranceDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },

  getAll(limit: number = 10, page: number = 1): Promise<InsuranceInterface[]> {
    return new Promise(
      async (
        resolve: (value: InsuranceInterface[]) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const allInsurances: InsuranceInterface[] = await insuranceModel
            .find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
          resolve(allInsurances);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
  getById(_id: string): Promise<InsuranceInterface | null> {
    return new Promise(
      async (
        resolve: (value: InsuranceInterface | null) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const insurance: InsuranceInterface | null =
            await insuranceModel.findById(new mongoose.Types.ObjectId(_id));
          resolve(insurance);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
  get(filter: any): Promise<InsuranceInterface[]> {
    return new Promise(
      async (
        resolve: (value: InsuranceInterface[]) => void,
        reject: (reason?: any) => void
      ): Promise<void> => {
        try {
          const insurancesMatched: InsuranceInterface[] =
            await insuranceModel.find({
              ...filter,
            });
          resolve(insurancesMatched);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
};
