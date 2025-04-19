const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// ✅ Replace this with your actual Firebase config
const firebaseConfig = require("../serviceAccountKey.json");

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const uploadToFirebase = async (file, folderPath) => {
  const fileBuffer = fs.readFileSync(file.path);
  const fileName = `${folderPath}/${uuidv4()}_${file.originalname}`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, fileBuffer, {
    contentType: file.mimetype,
  });

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

module.exports = { uploadToFirebase };
