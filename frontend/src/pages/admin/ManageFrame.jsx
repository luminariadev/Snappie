// // src/pages/admin/ManageFrame.jsx
// import { useState, useEffect } from "react";
// import FrameAddForm from "../../components/admin/FrameAddForm";
// import FrameList from "../../components/admin/FrameList";

// const fileToDataUrl = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

// export default function ManageFrame() {
//   const [showAddForm, setShowAddForm] = useState(false);

//   // TAB FILTER: all / premium
//   const [activeTab, setActiveTab] = useState("all");

//   const [namaFrame, setNamaFrame] = useState("");
//   const [jenis, setJenis] = useState("gratis");
//   const [harga, setHarga] = useState("");
//   const [thumb, setThumb] = useState(null);

//   const [frame1, setFrame1] = useState(null);
//   const [frame3, setFrame3] = useState(null);
//   const [frame4, setFrame4] = useState(null);

//   const [frames, setFrames] = useState([]);

//   // useEffect(() => {
//   //   const saved = localStorage.getItem("frames");
//   //   if (saved) setFrames(JSON.parse(saved));
//   // }, []);

//   useEffect(() => {
//   fetch("http://localhost:5000/api/frames")
//     .then(res => res.json())
//     .then(setFrames);
// }, []);


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const form = new FormData();
//   form.append("nama_frame", namaFrame);
//   form.append("tipe", jenis);
//   form.append("jumlah_slot_default", jenis === "gratis" ? 1 : 3); // contoh
//   form.append("deskripsi", "");
//   form.append("id_admin", 1); // sementara

//   if (thumb) form.append("thumb", thumb);
//   if (frame1) form.append("frame1", frame1);
//   if (frame3) form.append("frame3", frame3);
//   if (frame4) form.append("frame4", frame4);

//   const res = await fetch("http://localhost:5000/api/frames", {
//     method: "POST",
//     body: form,
//   });

//   const data = await res.json();
//   console.log("UPLOAD RESPONSE:", data);
// };


//   const handleDelete = (id) => {
//     const updated = frames.filter((f) => f.id !== id);
//     setFrames(updated);
//     localStorage.setItem("frames", JSON.stringify(updated));
//   };

//   // FILTER PREMIUM
//   const filteredFrames =
//     activeTab === "premium"
//       ? frames.filter((f) => f.jenis === "premium")
//       : frames;

//   return (
//     <>
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="w-[650px] bg-[#FFF3AA] border-[4px] border-black rounded-3xl shadow-[0_8px_0_#000]">
//             <div className="bg-snappiePink border-b-[4px] border-black rounded-t-3xl p-4 flex justify-between items-center">
//               <h3 className="font-pixel text-[18px] text-[#FAE446]">Tambah Frame</h3>
//               <button
//                 onClick={() => setShowAddForm(false)}
//                 className="text-black font-bold text-[18px] hover:scale-110 transition"
//               >
//                 ✖
//               </button>
//             </div>

//             <div className="p-6">
//               <FrameAddForm
//                 namaFrame={namaFrame}
//                 setNamaFrame={setNamaFrame}
//                 jenis={jenis}
//                 setJenis={setJenis}
//                 harga={harga}
//                 setHarga={setHarga}
//                 setThumbnail={setThumb}
//                 setFrame1={setFrame1}
//                 setFrame3={setFrame3}
//                 setFrame4={setFrame4}
//                 handleSubmit={handleSubmit}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="w-full min-h-[calc(100vh-76px)]">
//         <h1 className="font-pixel text-[28px] mb-10">Manage Frame</h1>

//         {/* ACTION AREA — Tambah Frame + Tabs */}
//         <div className="w-full bg-white border-2 border-black rounded-[12px] shadow-[0_4px_0_#000] px-12 py-6 flex justify-between items-center">

//           <button
//             onClick={() => setShowAddForm(true)}
//             className="w-[260px] h-[60px] font-pixel border-2 border-black rounded-[12px] bg-white hover:bg-snappiePink hover:text-white transition"
//           >
//             + Tambah Frame Baru
//           </button>

//           {/* TAB FILTER */}
//           <div className="flex gap-3">
//             <button
//               className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
//                 activeTab === 'all'
//                   ? 'bg-snappiePink border-black text-white'
//                   : 'bg-white border-black'
//               }`}
//               onClick={() => setActiveTab("all")}
//             >
//               Semua
//             </button>

//             <button
//               className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
//                 activeTab === 'premium'
//                   ? 'bg-snappiePink border-black text-white'
//                   : 'bg-white border-black'
//               }`}
//               onClick={() => setActiveTab("premium")}
//             >
//               Premium
//             </button>
//           </div>
//         </div>

//         {/* TABEL FRAME */}
//         <FrameList frames={filteredFrames} onDelete={handleDelete} />
//       </div>
//     </>
//   );
// }

// src/pages/admin/ManageFrame.jsx
import { useState, useEffect } from "react";
import FrameAddForm from "../../components/admin/FrameAddForm";
import FrameList from "../../components/admin/FrameList";


const BASE_URL = "http://localhost:5000"; // Sesuaikan dengan backend

