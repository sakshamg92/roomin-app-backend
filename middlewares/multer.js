const multer = require("multer");

// Use memory storage so we can upload directly to Firebase
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
