import farmerModel, { FarmerInterface } from "../models/farmer.model";

export const farmerFunctions = {
  insert(farmerData: FarmerInterface): Promise<FarmerInterface> {
    return new Promise(
      async (
        resolve: (
          value: FarmerInterface | PromiseLike<FarmerInterface>
        ) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const farmer = new farmerModel(farmerData);
          const farmerDoc: FarmerInterface = await farmer.save();
          resolve(farmerDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
};
