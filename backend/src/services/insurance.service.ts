import { InsuranceInterface } from "../database/models/insurance.model";

export const InsuranceServices = {
  async checkConflicts(insurance: InsuranceInterface): Promise<Array<String>> {
    let errors: Array<String> = [];

    const excludedKeysCheck: Array<String> = ["covered_crops"];

    for (let key of Object.keys(insurance)) {
      if (!excludedKeysCheck.includes(key)) {
        if (
          typeof insurance[key as keyof typeof insurance] == "string" &&
          !insurance[key as keyof typeof insurance].trim().length
        )
          errors.push(`${key} cannot be empty.`);
      }

      if (!insurance["covered_crops"].length)
        errors.push(
          "Invalid request. This insurance do not cover any crop types."
        );
    }
    return errors;
  },
};
