// // EditFrame.jsx
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import FramePicker from "../../components/user/FramePicker";
// import FramePreview from "../../components/user/FramePreview";
// import { ALL_FRAMES } from "../../data/frameLists";

// export default function EditFrame() {
//   const location = useLocation();
//   const photos = location.state?.photos || [];
//   const [selectedFrame, setSelectedFrame] = useState(null);

//   const stripCount = Math.min(photos.length, 4);

//   // Konversi CM → pixel
//   const CM = 37.79527559;
//   const CONFIG = {
//     4: { width: 8.83 * CM, height: 4.79 * CM, x: 0.84 * CM, yStart: 2 * CM, gap: 0.7 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
//     3: { width: 8.83 * CM, height: 5 * CM, x: 0.85 * CM, yStart: 1.2 * CM, gap: 1.4 * CM, frameWidth: 10.5 * CM, frameHeight: 22.5 * CM },
//     2: { width: 8.83 * CM, height: 9.5 * CM, x: 0.84 * CM, yStart: 4 * CM, gap: 1.5 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
//     1: { width: 12.5 * CM, height: 8.5 * CM, x: 0.8 * CM, yStart: 1 * CM, gap: 0, frameWidth: 14 * CM, frameHeight: 10.5 * CM }
//   };

//   const SLOT = CONFIG[stripCount];

//   // HANDLE DOWNLOAD FILE PNG
//   const handleDownload = async () => {
//     if (!selectedFrame) return alert("Pilih frame dulu!");

//     const canvas = document.createElement("canvas");
//     canvas.width = SLOT.frameWidth;
//     canvas.height = SLOT.frameHeight;
//     const ctx = canvas.getContext("2d");

//     // background putih
//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Gambar foto-foto
//     for (let i = 0; i < stripCount; i++) {
//       const img = new Image();
//       img.src = photos[i];

//       await new Promise((resolve) => {
//         img.onload = () => {
//           const scale = Math.max(SLOT.width / img.width, SLOT.height / img.height);
//           const w = img.width * scale;
//           const h = img.height * scale;

//           const x = SLOT.x + (SLOT.width - w) / 2;
//           const y =
//             SLOT.yStart + i * (SLOT.height + SLOT.gap) +
//             (SLOT.height - h) / 2;

//           ctx.drawImage(img, x, y, w, h);
//           resolve();
//         };
//       });
//     }

//     // Ambil frame data dari ALL_FRAMES
//     const frameData = ALL_FRAMES.find(f => f.id === selectedFrame.id);
//     if (!frameData) return alert("Frame tidak ditemukan!");

//     // FRAME WARNA
//     if (frameData.type === "color") {
//       // Border full menutupi frame
//       ctx.strokeStyle = frameData.color;
//       ctx.lineWidth = 60; // lebih tebal agar full-cover
//       ctx.strokeRect(0, 0, SLOT.frameWidth, SLOT.frameHeight);

//       // === WATERMARK SNAPPIE GOLD PIXEL ===
//       ctx.save();

//       ctx.font = "26px 'Press Start 2P', system-ui";
//       ctx.textAlign = "right";

//       const x = SLOT.frameWidth - 22;
//       const y = SLOT.frameHeight - 22;

//       // Outline / shadow
//       ctx.fillStyle = "#6E5100";
//       ctx.fillText("Snappie", x + 2, y + 2);

//       // Text gold
//       ctx.fillStyle = "#F5D94E";
//       ctx.fillText("Snappie", x, y);

//       ctx.restore();
//     }

    
//     // FRAME GAMBAR
//     if (frameData.type === "image") {
//       const imgFrame = new Image();
//       imgFrame.src = frameData.frameByStrip[stripCount];

//       await new Promise((resolve) => {
//         imgFrame.onload = () => {
//           ctx.drawImage(imgFrame, 0, 0, SLOT.frameWidth, SLOT.frameHeight);
//           resolve();
//         };
//       });
//     }

//     // Download file
//     const link = document.createElement("a");
//     link.href = canvas.toDataURL("image/png");
//     link.download = `photobooth-${frameData.id}.png`;
//     link.click();
//   };

//   // UI LAYOUT
//   return (
//     <div
//       className="min-h-screen bg-[#FFF3D8] flex items-start justify-center p-20 gap-16"
//       style={{
//         backgroundImage: "url(/webImage/Camera.png)",
//         backgroundSize: "cover",
//         backgroundPosition: "center"
//       }}
//     >
//       {/* PREVIEW */}
//       <div className="scale-75 origin-top flex flex-col items-center gap-4">
//         <FramePreview
//           photos={photos}
//           selectedFrame={selectedFrame}
//           stripCount={stripCount}
//         />
//       </div>

//       {/* PICKER + BUTTON */}
//       <div className="self-start flex flex-col items-center gap-4">
//         <FramePicker
//           frames={ALL_FRAMES}
//           selectedFrame={selectedFrame}
//           onPickFrame={setSelectedFrame}
//         />

//         <div className="flex gap-8">
//           <button
//             onClick={handleDownload}
//             disabled={photos.length === 0}
//             className="font-press mt-4 px-10 py-2 rounded-[15px] font-bold border-[2.5px] border-black shadow-lg transition bg-[#FFE97F] hover:scale-105 disabled:bg-[#BBDA97]"
//           >
//             Download
//           </button>

//           <button
//             onClick={() => window.history.back()}
//             className="font-press mt-4 px-10 py-2 rounded-[15px] font-bold border-[2.5px] border-black shadow-lg transition bg-[#FF9999] hover:scale-105"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// EditFrame.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FramePicker from "../../components/user/FramePicker";
import FramePreview from "../../components/user/FramePreview";

