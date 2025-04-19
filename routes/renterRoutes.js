const express = require("express");
const router = express.Router();
const { registerRenter } = require("../controllers/renterController");
const upload = require("../middlewares/multer");

router.post(
  "/register",
  upload.fields([
    { name: "aadhaarPhoto", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  registerRenter
);

module.exports = router;
