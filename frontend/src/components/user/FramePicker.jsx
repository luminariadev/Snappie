export default function FramePicker({ frames, selectedFrame, onPickFrame }) {
  if (!frames.length) {
    return (
      <div className="w-full max-w-[500px] bg-white rounded-[28px] p-10 text-center font-press shadow-2xl border-[2.5px] border-black">
        Tidak ada frame tersedia
      </div>
    );
  }

  return (
    <div className="w-full max-w-[500px] bg-white rounded-2xl sm:rounded-[28px] shadow-2xl border-[2.5px] border-black overflow-hidden">
      <div className="bg-snappiePink px-4 sm:px-6 py-3 border-b-2 border-black flex items-center justify-center">
        <h2
          className="font-press text-lg sm:text-xl md:text-2xl text-snappieYellow2 tracking-wide text-center"
          style={{ textShadow: "2px 4px 5px #000" }}
        >
          CHOOSE YOUR FRAME
        </h2>
      </div>

      <div className="p-4 sm:p-6 md:p-10">
        <div className="bg-snappieYellow2 rounded-xl sm:rounded-2xl border-[2.5px] border-black p-4 sm:p-6">
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-9 justify-center">
            {frames.map(f => (
              <button
                key={f.id}
                onClick={() => onPickFrame(f)}
                className={"relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] overflow-hidden transition-all hover:scale-110 active:scale-95 " + (selectedFrame?.id === f.id ? "ring-4 ring-black" : "")}
                aria-label={f.nama}
                title={f.nama + (f.isPremium ? " (Premium)" : "")}
              >
                {f.thumb ? (
                  <img src={f.thumb} className="w-full h-full object-cover" alt={f.nama} />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[10px]">
                    NO THUMB
                  </div>
                )}

                {f.isPremium && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
                    {"\u{1F512}"}
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
