import { Link } from "react-router-dom";

export default function TopNavbar() {
  return (
    <header className="h-16 sticky top-0 z-40 flex items-center justify-between px-6 bg-[#f7f9fb] border-b border-[#c3c6d7] shadow-sm">
      <div className="flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]">
            search
          </span>
          <input
            type="text"
            placeholder="Search inspections, mines, or reports..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white border border-[#e0e3e5] outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/notifications"
          className="relative p-2 text-[#434655]"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a]" />
        </Link>

        <button className="p-2 text-[#434655]" aria-label="Help">
          <span className="material-symbols-outlined">help</span>
        </button>

        <div className="h-8 w-px bg-[#c3c6d7]" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Operations Director</p>
            <p className="text-xs text-[#737686]">Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-semibold border border-[#c3c6d7]">
            OD
          </div>
        </div>
      </div>
    </header>
  );
}