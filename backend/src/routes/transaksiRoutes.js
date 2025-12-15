import express from "express";
import { getAllTransactions } from "../controllers/transaksiController.js";

const router = express.Router();

router.get("/", getAllTransactions);

export default router;
