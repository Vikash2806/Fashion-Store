import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // for safety

// ---------------- MONGODB ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo connected"))
  .catch((e) => console.error("❌ Mongo error:", e));

// ---------------- MODELS ----------------
const DressSchema = new mongoose.Schema({
  number: Number,
  name: String,
  price: Number,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});
const Dress = mongoose.model("Dress", DressSchema);

// ---------------- ADMIN PASSWORD ----------------
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || null;

async function checkPassword(plain) {
  if (ADMIN_PASS_HASH) return bcrypt.compare(plain, ADMIN_PASS_HASH);
  return plain === process.env.ADMIN_PASSWORD;
}

// ---------------- AUTH MIDDLEWARE ----------------
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ---------------- CLOUDINARY SETUP ----------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "dresses",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({ storage });

// ---------------- ROUTES ----------------

// Admin login
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  const ok = await checkPassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

// Upload multiple images
app.post("/api/upload", authMiddleware, upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const urls = req.files.map((file) => file.path);
    res.json({ urls });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// Get all dresses
app.get("/api/dresses", async (req, res) => {
  const list = await Dress.find().sort({ number: 1 });
  res.json(list);
});

// Create dress
app.post("/api/dresses", authMiddleware, async (req, res) => {
  try {
    const { name, price, images } = req.body;
    const count = await Dress.countDocuments();
    const doc = await Dress.create({
      number: count + 1,
      name,
      price,
      images,
    });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create dress" });
  }
});

// Update dress
app.put("/api/dresses/:id", authMiddleware, async (req, res) => {
  try {
    const doc = await Dress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(doc);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

// Delete dress
app.delete("/api/dresses/:id", authMiddleware, async (req, res) => {
  try {
    await Dress.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ---------------- START SERVER ----------------
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
