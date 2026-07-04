import { useState } from "react";

export default function SelectPhotoMode({ onChange }) {
  const [mode, setMode] = useState(4);
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    const numericValue = Number(value);
    setMode(numericValue);
    setOpen(false);
    if (onChange) onChange(numericValue);
  };

  const getModeLabel = (value) => `${value} Photo${value > 1 ? "s" : ""}`;

  const options = [1, 3, 4];

  return (
    <div className="relative inline-block touch-target">
      <button
        onClick={() => setOpen(!open)}
        className={`font-press px-6 py-3 bg-snappieYellow2 hover:bg-snappieYellow1 rounded-full border-4 border-black font-bold text-base text-black shadow-md transition-all min-w-[140px] ${open ? 'scale-105' : 'hover:scale-105'}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Pilih jumlah foto"
      >
        {getModeLabel(mode)}
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-full sm:w-56 bg-snappieYellow2 rounded-2xl shadow-xl border-2 border-black p-4 space-y-3 z-20 animate-slide-up"
          role="menu"
          aria-orientation="vertical"
          aria-label="Opsi jumlah foto"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`font-press block w-full text-center px-4 py-3 text-base rounded-xl transition-all border-2 border-black ${
                mode === option
                  ? "bg-white text-black shadow-inner"
                  : "bg-white text-black hover:bg-snappieYellow1"
              }`}
              role="menuitem"
              tabIndex="-1"
            >
              {getModeLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}