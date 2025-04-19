const PropertyOwner = require("../models/PropertyOwner");
const bucket = require("../firebase");

const uploadToFirebase = async (file, path) => {
  const blob = bucket.file(path);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", reject);
    blobStream.on("finish", async () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(url);
    });
    blobStream.end(file.buffer);
  });
};

exports.registerPropertyOwner = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password, // No hashing
      aadhaarNumber,
      profession,
      gender,
      termsAccepted,
    } = req.body;

    // Image files
    const aadhaarPhoto = req.files["aadhaarPhotoUrl"][0];
    const selfie = req.files["selfieUrl"][0];
    const lightBill = req.files["lightBillUrl"][0];

    const aadhaarPhotoUrl = await uploadToFirebase(
      aadhaarPhoto,
      `aadhaarPhotos/${Date.now()}-${aadhaarPhoto.originalname}`
    );
    const selfieUrl = await uploadToFirebase(
      selfie,
      `selfies/${Date.now()}-${selfie.originalname}`
    );
    const lightBillUrl = await uploadToFirebase(
      lightBill,
      `lightBills/${Date.now()}-${lightBill.originalname}`
    );

    const newOwner = new PropertyOwner({
      name,
      email,
      phone,
      password, // Store password as it is, no hashing
      aadhaarNumber,
      aadhaarPhotoUrl,
      selfieUrl,
      lightBillUrl,
      profession,
      gender,
      termsAccepted,
    });

    await newOwner.save();
    res.status(201).json({ message: "Signup successful", owner: newOwner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use .env in production

exports.loginPropertyOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if owner exists
    const owner = await PropertyOwner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password directly (no hashing, since we're storing it as is)
    if (owner.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: owner._id, role: "propertyOwner" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      owner,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
exports.getOwnerProfile = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const owner = await PropertyOwner.findById(ownerId).select(
      "-password -__v"
    );
    if (!owner) {
      return res.status(404).json({ error: "Property owner not found" });
    }

    res.status(200).json({ owner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
