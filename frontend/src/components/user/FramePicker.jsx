// export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
//   return (
//     <div className="w-[500px] bg-white rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">

//       <div className="bg-[#F4A9B8] px-6 py-3 border-b-2 border-black flex items-center justify-center">
//         <h2
//           className="font-press text-2xl text-[#FFE97F] tracking-wide"
//           style={{ textShadow: "2px 4px 5px #000" }}
//         >
//           CHOOSE YOUR FRAME
//         </h2>
//       </div>

//       <div className="p-10">
//         <div className="bg-[#FFE97F] rounded-2xl border-[2.5px] border-black p-6">
          
//           <div className="flex flex-wrap gap-9">
//             {frames.map(f => (
//               <button
//                 key={f.id}
//                 onClick={() => {
//                   if (f.isPremium) {
//                     alert("Frame premium! Tidak bisa digunakan.");
//                     return;
//                   }
//                   onPickFrame(f);
//                 }}
//                 className={`relative w-12 h-12 rounded-full border-[3px] overflow-hidden hover:scale-110 transition
//                   ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}
//                   ${f.isPremium ? "opacity-60 cursor-not-allowed" : ""}
//                 `}
//               >
//                 {f.thumb ? (
//                   <img
//                     src={f.thumb}
//                     crossOrigin="anonymous"
//                     className="w-full h-full object-cover"
//                     alt={`Frame ${f.id}`}
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-black">
//                     No Thumb
//                   </div>
//                 )}

//                 {/* 🔒 ICON LOCK */}
//                 {f.isPremium && (
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold">
//                     🔒
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
  if (!frames.length) {
    return (
      <div className="w-[500px] bg-white rounded-[28px] p-10 text-center">
        Tidak ada frame tersedia
      </div>
    );
  }

  return (
    <div className="w-[500px] bg-white rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">

      <div className="bg-[#F4A9B8] px-6 py-3 border-b-2 border-black flex items-center justify-center">
        <h2
          className="font-press text-2xl text-[#FFE97F]"
          style={{ textShadow: "2px 4px 5px #000" }}
        >
          CHOOSE YOUR FRAME
        </h2>
      </div>

      <div className="p-10">
        <div className="bg-[#FFE97F] rounded-2xl border-[2.5px] border-black p-6">
          <div className="flex flex-wrap gap-9 justify-center">
            {frames.map(f => (
              <button
                key={f.id}
                onClick={() => onPickFrame(f)}
                className={`relative w-12 h-12 rounded-full border-[3px] overflow-hidden transition
                  hover:scale-110
                  ${selectedFrame?.id === f.id ? "ring-4 ring-black" : ""}
                `}
              >
                {f.thumb ? (
                  <img
                    src={f.thumb}
                    className="w-full h-full object-cover"
                    alt={f.nama}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[10px]">
                    NO THUMB
                  </div>
                )}

                {f.isPremium && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
                    🔒
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
