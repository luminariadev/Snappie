export default function UploadPhotoPopup({ isOpen, onClose, onUpload }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-[28px] shadow-2xl border-black overflow-hidden">
        <div className="bg-[#F4A9B8] w-full px-6 py-3 border-b-2 border-black relative flex items-center justify-center">
          <button
            className="font-press absolute top-3 right-3 text-black font-bold text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h3
            className="font-press text-xl text-[#FFE97F] font-bold"
            style={{
              textShadow: "2px 4px 5px #000, -2px -2px 0px rgba(0,0,0,0.5)",
            }}
          >
            SNAPPIE
          </h3>
        </div>

        <div className="w-full h-60 rounded-xl flex flex-col items-center justify-center overflow-hidden">
          <h3 className="font-press text-xl text-center text-black font bold">
            Want to upload photos?
          </h3>

          <label
            className="font-press text-xl bg-[#F3D7A5] items-center justify-center py-2 px-3 rounded-xl text-center text-[#FFE97F] font-bold border border-black cursor-pointer transition mt-8"
            style={{ WebkitTextStroke: "0.5px black" }}
          >
            SELECT IMAGES
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const imageURL = URL.createObjectURL(file);
                onUpload(imageURL);
                onClose();
              }}
            />
          </label>

          <h5 className="font-press text-xs text-center text-black font bold px-9 mt-7">
            Create fun photo strips with any image you like!
          </h5>
        </div>
      </div>
    </div>
  );
}
