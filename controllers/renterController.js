const Renter = require("../models/Renter");
const bcrypt = require("bcryptjs");
const { uploadToFirebase } = require("../utils/firebase");

exports.registerRenter = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      permanentAddress,
      parentName,
      parentPhone,
      parentAadhaar,
      termsAccepted,
    } = req.body;

    const files = req.files;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !permanentAddress ||
      !parentName ||
      !parentPhone ||
      !parentAadhaar ||
      !termsAccepted ||
      !files?.aadhaarPhoto ||
      !files?.selfie
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingRenter = await Renter.findOne({ email });
    if (existingRenter) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const aadhaarURL = await uploadToFirebase(
      files.aadhaarPhoto[0],
      `renters/aadhaar/${Date.now()}_${files.aadhaarPhoto[0].originalname}`
    );
    const selfieURL = await uploadToFirebase(
      files.selfie[0],
      `renters/selfie/${Date.now()}_${files.selfie[0].originalname}`
    );

    const newRenter = new Renter({
      name,
      email,
      phone,
      password: hashedPassword,
      gender,
      permanentAddress,
      aadhaarPhotoURL: aadhaarURL,
      selfieURL: selfieURL,
      parentName,
      parentPhone,
      parentAadhaar,
      termsAccepted,
    });

    await newRenter.save();

    res.status(201).json({ message: "Renter registered successfully!" });
  } catch (err) {
    console.error("Error in registerRenter:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};
