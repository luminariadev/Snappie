// src/controllers/subFotoController.js
import SubFoto from "../models/SubFoto.js";
import Foto from "../models/Foto.js";

/**
 * GET semua subfoto berdasarkan id_foto
 * GET /api/subfoto/:id_foto
 */
export const getSubFotoByFoto = async (req, res) => {
  try {
    const { id_foto } = req.params;

    const data = await SubFoto.findAll({
      where: { id_foto },
      order: [["urutan_slot", "ASC"]],
    });

    return res.json({ message: "OK", data });
  } catch (err) {
    console.error("getSubFotoByFoto error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * POST subfoto baru
 * POST /api/subfoto
 * body: { id_foto, urutan_slot, file_temp_path }
 */
export const createSubFoto = async (req, res) => {
  try {
    const { id_foto, urutan_slot, file_temp_path } = req.body;

    if (!id_foto || !file_temp_path)
      return res
        .status(400)
        .json({ message: "id_foto dan file_temp_path wajib ada" });

    // pastikan foto parent ada
    const parent = await Foto.findByPk(id_foto);
    if (!parent)
      return res.status(404).json({ message: "Foto parent tidak ditemukan" });

    const subfoto = await SubFoto.create({
      id_foto,
      urutan_slot,
      file_temp_path,
    });

    return res.status(201).json({
      message: "Subfoto berhasil ditambahkan",
      data: subfoto,
    });
  } catch (err) {
    console.error("createSubFoto error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * DELETE subfoto
 * DELETE /api/subfoto/:id_subfoto
 */
export const deleteSubFoto = async (req, res) => {
  try {
    const { id_subfoto } = req.params;

    const sub = await SubFoto.findByPk(id_subfoto);
    if (!sub)
      return res.status(404).json({ message: "Subfoto tidak ditemukan" });

    await sub.destroy();

    return res.json({ message: "Subfoto berhasil dihapus" });
  } catch (err) {
    console.error("deleteSubFoto error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/**
 * UPDATE subfoto (opsional)
 * PATCH /api/subfoto/:id_subfoto
 */
export const updateSubFoto = async (req, res) => {
  try {
    const { id_subfoto } = req.params;
    const updates = req.body;

    const sub = await SubFoto.findByPk(id_subfoto);
    if (!sub)
      return res.status(404).json({ message: "Subfoto tidak ditemukan" });

    await sub.update(updates);

    return res.json({ message: "Subfoto berhasil diperbarui", data: sub });
  } catch (err) {
    console.error("updateSubFoto error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
