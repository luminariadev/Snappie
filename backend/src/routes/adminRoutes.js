import express from "express";
import {
  addAdmin,
  loginAdmin,
  getAdmins,
} from "../controllers/adminController.js";

const router = express.Router();

// GET semua admin
router.get("/", getAdmins);

// Register admin baru
router.post("/register", addAdmin);

// Login
router.post("/login", loginAdmin);

export default router;
