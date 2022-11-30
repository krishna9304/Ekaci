import farmerModel, { FarmerInterface } from "../database/models/farmer.model";
import userModel from "../database/models/user.model";

export const FarmerServices = {
  async checkConflicts(farmer: FarmerInterface): Promise<Array<String>> {
    let errors: Array<String> = [];
    const userExists = await userModel.exists({
      metamask_address: farmer.farmer_id,
    });

    const farmerExists = await farmerModel.exists({
      farmer_id: farmer.farmer_id,
    });

    if (!userExists) {
      errors.push("Invalid farmer id!");
      return errors;
    }

    if (farmerExists) {
      errors.push("An account is already registered with this farmer id.");
    }
    const excludedKeysCheck = ["plot_desc", "bank_details", "crop_details"];
    for (let key of Object.keys(farmer)) {
      if (!excludedKeysCheck.includes(key)) {
        if (!farmer.get(key).trim().length)
          errors.push(`${key} is a required parameter.`);
      }
    }
    return errors;
  },
  prepareFarmerData(farmer: FarmerInterface) {
    if (!Object.keys(farmer).includes("avatar")) {
      const words = [farmer.first_name, farmer.last_name];
      const avatarLink = `https://avatar.tobi.sh/tobiaslins.svg?text=${
        words[0][0].toUpperCase() +
        (words[1].length > 1 ? words[1][0].toUpperCase() : "")
      }`;
      farmer.avatar = avatarLink;
    }
    return farmer;
  },
};
