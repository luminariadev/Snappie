import { snap } from "../config/midtrans.js";
import { Foto, Transaksi } from "../models/index.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const genOrderId = (id_foto) => `SNAPPIE-${id_foto}-${Date.now()}`;

/**
 * CREATE TRANSACTION
 */
export const createTransaction = async (req, res) => {
  try {
    const { id_foto, jumlah_bayar } = req.body;
    if (!id_foto || !jumlah_bayar) {
      return res.status(400).json({ message: "id_foto & jumlah_bayar required" });
    }

    const foto = await Foto.findByPk(id_foto);
    if (!foto) return res.status(404).json({ message: "Foto tidak ditemukan" });

    const existing = await Transaksi.findOne({ where: { id_foto } });
    if (existing && existing.status_pembayaran === "berhasil") {
      return res.status(400).json({ message: "Foto sudah dibayar" });
    }

    const order_id = genOrderId(id_foto);

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: Number(jumlah_bayar),
      },
      callbacks: {
        finish: `${process.env.FRONTEND_URL}/payment-success?fotoId=${id_foto}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    const payment_url = transaction.redirect_url; // 🔥 FIX UTAMA

    let trx;
    if (existing) {
      existing.order_id = order_id;
      existing.jumlah_bayar = jumlah_bayar;
      existing.payment_url = payment_url;
      existing.status_pembayaran = "pending";
      await existing.save();
      trx = existing;
    } else {
      trx = await Transaksi.create({
        id_foto,
        jumlah_bayar,
        order_id,
        payment_url,
        status_pembayaran: "pending",
      });
    }

    return res.status(201).json({
      message: "Transaksi dibuat",
      data: {
        id_transaksi: trx.id_transaksi,
        order_id,
        payment_url, // 🔥 frontend pakai ini
      },
    });
  } catch (err) {
    console.error("createTransaction error:", err);
    return res.status(500).json({
      message: "Gagal membuat transaksi",
      error: err.message,
    });
  }
};


export const midtransNotification = async (req, res) => {
  try {
    const notif = req.body;

    const {
      order_id,
      transaction_status,
      fraud_status,
      gross_amount,
      signature_key,
    } = notif;

    if (!order_id) {
      return res.status(200).json({ message: "No order_id" });
    }

    /* ================= VERIFY SIGNATURE ================= */
    const expectedSignature = crypto
      .createHash("sha512")
      .update(
        order_id +
          notif.status_code +
          gross_amount +
          process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.warn("❌ Invalid Midtrans signature");
      return res.status(403).json({ message: "Invalid signature" });
    }

    /* ================= MAP STATUS ================= */
    let newStatus = "pending";

    if (
      transaction_status === "capture" &&
      fraud_status === "accept"
    ) {
      newStatus = "berhasil";
    }

    if (transaction_status === "settlement") {
      newStatus = "berhasil";
    }

    if (["cancel", "deny", "expire"].includes(transaction_status)) {
      newStatus = "gagal";
    }

    /* ================= UPDATE DB ================= */
    const trx = await Transaksi.findOne({ where: { order_id } });
    if (!trx) {
      return res.status(200).json({ message: "Order not found" });
    }

    trx.status_pembayaran = newStatus;
    await trx.save();

    /* ================= UNLOCK FOTO ================= */
    if (newStatus === "berhasil") {
      const foto = await Foto.findByPk(trx.id_foto);
      if (foto) {
        foto.is_premium_access = true;
        await foto.save();
      }
    }

    return res.status(200).json({
      message: "Notification processed",
      order_id,
      status: newStatus,
    });
  } catch (err) {
    console.error("midtransNotification error:", err);
    return res.status(500).json({ message: "Webhook error" });
  }
};

/**
 * Validate Premium Access (for download)
 * GET /api/payment/validate?id_foto=123
 */
export const validatePremiumAccess = async (req, res) => {
  try {
    const id_foto = req.query.id_foto || req.body.id_foto;
    if (!id_foto) return res.status(400).json({ message: "id_foto required" });

    const foto = await Foto.findByPk(id_foto, { include: [Transaksi] });
    if (!foto) return res.status(404).json({ message: "Foto tidak ditemukan" });

    if (foto.is_premium_access) {
      return res.json({ allowed: true, message: "Akses premium diizinkan" });
    }

    // fallback: check transaksi
    const trx = await Transaksi.findOne({
      where: { id_foto, status_pembayaran: "berhasil" },
    });
    if (trx) {
      // ensure foto flag is set (idempotent)
      if (!foto.is_premium_access) {
        foto.is_premium_access = true;
        await foto.save();
      }
      return res.json({
        allowed: true,
        message: "Akses premium diizinkan (via transaksi)",
      });
    }

    return res.json({
      allowed: false,
      message: "Belum ada pembayaran berhasil untuk foto ini",
    });
  } catch (err) {
    console.error("validatePremiumAccess error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


/**
 * Check Payment Status (Polling from Frontend)
 * GET /api/payment/status/:id_foto
 */
export const checkPaymentStatus = async (req, res) => {
  try {
    const { id_foto } = req.params;

    const trx = await Transaksi.findOne({
      where: { id_foto },
      order: [["waktu_transaksi", "DESC"]],
    });

    if (!trx) {
      return res.json({ status: "not_found" });
    }

    return res.json({
      status: trx.status_pembayaran, // pending | berhasil | gagal
      order_id: trx.order_id,
    });
  } catch (err) {
    console.error("checkPaymentStatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


