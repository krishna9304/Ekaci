import { Document, model, ObjectId, Schema } from "mongoose";

export interface CompanyInterface extends Document {
  _id: ObjectId;
  company_name: string;
  company_id: string;
  avatar: string;
  address: string;
  is_verified: boolean;
  documents: Array<string>;
  admin_emp_id: string;
  created_on: string;
  updated_on: string;
}

const Company = new Schema<CompanyInterface>({
  company_name: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  documents: [
    {
      type: String,
      required: false,
    },
  ],
  created_on: {
    type: String,
    default: new Date().toDateString(),
  },
  updated_on: {
    type: String,
    default: new Date().toDateString(),
  },
});

export default model("company", Company);
