import { reportTypes, mines } from "../../data/demoData";

const selectClass =
  "w-full h-10 rounded-lg px-3 bg-white border border-[#c3c6d7] outline-none focus:border-[#2563eb]";
const labelClass = "block text-xs font-semibold uppercase mb-1 text-[#434655]";

export default function ReportFilters({ filters, onChange, onClear }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[160px]">
        <label className={labelClass}>Report Type</label>
        <select value={filters.type} onChange={set("type")} className={selectClass}>
          <option value="">All Types</option>
          {reportTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <label className={labelClass}>Mine</label>
        <select value={filters.mine} onChange={set("mine")} className={selectClass}>
          <option value="">All Mines</option>
          {mines.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>From</label>
        <input type="date" value={filters.from} onChange={set("from")} className={selectClass} />
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>To</label>
        <input type="date" value={filters.to} onChange={set("to")} className={selectClass} />
      </div>

      <button
        onClick={onClear}
        className="h-10 px-4 rounded-lg bg-white border border-[#c3c6d7] flex items-center justify-center gap-2 hover:bg-[#f2f4f6] transition"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
          filter_alt_off
        </span>
        Clear
      </button>
    </div>
  );
}