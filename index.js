const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // ✅ only declared once
const renterRoutes = require("./routes/renterRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors()); // optional: if you're calling from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/renters", renterRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