const BASE_URL = "http://localhost:5000";

export default function EditFrame() {
  const location = useLocation();
  const photos = location.state?.photos || [];

  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fotoId, setFotoId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pollingId, setPollingId] = useState(null);

  const stripCount = Math.min(Math.max(photos.length, 1), 4);

  const CM = 37.79527559;
  const CONFIG = {
    4: { width: 8.83 * CM, height: 4.79 * CM, x: 0.84 * CM, yStart: 2 * CM, gap: 0.7 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    3: { width: 8.83 * CM, height: 5 * CM, x: 0.85 * CM, yStart: 1.2 * CM, gap: 1.4 * CM, frameWidth: 10.5 * CM, frameHeight: 22.5 * CM },
    2: { width: 8.83 * CM, height: 9.5 * CM, x: 0.84 * CM, yStart: 4 * CM, gap: 1.5 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    1: { width: 12.5 * CM, height: 8.5 * CM, x: 0.8 * CM, yStart: 1 * CM, gap: 0, frameWidth: 14 * CM, frameHeight: 10.5 * CM },
  };

  const SLOT = CONFIG[stripCount];

  /* ================= LOAD FRAME ================= */
  useEffect(() => {
    fetch(`${BASE_URL}/api/frames`)
      .then(res => res.json())
      .then(data => {
        const normalize = p => p ? `${BASE_URL}${p.replace(/\\/g, "/")}` : null;

        const mapped = data.map(f => ({
          id: f.id_frame,
          nama: f.nama_frame,
          isPremium: f.tipe === "premium",
          harga: Number(f.harga || 0),
          thumb: normalize(f.thumb_path),
          frameByStrip: {
            1: normalize(f.frame1_path),
            3: normalize(f.frame3_path),
            4: normalize(f.frame4_path),
          },
        }));

        // tampilkan semua frame yang punya strip sesuai jumlah foto
        setFrames(mapped.filter(f => f.frameByStrip[stripCount]));
      });
  }, [stripCount]);

  /* ================= POLLING ================= */
  const startPolling = (fotoId) => {
    const id = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/payment/validate?id_foto=${fotoId}`);
        const data = await res.json();

        if (data.allowed) {
          clearInterval(id);
          setPollingId(null);
          setIsUnlocked(true);

          setTimeout(() => downloadCanvas(fotoId), 300);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    setPollingId(id);
  };

  /* ================= DOWNLOAD ================= */
  const downloadCanvas = async (fotoId) => {
    const canvas = document.createElement("canvas");
    canvas.width = SLOT.frameWidth;
    canvas.height = SLOT.frameHeight;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw foto user
    for (let i = 0; i < stripCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photos[i];
      await new Promise(r => (img.onload = r));

      const scale = Math.max(SLOT.width / img.width, SLOT.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = SLOT.x + (SLOT.width - w) / 2;
      const y = SLOT.yStart + i * (SLOT.height + SLOT.gap) + (SLOT.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    }

    // draw strip frame yang ada
    for (let s of [1, 3, 4]) {
      const frameSrc = selectedFrame.frameByStrip[s];
      if (frameSrc) {
        const frameImg = new Image();
        frameImg.crossOrigin = "anonymous";
        frameImg.src = frameSrc;
        await new Promise(r => (frameImg.onload = r));
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      }
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `photobooth-${fotoId}.png`;
    link.click();
  };

  /* ================= CREATE FOTO ================= */
  const createFoto = async () => {
    const res = await fetch(`${BASE_URL}/api/foto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_frame: selectedFrame.id,
        delay_jepret: 0,
        filter_dipakai: "normal",
      }),
    });

    const data = await res.json();
    if (!data.id_foto) throw new Error("Gagal membuat foto");
    return data.id_foto;
  };

  /* ================= HANDLE ================= */
  const handleDownload = async () => {
    if (!selectedFrame || isProcessing) return;

    setIsProcessing(true);
    try {
      const id = await createFoto();
      setFotoId(id);

      if (selectedFrame.isPremium) {
        const res = await fetch(`${BASE_URL}/api/payment/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_foto: id,
            jumlah_bayar: selectedFrame.harga,
          }),
        });

        const data = await res.json();
        window.open(data.data.payment_url, "_blank");
        startPolling(id);
        return;
      }

      downloadCanvas(id);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className="min-h-screen bg-[#FFF3D8] flex items-start justify-center p-20 gap-16"
      style={{
        backgroundImage: "url(/webImage/Camera.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="scale-75 origin-top flex flex-col items-center gap-4">
        <FramePreview
          photos={photos}
          selectedFrame={selectedFrame}
          stripCount={stripCount}
          watermark={selectedFrame?.isPremium && !isUnlocked ? "/watermark.png" : null}
        />
      </div>

      <div className="self-start flex flex-col items-center gap-4">
        <FramePicker
          frames={frames}
          selectedFrame={selectedFrame}
          onPickFrame={setSelectedFrame}
        />

        <div className="flex gap-8">
          <button
            onClick={handleDownload}
            disabled={!selectedFrame || pollingId}
            className="font-press mt-4 px-10 py-2 rounded-[15px] font-bold border-[2.5px] border-black shadow-lg transition bg-[#FFE97F] hover:scale-105 disabled:bg-[#BBDA97]"
          >
            {pollingId
              ? "Menunggu Pembayaran..."
              : selectedFrame?.isPremium
              ? "Unlock & Download"
              : "Download"}
          </button>
          <button
            onClick={() => window.history.back()}
            className="font-press mt-4 px-10 py-2 rounded-[15px] font-bold border-[2.5px] border-black shadow-lg bg-[#FF9999]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
