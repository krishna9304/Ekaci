import insuranceSubscribedModel, {
  InsuranceSubscriptionInterface,
} from "../models/insuranceSubscribed.model";

export const insuranceSubscriptionFunctions = {
  insert(
    insuranceSubscriptionData: InsuranceSubscriptionInterface
  ): Promise<InsuranceSubscriptionInterface> {
    return new Promise(
      async (
        resolve: (
          value:
            | InsuranceSubscriptionInterface
            | PromiseLike<InsuranceSubscriptionInterface>
        ) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const insuranceSubscription = new insuranceSubscribedModel(
            insuranceSubscriptionData
          );
          const insuranceSubscriptionDoc: InsuranceSubscriptionInterface =
            await insuranceSubscription.save();
          resolve(insuranceSubscriptionDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },

  update(filter: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const updated = await insuranceSubscribedModel.updateMany(
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
