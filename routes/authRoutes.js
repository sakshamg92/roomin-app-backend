const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const verifyToken = require("../middlewares/verifyToken");

const {
  registerPropertyOwner,
  loginPropertyOwner,
  getOwnerProfile,
} = require("../controllers/authController");

router.post(
  "/signup-owner",
  upload.fields([
    { name: "aadhaarPhotoUrl", maxCount: 1 },
    { name: "selfieUrl", maxCount: 1 },
    { name: "lightBillUrl", maxCount: 1 },
  ]),
  registerPropertyOwner
);

router.post("/login-owner", loginPropertyOwner);

// ✅ GET Profile route
router.get("/owner-profile", verifyToken, getOwnerProfile);

module.exports = router;
