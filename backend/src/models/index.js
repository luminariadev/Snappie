import Admin from "./Admin.js";
import Frame from "./Frame.js";
import Foto from "./Foto.js";
import SubFoto from "./SubFoto.js";
import Transaksi from "./Transaksi.js";

// ==========================
//  RELASI ANTAR TABEL
// ==========================

// Admin → Frame
Admin.hasMany(Frame, { foreignKey: "id_admin" });
Frame.belongsTo(Admin, { foreignKey: "id_admin" });

// Frame → Foto
Frame.hasMany(Foto, { foreignKey: "id_frame" });
Foto.belongsTo(Frame, { foreignKey: "id_frame" });

// Foto → SubFoto
Foto.hasMany(SubFoto, { foreignKey: "id_foto", onDelete: "CASCADE" });
SubFoto.belongsTo(Foto, { foreignKey: "id_foto" });

// Foto → Transaksi (1 Foto = 1 Transaksi)
Foto.hasOne(Transaksi, { foreignKey: "id_foto", onDelete: "RESTRICT" });
Transaksi.belongsTo(Foto, { foreignKey: "id_foto" });

export { Admin, Frame, Foto, SubFoto, Transaksi };
