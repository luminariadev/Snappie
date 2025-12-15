export default function FrameAddForm({
  namaFrame,
  setNamaFrame,
  jenis,
  setJenis,
  harga,
  setHarga,
  jumlahSlot,
  setJumlahSlot,
  setThumbnail,
  setFrame1,
  setFrame3,
  setFrame4,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={(e) => {
        // ================= VALIDASI =================
        if (!namaFrame.trim()) {
          e.preventDefault();
          return alert("Nama frame wajib diisi!");
        }

        if (jenis === "premium" && (!harga || parseInt(harga) <= 0)) {
          e.preventDefault();
          return alert("Harga frame premium harus lebih dari 0!");
        }

        if (jumlahSlot === "1" && !setFrame1) {
          e.preventDefault();
          return alert("Frame strip 1 wajib diupload!");
        }

        if (jumlahSlot === "3" && !setFrame3) {
          e.preventDefault();
          return alert("Frame strip 3 wajib diupload!");
        }

        if (jumlahSlot === "4" && !setFrame4) {
          e.preventDefault();
          return alert("Frame strip 4 wajib diupload!");
        }

        handleSubmit(e);
      }}
      className="
        w-full max-w-[700px]
        bg-[#FFEB91]
        border-[3px] border-black 
        rounded-2xl 
        shadow-[0_5px_0_#000]
        p-8 mb-10
        font-roboto
      "
    >
      {/* ================= NAMA FRAME ================= */}
      <label className="text-[15px] font-medium mb-1 block">
        Nama Frame
      </label>
      <input
        type="text"
        placeholder="Masukkan nama frame..."
        value={namaFrame}
        onChange={(e) => setNamaFrame(e.target.value)}
        className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4"
      />

      {/* ================= JENIS FRAME ================= */}
      <label className="text-[15px] font-medium mb-1 block">
        Jenis Frame
      </label>
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4 bg-white"
      >
        <option value="gratis">Gratis</option>
        <option value="premium">Premium</option>
      </select>

      {/* ================= JUMLAH FOTO ================= */}
      <label className="text-[15px] font-medium mb-1 block">
        Jumlah Foto (Strip)
      </label>
      <select
        value={jumlahSlot}
        onChange={(e) => setJumlahSlot(e.target.value)}
        className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4 bg-white"
      >
        <option value="1">1 Foto</option>
        <option value="3">3 Foto</option>
        <option value="4">4 Foto</option>
      </select>

      {/* ================= HARGA ================= */}
      {jenis === "premium" && (
        <>
          <label className="text-[15px] font-medium mb-1 block">
            Harga Frame
          </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4"
            placeholder="Masukkan harga..."
            min={1}
          />
        </>
      )}

      {/* ================= THUMBNAIL ================= */}
      <label className="text-[15px] font-medium mb-1 block">
        Thumbnail (Icon Frame)
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4 bg-white"
      />

      {/* ================= FRAME STRIP ================= */}
      {jumlahSlot === "1" && (
        <>
          <label className="text-[15px] font-medium mb-1 block">
            Frame Strip 1
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFrame1(e.target.files[0])}
            className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4 bg-white"
          />
        </>
      )}

      {jumlahSlot === "3" && (
        <>
          <label className="text-[15px] font-medium mb-1 block">
            Frame Strip 3
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFrame3(e.target.files[0])}
            className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-4 bg-white"
          />
        </>
      )}

      {jumlahSlot === "4" && (
        <>
          <label className="text-[15px] font-medium mb-1 block">
            Frame Strip 4
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFrame4(e.target.files[0])}
            className="w-full h-[45px] border-[2px] border-black rounded-lg px-4 mb-6 bg-white"
          />
        </>
      )}

      {/* ================= SUBMIT ================= */}
      <button
        type="submit"
        className="
          w-full h-[50px]
          bg-snappieGreen
          border-[3px] border-black
          rounded-xl
          font-pixel text-[14px]
          hover:brightness-95 hover:scale-[0.98]
          transition-all
        "
      >
        Simpan Frame
      </button>
    </form>
  );
}
