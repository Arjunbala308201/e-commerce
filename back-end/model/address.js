import mongoose from "mongoose";
import { type } from "os";

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [/^(\+91)?\d{10}$/, "Invalid phone number"]
    // Ensures 10-digit number
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Invalid pincode"], // Ensures 6-digit Indian pincode
  },
  locality: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
    default: "",
  },
  alternatePhone: {
    type: String,
    match: [/^(\+91)?\d{10}$/, "Invalid phone number"],
    default: "",
  },
  addressType: {
    type: String,
    enum: ["Home", "Work"],
    default: "Home",
  },
}, { timestamps: true });

export const Address = mongoose.model("Address", addressSchema);
