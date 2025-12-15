import express from "express";
import {
  createTransaction,
  midtransNotification,
  validatePremiumAccess,
  checkPaymentStatus, // 🔥 TAMBAHKAN
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create", createTransaction);
router.post("/notification", express.json(), midtransNotification);
router.get("/validate", validatePremiumAccess);

// 🔥 INI YANG ERROR TADI
router.get("/status/:id_foto", checkPaymentStatus);

export default router;
