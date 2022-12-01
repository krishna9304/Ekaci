import mongoose from "mongoose";
import { ClaimInterface } from "../database/models/claim.model";
import insuranceModel from "../database/models/insurance.model";

export const ClaimService = {
  async checkConflicts(claim: ClaimInterface): Promise<Array<String>> {
    let errors: Array<String> = [];
    const insuranceExists = await insuranceModel.exists({
      _id: new mongoose.Types.ObjectId(claim.insurance_id + ""),
    });

    if (!insuranceExists) {
      errors.push("Invalid insurance id.");
      return errors;
    }
    const excludedKeysCheck: Array<String> = [
      "track_status",
      "is_active",
      "site_images",
    ];
    for (let key of Object.keys(claim)) {
      if (!excludedKeysCheck.includes(key)) {
        if (
          typeof claim[key as keyof typeof claim] == "string" &&
          !claim[key as keyof typeof claim].trim().length
        )
          errors.push(`${key} cannot be empty.`);
      }
    }
    if (claim["site_images"].length < 5)
      errors.push("Please upload atleast 5 images of the destroyed farm land.");
    return errors;
  },
};
