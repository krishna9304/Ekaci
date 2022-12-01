import userModel, { UserInterface } from "../database/models/user.model";
import validator from "validator";

export const UserServices = {
  async checkConflicts(user: UserInterface) {
    let errors: Array<String> = [];
    if (user.email && !validator.isEmail(user.email)) {
      errors.push("Unidentified Email.");
    }
    if (user.phone && !validator.isMobilePhone(String(user.phone))) {
      errors.push("Unidentified Phone Number.");
    }
    try {
      const emailExists = await userModel.exists({ email: user.email });
      if (emailExists) errors.push("This email is already in use.");
      const phoneExists = await userModel.exists({ phone: user.phone });
      if (phoneExists) errors.push("This phone number is already in use.");
      const walletAddExists = await userModel.exists({
        metamask_address: user.metamask_address,
      });
      if (walletAddExists)
        errors.push("This metamask address is already in use.");
    } catch (err: any) {
      errors.push(JSON.stringify(err));
    }
    return errors;
  },
};
