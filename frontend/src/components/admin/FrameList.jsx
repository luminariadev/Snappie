// // 📌 LIST SEMUA FRAME — TABEL STYLE SNAPPIE (FINAL)
// export default function FrameList({ frames, onDelete }) {
//   return (
//     <div
//       className="
//         w-full max-w-[1500px]
//         mt-8
//         bg-white rounded-[12px]
//         border-[2px] border-black
//         shadow-[0_4px_0_#000]
//         overflow-hidden
//       "
//     >
//       {/* Header Tabel */}
//       <div className="bg-snappiePink border-b-[2px] border-black grid grid-cols-6 font-semantic text-[13px] py-3 px-6">
//         <span>Thumbnail</span>
//         <span>Nama</span>
//         <span>Jenis</span>
//         <span>Harga</span>
//         <span>Preview Frame</span>
//         <span>Aksi</span>
//       </div>

//       {/* Data Loop */}
//       {frames.map((frame) => (
//         <div
//           key={frame.id}
//           className="
//             grid grid-cols-6 items-center gap-3
//             font-semantic text-[12px]
//             py-4 px-6
//             border-b border-black/20
//           "
//         >
//           {/* 🖼 Thumbnail */}
//           <img
//             src={frame.thumb}
//             alt={frame.namaFrame}
//             className="w-[55px] h-[55px] object-cover rounded-[6px] border-[2px] border-black bg-white"
//           />

//           {/* Nama */}
//           <span>{frame.namaFrame}</span>

//           {/* Jenis */}
//           <span className="text-[#4B5563]">
//             {frame.jenis === "premium" ? "Premium" : "Gratis"}
//           </span>

//           {/* Harga */}
//           <span>
//             {frame.jenis === "gratis" ? "Rp 0" : `Rp ${frame.harga}.000`}
//           </span>

//           {/* Mini preview frameByStrip */}
//           <div className="flex gap-2">
//             {frame.frameByStrip?.[1] && (
//               <img
//                 src={frame.frameByStrip[1]}
//                 className="w-[35px] h-[35px] border-2 border-black rounded"
//               />
//             )}
//             {frame.frameByStrip?.[3] && (
//               <img
//                 src={frame.frameByStrip[3]}
//                 className="w-[35px] h-[35px] border-2 border-black rounded"
//               />
//             )}
//             {frame.frameByStrip?.[4] && (
//               <img
//                 src={frame.frameByStrip[4]}
//                 className="w-[35px] h-[35px] border-2 border-black rounded"
//               />
//             )}
//           </div>

//           {/* Aksi (Edit/Delete) */}
//           <div className="flex gap-3 text-[14px]">
//             <button
//               type="button"
//               className="hover:scale-110 transition"
//               onClick={() => alert("Feature edit soon")}
//             >
//               ✏️
//             </button>

//             <button
//               type="button"
//               onClick={() => onDelete(frame.id)}
//               className="hover:scale-110 transition"
//             >
//               🗑️
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// 📌 LIST SEMUA FRAME — TABEL STYLE SNAPPIE (FINAL)
// src/components/admin/FrameList.jsx
export default function FrameList({ frames, onDelete, onEdit }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr className="bg-[#FFE97F] border-b-2 border-black">
            <th className="px-4 py-2 border border-black">Thumbnail</th>
            <th className="px-4 py-2 border border-black">Nama Frame</th>
            <th className="px-4 py-2 border border-black">Jenis</th>
            <th className="px-4 py-2 border border-black">Preview</th>
            <th className="px-4 py-2 border border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {frames.map((frame) => (
            <tr key={frame.id} className="border-b border-black">
              <td className="px-2 py-1 border border-black">
                {frame.thumb ? (
                  <img
                    src={frame.thumb}
                    alt={frame.namaFrame}
                    className="w-[55px] h-[55px] object-cover rounded-[6px] border-[2px] border-black bg-white"
                  />
                ) : (
                  <div className="w-[55px] h-[55px] bg-gray-300 rounded-[6px]" />
                )}
              </td>
              <td className="px-4 py-2 border border-black">{frame.namaFrame}</td>
              <td className="px-4 py-2 border border-black">{frame.jenis}</td>
              <td className="px-4 py-2 border border-black">
                {Object.entries(frame.frameByStrip).map(([slot, path]) =>
                  path ? (
                    <img
                      key={slot}
                      src={path}
                      alt={`Slot ${slot}`}
                      className="w-[35px] h-[35px] border-2 border-black rounded mr-2"
                    />
                  ) : null
                )}
              </td>
              <td className="px-4 py-2 border border-black flex gap-2">
                <button
                  onClick={() => onEdit && onEdit(frame)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(frame.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
