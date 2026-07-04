import { MdSearch, MdMenu } from "react-icons/md";

export default function TopbarAdmin({ onMenuToggle }) {
  return (
    <div className="h-[64px] sm:h-[72px] bg-snappiePink border-b-[2px] border-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-between sm:justify-end px-4 sm:px-6 md:px-8">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-all"
        aria-label="Toggle menu"
      >
        <MdMenu className="text-2xl text-black" />
      </button>

      <div className="relative flex items-center w-full sm:w-auto sm:max-w-[600px] md:max-w-[800px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-[40px] sm:h-[44px] bg-white rounded-full border-[1px] border-black px-4 sm:px-10 pr-10 font-pixel text-[13px] sm:text-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        />
        <MdSearch className="absolute right-3 sm:right-4 text-[28px] sm:text-[35px] text-snappieGray" />
      </div>
    </div>
  );
}
