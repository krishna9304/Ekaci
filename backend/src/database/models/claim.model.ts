import { Document, model, ObjectId, Schema } from "mongoose";
import { cropDetails } from "./farmer.model";

export interface trackStatusEntity {
  stage: string;
  passed: boolean;
}

export const trackStatus: Array<trackStatusEntity> = [
  {
    stage: "claim_registered",
    passed: false,
  },
  {
    stage: "company_viewed_claim_data",
    passed: false,
  },
  {
    stage: "verification_and_checks",
    passed: false,
  },
  {
    stage: "dispersion_amount_calculation",
    passed: false,
  },
  {
    stage: "payment_initiated",
    passed: false,
  },
  {
    stage: "amount_credited",
    passed: false,
  },
];

export interface ClaimInterface extends Document {
  _id: ObjectId;
  insurance_id: ObjectId;
  claimant_id: string;
  payments: string; // 2/12 : for 2 completed installments out of 12
  track_status: Array<trackStatusEntity>;
  crop_details: cropDetails;
  site_images: Array<string>;
  is_active: boolean;
  loss_percent: string;
  loss_type: "standing-crop" | "post-harvest" | "calamity";
  date_of_loss: string;
  created_on: string;
  updated_on: string;
}

const Claim = new Schema<ClaimInterface>({
  insurance_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  claimant_id: {
    type: String,
    required: true,
  },
  payments: {
    type: String,
    required: true,
  },
  track_status: [
    {
      type: Object,
      default: trackStatus,
    },
  ],
  crop_details: {
    type: Object,
    required: true,
  },
  site_images: [
    {
      type: String,
      required: false,
    },
  ],
  is_active: {
    type: Boolean,
    default: false,
  },
  date_of_loss: {
    type: String,
    required: true,
  },
  loss_percent: {
    type: String,
    required: true,
  },
  loss_type: {
    type: String,
    required: true,
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

export default model("claim", Claim);
