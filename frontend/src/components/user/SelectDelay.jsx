import { useState } from "react";

export default function SelectDelay({ onChange }) {
  const [delay, setDelay] = useState(3);
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setDelay(value);
    setOpen(false);
    if (onChange) onChange(value);
  };

  const options = [3, 5, 10];

  return (
    <div className="relative inline-block touch-target">

      {/* MAIN BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className={`font-press px-6 py-3 rounded-full border-4 border-black font-bold text-base transition-all min-w-[140px] text-center ${
          open
            ? "bg-snappiePink text-black shadow-lg scale-105"
            : "bg-snappiePink text-black hover:bg-snappiePink hover:scale-105"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Pilih delay timer"
      >
        DELAY
      </button>

      {/* DROPDOWN - MOBILE FRIENDLY */}
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-full sm:w-56 bg-snappiePink rounded-2xl shadow-xl border-2 border-black p-4 space-y-3 z-20 animate-slide-up"
          role="menu"
          aria-orientation="vertical"
          aria-label="Opsi delay timer"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`font-press block w-full text-center px-4 py-3 text-base rounded-xl transition-all border-2 border-black ${
                delay === option
                  ? "bg-snappieYellow1 text-black shadow-inner"
                  : "bg-snappieYellow2 text-black hover:bg-snappieYellow1"
              }`}
              role="menuitem"
              tabIndex="-1"
            >
              {option}s Delay
            </button>
          ))}
        </div>
      )}
    </div>
  );
}