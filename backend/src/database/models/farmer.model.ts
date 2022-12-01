import {
  Document,
  Mixed,
  model,
  ObjectId,
  Schema,
  StringSchemaDefinition,
} from "mongoose";

export const random_prof = "https://avatar.tobi.sh/tobiaslins.svg?text=TL";

export interface plotDescription {
  plot_no: string;
  plot_area: string;
  tehsil_no: string;
  plot_image: string;
}

export interface cropDetails {
  crop_type: string;
  crop_name: string;
  irrigation_methods: string;
  season: string;
}

export interface bankDetails {
  customer_name: string;
  branch_name: string;
  branch_address: string;
  ifsc_code: string;
  acc_no: string;
}

export interface FarmerInterface extends Document {
  _id?: ObjectId;
  farmer_id: string; // Metamask wallet address
  avatar?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  post_office: string;
  police_station: string;
  district: string;
  pincode: string;
  state: string;
  landmark?: string;
  plot_desc: plotDescription;
  farmer_type: "small" | "marginal" | "others";
  farmer_category: "owner" | "tenant" | "shared-cropping";
  bank_details: bankDetails;
  crop_details: Array<cropDetails>;
  created_on: string;
  updated_on: string;
}

const Farmer = new Schema<FarmerInterface>({
  farmer_id: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:random_prof
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  post_office: {
    type: String,
    required: true,
  },
  police_station: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: false,
  },
  plot_desc: {
    type: Object,
    required: true,
    default: {},
  },
  farmer_type: {
    type: String,
    required: true,
    default: "small",
  },
  farmer_category: {
    type: String,
    required: true,
    default: "owner",
  },
  bank_details: {
    type: Object,
    required: true,
    default: {},
  },
  crop_details: [
    {
      type: Object,
      required: true,
      default: {},
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

export default model("farmer", Farmer);
