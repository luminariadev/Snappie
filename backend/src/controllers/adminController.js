import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res) => {
  try {
    const { nama_admin, username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      nama_admin,
      username,
      password_hash: hashed,
    });

    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: "Admin tidak ditemukan" });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: "Password salah" });

    const token = jwt.sign(
      { id: admin.id_admin, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdmins = async (req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
};
