import { InsuranceInterface } from "../database/models/insurance.model";

export const InsuranceServices = {
  async checkConflicts(insurance: InsuranceInterface): Promise<Array<String>> {
    let errors: Array<String> = [];

    if (!insurance["covered_crops"].length)
      errors.push(
        "Invalid request. This insurance do not cover any crop types."
      );
    return errors;
  },
};
