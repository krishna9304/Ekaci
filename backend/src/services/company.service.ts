import companyModel, {
  CompanyInterface,
} from "../database/models/company.model";
import userModel from "../database/models/user.model";

export const CompanyServices = {
  async checkConflicts(company: CompanyInterface): Promise<Array<String>> {
    let errors: Array<String> = [];
    const userExists = await userModel.exists({
      metamask_address: company.company_id,
    });
    if (!userExists) {
      errors.push("Invalid company id");
      return errors;
    }

    const companyExists = await companyModel.exists({
      company_id: company.company_id,
    });
    if (companyExists) {
      errors.push("A company already exists with the same company_id");
      return errors;
    }
    return errors;
  },

  prepareCompanyData(company: CompanyInterface) {
    if (!Object.keys(company).includes("avatar")) {
      const avatarLink = `https://avatar.tobi.sh/tobiaslins.svg?text=${
        company.company_name[0].toUpperCase() +
        (company.company_name.length > 1
          ? company.company_name[1].toUpperCase()
          : "")
      }`;
      company.avatar = avatarLink;
    }
    return company;
  },
};
