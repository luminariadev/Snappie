export default function StartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-press px-8 py-4 bg-snappieGreen rounded-full border-4 border-black font-bold text-xl text-black shadow-lg hover:scale-105 active:scale-95 transition-all min-w-[180px] touch-target-xl"
      aria-label="Mulai sesi photo booth"
    >
      START
    </button>
  );
}
