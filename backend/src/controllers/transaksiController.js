import { Transaksi, Foto, Frame } from "../models/index.js";

export const getAllTransactions = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({
      order: [["waktu_transaksi", "DESC"]],
      include: [
        {
          model: Foto,
          include: [
            {
              model: Frame,
              attributes: ["nama_frame"],
            },
          ],
        },
      ],
    });

const mapped = transaksi.map((t) => {
  const isPremium = t.status_pembayaran === "berhasil";

  return {
    id: t.order_id,
    frame: t.Foto?.Frame?.nama_frame || "-",
    filter: t.Foto?.filter_dipakai || "-",
    date: t.waktu_transaksi,
    status: isPremium ? "Premium" : "Gratis",
    harga: isPremium ? Number(t.jumlah_bayar) : 0, // ✅ HARD CODE
  };
});


    return res.json(mapped);
  } catch (err) {
    console.error("getAllTransactions error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
