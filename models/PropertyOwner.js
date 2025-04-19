const mongoose = require("mongoose");

const propertyOwnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  aadhaarNumber: String,
  aadhaarPhotoUrl: String,
  selfieUrl: String,
  lightBillUrl: String,
  profession: String,
  gender: String,
  termsAccepted: Boolean,
});

module.exports = mongoose.model("PropertyOwner", propertyOwnerSchema);
