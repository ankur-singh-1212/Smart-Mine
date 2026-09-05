import { NavLink, Link } from "react-router-dom";
import { nav } from "../../data/demoData";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] z-50 flex-col bg-[#2d3133] text-white p-4 shadow-md">
      <Link to="/" className="px-2 mb-8 block">
        <h1 className="text-2xl font-bold">SmartMine</h1>
        <p className="text-sm mt-1 text-[#bec6e0] opacity-80">Coal Governance AI</p>
      </Link>

      <ul className="flex-1 overflow-y-auto space-y-1 px-2">
        {nav.map(({ label, icon, path }) => (
          <li key={label}>
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg border-l-4 transition ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#e0e3e5] font-normal"
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                borderLeftColor: isActive ? "#2563eb" : "transparent",
              })}
            >
              {({ isActive }) => (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={
                      isActive ? { fontVariationSettings: "'FILL' 1" } : undefined
                    }
                  >
                    {icon}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto px-2 pt-4 border-t border-white/10">
        <Link to="/users" className="flex items-center gap-3 px-3 py-2.5 text-[#e0e3e5]">
          <span className="material-symbols-outlined">account_circle</span>
          Profile
        </Link>
      </div>
    </aside>
  );
}