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
};
