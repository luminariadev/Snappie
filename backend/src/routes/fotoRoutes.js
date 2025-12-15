import express from "express";
import {
  createFoto,
  getFoto,
  getFotoById,
  deleteFoto,
} from "../controllers/fotoController.js";

const router = express.Router();

router.get("/", getFoto);
router.get("/:id", getFotoById);
router.post("/", createFoto);
router.delete("/:id", deleteFoto);

export default router;
