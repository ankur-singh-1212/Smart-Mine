import { useState } from "react";
import { mines } from "../../data/demoData";
import MineCard from "../../components/mines/MineCard";
import EmptyState from "../../components/common/EmptyState";

function Mines() {
  const [query, setQuery] = useState("");

  const filtered = mines.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Mines</h2>
          <p className="text-sm mt-1 text-[#434655]">
            {mines.length} registered coal mines under monitoring.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" style={{ fontSize: "18px" }}>
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mines..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white border border-[#c3c6d7] outline-none focus:border-[#2563eb]"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((mine) => (
            <MineCard key={mine.id} mine={mine} />
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState icon="fmd_good_bad" title="No mines found" description="Try a different search." />
        </div>
      )}
    </div>
  );
}

export default Mines;