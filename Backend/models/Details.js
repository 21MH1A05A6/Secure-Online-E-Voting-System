const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema({
  voterId: {
    type: String,
    unique: true, // Ensure each voter ID is unique
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 12,
    maxlength: 12,
  },
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "Andhra Pradesh", // Default value
    required: true,
  },
  country: {
    type: String,
    default: "India", // Default value
    required: true,
  },
  fingerprintScan: {
    type: String, // Can store base64 encoded image or file path
    default: "",
  },
  irisScan: {
    type: String, // Can store base64 encoded image or file path
    default: "",
  },
});

const Details = mongoose.model("Details", DetailsSchema);
module.exports = Details;
