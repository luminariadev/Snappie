import Frame from "../models/Frame.js";
import Foto from "../models/Foto.js";

// ================= GET =================
export const getAllFrames = async (req, res) => {
  const data = await Frame.findAll();
  res.json(data);
};

export const getFrameById = async (req, res) => {
  const frame = await Frame.findByPk(req.params.id);
  frame
    ? res.json(frame)
    : res.status(404).json({ error: "Frame tidak ditemukan" });
};

// ================= ADD FRAME =================
export const addFrame = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    if (!req.body) return res.status(400).json({ error: "Body kosong" });

    const {
      nama_frame,
      tipe,
      jumlah_slot_default,
      deskripsi,
      id_admin,
      harga,
    } = req.body;

    const thumb = req.files["thumb"]?.[0] || null;
    const f1 = req.files["frame1"]?.[0] || null;
    const f3 = req.files["frame3"]?.[0] || null;
    const f4 = req.files["frame4"]?.[0] || null;

    // Parse jumlah_slot_default dan harga ke number
    const jumlahSlot = parseInt(jumlah_slot_default) || 1;
    const hargaNum = parseInt(harga) || 0;

    const frame = await Frame.create({
      nama_frame,
      tipe,
      jumlah_slot_default: jumlahSlot,
      deskripsi,
      id_admin,
      harga: hargaNum,
      thumb_path: thumb ? `/uploads/thumb/${thumb.filename}` : null,
      frame1_path: f1 ? `/uploads/frame1/${f1.filename}` : null,
      frame3_path: f3 ? `/uploads/frame3/${f3.filename}` : null,
      frame4_path: f4 ? `/uploads/frame4/${f4.filename}` : null,
    });

    res.status(201).json(frame);
  } catch (err) {
    console.error("ERROR ADD FRAME:", err);
    res.status(400).json({ error: err.message });
  }
};

// ================= UPDATE FRAME =================
export const updateFrame = async (req, res) => {
  try {
    const id = req.params.id;

    const { nama_frame, tipe, jumlah_slot_default, deskripsi, id_admin, harga } = req.body;

    const thumb = req.files["thumb"]?.[0] ? `/uploads/thumb/${req.files["thumb"][0].filename}` : null;
    const f1 = req.files["frame1"]?.[0] ? `/uploads/frame1/${req.files["frame1"][0].filename}` : null;
    const f3 = req.files["frame3"]?.[0] ? `/uploads/frame3/${req.files["frame3"][0].filename}` : null;
    const f4 = req.files["frame4"]?.[0] ? `/uploads/frame4/${req.files["frame4"][0].filename}` : null;

    const frame = await Frame.findByPk(id);
    if (!frame) return res.status(404).json({ error: "Frame tidak ditemukan" });

    await frame.update({
      nama_frame: nama_frame ?? frame.nama_frame,
      tipe: tipe ?? frame.tipe,
      jumlah_slot_default: jumlah_slot_default !== undefined ? parseInt(jumlah_slot_default) : frame.jumlah_slot_default,
      deskripsi: deskripsi ?? frame.deskripsi,
      id_admin: id_admin ?? frame.id_admin,
      harga: harga !== undefined ? parseInt(harga) : frame.harga,
      thumb_path: thumb ?? frame.thumb_path,
      frame1_path: f1 ?? frame.frame1_path,
      frame3_path: f3 ?? frame.frame3_path,
      frame4_path: f4 ?? frame.frame4_path,
    });

    res.json(frame);
  } catch (err) {
    console.error("Update frame error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE FRAME =================
export const deleteFrame = async (req, res) => {
  try {
    const used = await Foto.findOne({
      where: { id_frame: req.params.id },
    });

    if (used) {
      return res.status(400).json({
        error: "Frame sudah digunakan, tidak bisa dihapus",
      });
    }

    await Frame.destroy({ where: { id_frame: req.params.id } });
    res.json({ message: "Frame berhasil dihapus" });
  } catch (err) {
    console.error("Delete frame error:", err);
    res.status(500).json({ error: err.message });
  }
};
