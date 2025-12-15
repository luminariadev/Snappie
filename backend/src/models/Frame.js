// src/models/Frame.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Frame = sequelize.define(
  "Frame",
  {
    id_frame: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_admin: { type: DataTypes.INTEGER, allowNull: false },
    nama_frame: { type: DataTypes.STRING(100), allowNull: false },
    tipe: { type: DataTypes.ENUM("gratis", "premium"), allowNull: false },
    jumlah_slot_default: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    deskripsi: { type: DataTypes.TEXT, allowNull: true },
    harga: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

    thumb_path: DataTypes.STRING,
    frame1_path: DataTypes.STRING,
    frame3_path: DataTypes.STRING,
    frame4_path: DataTypes.STRING,

    file_path: DataTypes.STRING,
  },
  {
    tableName: "frame",       // ✅ PAKAI table frame
    freezeTableName: true,    // 🔥 CEGah Sequelize bikin "Frames"
    timestamps: false,        // karena table frame tidak punya createdAt
  }
);

export default Frame;
