const multer = require("multer");

const storage = multer.memoryStorage(); // for Firebase
const upload = multer({ storage: storage });

module.exports = upload;
