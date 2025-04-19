const mongoose = require("mongoose");

const renterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String },
  permanentAddress: { type: String },
  aadhaarPhotoURL: { type: String },
  selfieURL: { type: String },
  parentName: { type: String },
  parentPhone: { type: String },
  parentAadhaar: { type: String },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Renter", renterSchema);
