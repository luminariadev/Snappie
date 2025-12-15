import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Admin = sequelize.define(
  "Admin",
  {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_admin: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "editor"),
      defaultValue: "editor",
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

export default Admin;
