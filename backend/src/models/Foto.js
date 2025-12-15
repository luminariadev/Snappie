// src/models/Foto.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Foto = sequelize.define(
  "Foto",
  {
    id_foto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_frame: { type: DataTypes.INTEGER, allowNull: false },
    waktu_ambil: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    delay_jepret: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    filter_dipakai: { type: DataTypes.STRING(100), allowNull: true },
    tipe: {
      type: DataTypes.ENUM("gratis", "premium"),
      allowNull: false,
      defaultValue: "gratis",
    },
    is_premium_access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "foto",
    timestamps: false,
  }
);

export default Foto;
