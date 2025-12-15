import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};
