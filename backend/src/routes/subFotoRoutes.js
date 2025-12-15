// src/routes/subFotoRoutes.js
import express from "express";
import {
  getSubFotoByFoto,
  createSubFoto,
  deleteSubFoto,
  updateSubFoto,
} from "../controllers/subFotoController.js";

const router = express.Router();

// GET semua subfoto berdasarkan id_foto
router.get("/:id_foto", getSubFotoByFoto);

// Tambah subfoto (body)
router.post("/", createSubFoto);

// Update subfoto
router.patch("/:id_subfoto", updateSubFoto);

// Hapus subfoto
router.delete("/:id_subfoto", deleteSubFoto);

export default router;
