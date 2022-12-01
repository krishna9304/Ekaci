import companyModel, { CompanyInterface } from "../models/company.model";

export const CompanyFunctions = {
  insert(companyData: CompanyInterface): Promise<CompanyInterface> {
    return new Promise(
      async (
        resolve: (
          value: CompanyInterface | PromiseLike<CompanyInterface>
        ) => void,
        reject: (reason: any) => void
      ): Promise<void> => {
        try {
          const company = new companyModel(companyData);
          const companyDoc: CompanyInterface = await company.save();
          resolve(companyDoc);
        } catch (error) {
          reject(error);
        }
      }
    );
  },
};
