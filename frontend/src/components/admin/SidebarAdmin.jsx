import { useNavigate, useLocation } from "react-router-dom";
import { MdPhotoLibrary, MdPayment, MdClose } from "react-icons/md";

export default function SidebarAdmin({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin/frame", icon: MdPhotoLibrary, label: "Kelola Frame" },
    { path: "/admin/transaction", icon: MdPayment, label: "Transaction" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col w-[260px] sm:w-[280px] min-h-screen bg-snappieGray2 border-r-[2px] border-black transition-all duration-300">
      {/* HEADER */}
      <div className="w-full h-[76px] bg-snappiePink border-b-[2px] border-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center relative">
        <h1 className="font-pixel text-[28px] sm:text-[32px] text-snappieYellow1 drop-shadow-[4px_4px_0px_#000]">
          SNAPPIE
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden p-1"
            aria-label="Tutup sidebar"
          >
            <MdClose className="text-2xl" />
          </button>
        )}
      </div>

      {/* MENU */}
      <div className="mx-4 sm:mx-6 mt-6 flex-1 bg-snappieYellow2 rounded-2xl sm:rounded-3xl border-[2px] border-black px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        <p className="font-pixel text-[14px] sm:text-[16px] mb-6 mt-2">
          Navigation Utama
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-3 h-[44px] sm:h-[40px] font-pixel text-[12px] sm:text-[13px] px-3 cursor-pointer transition-all
                ${isActive
                  ? "bg-snappiePink border-[2px] border-black rounded-lg"
                  : "hover:bg-snappiePink hover:border-[2px] hover:border-black hover:rounded-lg"
                }
              `}
              role="button"
              tabIndex={0}
              aria-label={item.label}
              onKeyDown={(e) => { if (e.key === "Enter") handleNavigate(item.path); }}
            >
              <Icon className="text-[22px] sm:text-[24px]" />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
