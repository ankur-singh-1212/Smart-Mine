import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadInspections, mines, inspectors } from "../../data/demoData";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { downloadCSV } from "../../utils/csvExport";

const INITIAL_FILTERS = { mine: "", date: "", inspector: "", risk: "" };

function Inspections() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [inspections] = useState(() => loadInspections());
  const location = useLocation();

  const filtered = inspections.filter((item) => {
    const mine = !filters.mine || item.mine === filters.mine || item.mine.includes(filters.mine);
    const inspector = !filters.inspector || item.inspector === filters.inspector;
    const risk = !filters.risk || item.riskLevel === filters.risk;
    const date = !filters.date || item.date === filters.date;
    return mine && inspector && risk && date;
  });

  const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value });

  const handleExport = () => {
    downloadCSV(
      "inspections.csv",
      ["ID", "Mine", "Area", "Inspector", "Date", "Category", "Risk Level", "Status"],
      filtered.map((i) => [
        i.id,
        i.mine,
        i.area,
        i.inspector,
        i.date,
        i.category,
        i.riskLevel,
        i.status,
      ])
    );
  };

  const selectClass =
    "w-full h-10 rounded-lg px-3 bg-white border border-[#c3c6d7] outline-none";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Field Inspections</h2>
          <p className="text-sm mt-1 text-[#434655]">
            Manage and track all mine site inspections and safety audits.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="secondary" onClick={handleExport}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              download
            </span>
            Export
          </Button>
          <Link to="/inspections/new">
            <Button>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                add
              </span>
              New Inspection
            </Button>
          </Link>
        </div>
      </div>

      {location.state?.created && (
        <div className="rounded-xl px-4 py-3 bg-[rgba(0,98,66,0.1)] border border-[#006242]/20 text-[#006242] flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            check_circle
          </span>
          Inspection {location.state.created} created successfully.
        </div>
      )}

      {/* FILTERS */}
      <div className="card p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Mine Site
          </label>
          <select value={filters.mine} onChange={set("mine")} className={selectClass}>
            <option value="">All Sites</option>
            {mines.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Date
          </label>
          <input type="date" value={filters.date} onChange={set("date")} className={selectClass} />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Inspector
          </label>
          <select value={filters.inspector} onChange={set("inspector")} className={selectClass}>
            <option value="">Any Inspector</option>
            {inspectors.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Risk Level
          </label>
          <select value={filters.risk} onChange={set("risk")} className={selectClass}>
            <option value="">All Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <Button variant="secondary" onClick={() => setFilters(INITIAL_FILTERS)}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            filter_alt_off
          </span>
          Clear
        </Button>
      </div>

      {/* TABLE */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f2f4f6] border-b border-[#c3c6d7]">
              <tr>
                {["ID", "Mine & Area", "Inspector", "Date", "Category", "Risk", "Status", "Actions"].map(
                  (item) => (
                    <th
                      key={item}
                      className={`py-3 px-4 text-xs font-semibold uppercase whitespace-nowrap ${
                        item === "Actions" ? "text-right" : ""
                      }`}
                    >
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inspection) => (
                <tr key={inspection.id} className="row-hover border-b border-[#c3c6d7]">
                  <td className="py-3 px-4 font-mono text-sm font-medium text-[#004ac6]">
                    {inspection.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{inspection.mine}</div>
                    <div className="text-xs text-[#434655]">{inspection.area}</div>
                  </td>
                  <td className="py-3 px-4">{inspection.inspector}</td>
                  <td className="py-3 px-4">{inspection.date}</td>
                  <td className="py-3 px-4">{inspection.category}</td>
                  <td className="py-3 px-4">
                    <StatusBadge value={inspection.riskLevel} variant="risk" />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge value={inspection.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="row-actions flex items-center justify-end gap-2">
                      <Link
                        to={`/inspections/${inspection.id}`}
                        className="p-1.5 text-[#434655] hover:text-[#004ac6]"
                        aria-label="View"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                          visibility
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <EmptyState title="No inspections found" />}
        </div>

        <div className="p-4 flex items-center justify-between border-t border-[#c3c6d7]">
          <span className="text-sm text-[#434655]">
            Showing {filtered.length} of {inspections.length} inspections
          </span>
        </div>
      </div>
    </div>
  );
}

export default Inspections;