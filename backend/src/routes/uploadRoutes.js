import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { uploadFrame } from "../middleware/uploadFrame.js";

const router = express.Router();

router.post("/", uploadFrame.single("file"), uploadImage);
// Field wajib: "file"

export default router;
