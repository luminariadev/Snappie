// src/models/SubFoto.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SubFoto = sequelize.define(
  "SubFoto",
  {
    id_subfoto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_foto: { type: DataTypes.INTEGER, allowNull: false },
    urutan_slot: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    waktu_ambil: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    file_temp_path: { type: DataTypes.TEXT, allowNull: false }, // store cloudinary url or temp path
  },
  {
    tableName: "subfoto",
    timestamps: false,
  }
);

export default SubFoto;
