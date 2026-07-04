import { useState } from "react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-white overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed lg:relative z-40 h-screen transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <SidebarAdmin onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <TopbarAdmin onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
