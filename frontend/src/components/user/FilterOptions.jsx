export default function FilterOptions({ selected, onSelect }) {
  const filters = [
    { id: "normal", label: "Normal" },
    { id: "mono", label: "Monokrom" },
    { id: "sepia", label: "Sepia" },
    { id: "soft", label: "Soft" },
    { id: "pop", label: "Pop Art" },
    { id: "retro", label: "Retro" }
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`font-press px-5 sm:px-7 h-12 sm:h-14 text-xs rounded-full border-2 font-semibold transition-all hover:scale-105 active:scale-95
              ${selected === f.id
                ? "bg-black text-white border-black shadow-lg"
                : "bg-white text-black border-black hover:bg-gray-100"
              }
            `}
            aria-label={`Filter ${f.label}`}
            aria-pressed={selected === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
