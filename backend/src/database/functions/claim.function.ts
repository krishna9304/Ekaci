import claimModel, { ClaimInterface } from "../models/claim.model";

export const ClaimFunctions = {
  insert(claimData: ClaimInterface): Promise<ClaimInterface> {
    return new Promise(
      async (
        resolve: (value: ClaimInterface | PromiseLike<ClaimInterface>) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const claim = new claimModel(claimData);
          const claimDoc: ClaimInterface = await claim.save();
          resolve(claimDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
};
