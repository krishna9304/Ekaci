import {
  Document,
  Mixed,
  model,
  ObjectId,
  Schema,
  StringSchemaDefinition,
} from "mongoose";
import crypto from "crypto";

export interface UserInterface extends Document {
  validPassword: (password: any) => boolean;
  setPassword: (password: any) => void;
  _id: ObjectId;
  email: string;
  phone: string;
  password?: string;
  salt?: string;
  userType: "farmer" | "company" | "government";
  metamask_address: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  farmer_ref: Mixed | StringSchemaDefinition | undefined;
  company_ref: Mixed | StringSchemaDefinition | undefined;
  metadata?: Object | null;
  created_on: string;
  updated_on: string;
}

const User = new Schema<UserInterface>({
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: "farmer",
    required: true,
    enum: ["farmer", "company", "government"],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  metamask_address: {
    type: String,
    required: true,
  },
  farmer_ref: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  company_ref: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  updated_on: {
    type: String,
    default: new Date().toDateString(),
  },
});

User.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

User.methods.validPassword = function (password: string) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === hash;
};

export default model("user", User);
