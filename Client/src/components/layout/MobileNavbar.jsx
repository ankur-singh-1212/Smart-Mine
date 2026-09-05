import { NavLink } from "react-router-dom";
import { nav } from "../../data/demoData";

const mobileItems = nav.slice(0, 5);

export default function MobileNavbar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2d3133] text-white border-t border-white/10 px-2">
      <ul className="flex items-center justify-around">
        {mobileItems.map(({ label, icon, path }) => (
          <li key={label}>
            <NavLink
              to={path}
              end={path === "/"}
              className="flex flex-col items-center gap-0.5 py-2 px-3 text-[10px]"
              style={({ isActive }) => ({
                color: isActive ? "#ffffff" : "#e0e3e5",
              })}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                {icon}
              </span>
              <span className={label === "Issues & Risks" ? "hidden" : ""}>
                {label.split(" ")[0]}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}