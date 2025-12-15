import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads";

    if (file.fieldname === "thumb") folder = "uploads/thumb";
    if (file.fieldname === "frame1") folder = "uploads/frame1";
    if (file.fieldname === "frame3") folder = "uploads/frame3";
    if (file.fieldname === "frame4") folder = "uploads/frame4";

    // Buat folder jika belum ada
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${unique}${ext}`);
  },
});

export const uploadFrame = multer({ storage });
