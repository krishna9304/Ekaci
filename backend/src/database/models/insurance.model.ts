import {
  Document,
  Mixed,
  model,
  ObjectId,
  Schema,
  StringSchemaDefinition,
} from "mongoose";

export interface InsuranceInterface extends Document {
  _id: ObjectId;
  name: string;
  content: string; // PDF document
  tenure: string;
  premium: string;
  total_amount: string;
  covered_crops: Array<string>;
  company_ref: Mixed | StringSchemaDefinition | undefined;
  metadata: any;
  created_on: string;
  updated_on: string;
}

const Insurance = new Schema<InsuranceInterface>({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tenure: {
    type: String,
    required: true,
  },
  premium: {
    type: String,
    required: true,
  },
  total_amount: {
    type: String,
    required: true,
  },
  covered_crops: [
    {
      type: String,
      required: true,
    },
  ],
  company_ref: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  metadata: {
    type: Object,
    required: false,
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

export default model("insurance", Insurance);
