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

  update(filter: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const updated = await farmerModel.updateMany(
          { ...filter },
          { ...data }
        );
        resolve(updated);
      } catch (error) {
        reject(error);
      }
    });
  },
};