export default function ManageFrame() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [namaFrame, setNamaFrame] = useState("");
  const [jenis, setJenis] = useState("gratis");
  const [harga, setHarga] = useState("");
  const [jumlahSlot, setJumlahSlot] = useState("1");
  const [thumb, setThumb] = useState(null);
  const [frame1, setFrame1] = useState(null);
  const [frame3, setFrame3] = useState(null);
  const [frame4, setFrame4] = useState(null);

  const [frames, setFrames] = useState([]);
  const [editingId, setEditingId] = useState(null); // untuk edit frame

  // Ambil semua frame dari backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/frames`)
      .then((res) => res.json())
      .then((data) => {
      const mapped = data.map((f) => ({
        id: f.id_frame,
        namaFrame: f.nama_frame,
        jenis: f.tipe,
        harga: f.harga || 0,
        jumlahSlot: Number(f.jumlah_slot_default), // 🔥 WAJIB

        thumb: f.thumb_path
          ? `${BASE_URL}${f.thumb_path.replace(/\\/g, "/")}`
          : null,

        frameByStrip: {
          1: f.frame1_path ? `${BASE_URL}${f.frame1_path.replace(/\\/g, "/")}` : null,
          3: f.frame3_path ? `${BASE_URL}${f.frame3_path.replace(/\\/g, "/")}` : null,
          4: f.frame4_path ? `${BASE_URL}${f.frame4_path.replace(/\\/g, "/")}` : null,
        },
      }));

        setFrames(mapped);
      });
  }, []);

  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!namaFrame || !jenis) return alert("Nama frame dan tipe wajib diisi!");

const form = new FormData();
form.append("nama_frame", namaFrame);
form.append("tipe", jenis || "gratis");
form.append("jumlah_slot_default", jumlahSlot);
form.append("deskripsi", "");
form.append("id_admin", 1);

// 🔹 TAMBAHKAN HARGA
form.append("harga", jenis === "premium" ? harga : 0);


if (thumb) form.append("thumb", thumb);
if (frame1) form.append("frame1", frame1);
if (frame3) form.append("frame3", frame3);
if (frame4) form.append("frame4", frame4);


  try {
    let url = `${BASE_URL}/api/frames`;
    let method = "POST";

    if (editingId) {
      url = `${BASE_URL}/api/frames/${editingId}`;
      method = "PUT";
    }

    const res = await fetch(url, { method, body: form });
    const data = await res.json();
    console.log("UPLOAD RESPONSE:", data);

    if (data.error) return alert(data.error);

    const newFrame = {
      id: data.id_frame,
      namaFrame: data.nama_frame,
      jenis: data.tipe,
      harga: data.harga || 0,
      thumb: data.thumb_path ? `${BASE_URL}${data.thumb_path.replace(/\\/g, "/")}` : null,
      frameByStrip: {
        1: data.frame1_path ? `${BASE_URL}${data.frame1_path.replace(/\\/g, "/")}` : null,
        3: data.frame3_path ? `${BASE_URL}${data.frame3_path.replace(/\\/g, "/")}` : null,
        4: data.frame4_path ? `${BASE_URL}${data.frame4_path.replace(/\\/g, "/")}` : null,
      },
    };

    if (editingId) {
      setFrames((prev) => prev.map((f) => (f.id === editingId ? newFrame : f)));
    } else {
      setFrames((prev) => [...prev, newFrame]);
    }

    // Reset form
    setShowAddForm(false);
    setNamaFrame("");
    setJenis("gratis");
    setHarga("");
    setThumb(null);
    setFrame1(null);
    setFrame3(null);
    setFrame4(null);
    setEditingId(null);
  } catch (err) {
    console.error(err);
    alert("Gagal upload frame!");
  }
};


  // Edit frame
  const handleEdit = (frame) => {
    setNamaFrame(frame.namaFrame);
    setJenis(frame.jenis || "gratis");
    setThumb(null);
    setFrame1(null);
    setFrame3(null);
    setFrame4(null);
    setEditingId(frame.id);
    setShowAddForm(true);
  };

  // Delete frame
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus frame ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/api/frames/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFrames(frames.filter((f) => f.id !== id));
      } else {
        const data = await res.json();
        alert("Gagal hapus frame: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal hapus frame!");
    }
  };

  // Filter frames
  const filteredFrames = activeTab === "premium"
    ? frames.filter((f) => f.jenis === "premium")
    : frames;

  return (
    <>
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[650px] bg-[#FFF3AA] border-[4px] border-black rounded-3xl shadow-[0_8px_0_#000]">
            <div className="bg-snappiePink border-b-[4px] border-black rounded-t-3xl p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[18px] text-[#FAE446]">
                {editingId ? "Edit Frame" : "Tambah Frame"}
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-black font-bold text-[18px] hover:scale-110 transition"
              >
                ✖
              </button>
            </div>
            <div className="p-6">
              <FrameAddForm
                namaFrame={namaFrame}
                setNamaFrame={setNamaFrame}
                jenis={jenis}
                setJenis={setJenis}
                harga={harga}
                setHarga={setHarga}
                jumlahSlot={jumlahSlot}
                setJumlahSlot={setJumlahSlot}
                setThumbnail={setThumb}
                setFrame1={setFrame1}
                setFrame3={setFrame3}
                setFrame4={setFrame4}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-[calc(100vh-76px)]">
        <h1 className="font-pixel text-[28px] mb-10">Manage Frame</h1>

        <div className="w-full bg-white border-2 border-black rounded-[12px] shadow-[0_4px_0_#000] px-12 py-6 flex justify-between items-center">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-[260px] h-[60px] font-pixel border-2 border-black rounded-[12px] bg-white hover:bg-snappiePink hover:text-white transition"
          >
            + Tambah Frame Baru
          </button>

          <div className="flex gap-3">
            <button
              className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
                activeTab === 'all' ? 'bg-snappiePink border-black text-white' : 'bg-white border-black'
              }`}
              onClick={() => setActiveTab("all")}
            >
              Semua
            </button>
            <button
              className={`px-6 py-3 font-pixel border-2 rounded-[12px] ${
                activeTab === 'premium' ? 'bg-snappiePink border-black text-white' : 'bg-white border-black'
              }`}
              onClick={() => setActiveTab("premium")}
            >
              Premium
            </button>
          </div>
        </div>

        <FrameList
          frames={filteredFrames}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}
