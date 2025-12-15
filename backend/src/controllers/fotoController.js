import Foto from "../models/Foto.js";
import Frame from "../models/Frame.js";

export const getFoto = async (req, res) => {
  res.json(await Foto.findAll());
};

export const getFotoById = async (req, res) => {
  const foto = await Foto.findByPk(req.params.id);
  foto
    ? res.json(foto)
    : res.status(404).json({ error: "Foto tidak ditemukan" });
};

export const createFoto = async (req, res) => {
  try {
    const { id_frame, delay_jepret = 0, filter_dipakai = "normal" } = req.body;

    if (!id_frame) {
      return res.status(400).json({ error: "id_frame wajib" });
    }

    // Pastikan frame ada
    const frame = await Frame.findByPk(id_frame);
    if (!frame) {
      return res.status(404).json({ error: "Frame tidak ditemukan" });
    }

    // Tentukan akses
    const isPremiumAccess = frame.tipe === "gratis";

    const foto = await Foto.create({
      id_frame,
      delay_jepret,
      filter_dipakai,

      // 🔑 PENTING
      tipe: frame.tipe,
      is_premium_access: isPremiumAccess,

      // ⏳ hasil belum ada
      hasil_foto: null,
      status: "pending", // optional tapi sangat disarankan
    });

    res.status(201).json({
      id_foto: foto.id_foto,
      is_premium_access: foto.is_premium_access,
      tipe: foto.tipe,
    });
  } catch (err) {
    console.error("CREATE FOTO ERROR:", err);
    res.status(500).json({ error: "Gagal memproses foto" });
  }
};


export const deleteFoto = async (req, res) => {
  const rows = await Foto.destroy({ where: { id_foto: req.params.id } });
  rows
    ? res.json({ message: "Berhasil hapus" })
    : res.status(404).json({ error: "Foto tidak ditemukan" });
};
