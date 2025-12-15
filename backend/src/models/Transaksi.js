import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Transaksi = sequelize.define(
  "Transaksi",
  {
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_foto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    waktu_transaksi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    metode_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "QRIS",
    },
    jumlah_bayar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.ENUM("pending", "berhasil", "gagal"),
      allowNull: false,
      defaultValue: "pending",
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    payment_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "transaksi",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Transaksi;
