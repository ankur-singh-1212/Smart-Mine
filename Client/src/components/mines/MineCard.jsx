import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";

export default function MineCard({ mine }) {
  const scoreColor =
    mine.status === "Compliant" ? "#006242" : mine.status === "Warning" ? "#c2410c" : "#ba1a1a";

  return (
    <Link
      to={`/mines/${mine.id}`}
      className="card p-5 flex flex-col gap-4 hover:border-[#2563eb] transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{mine.name}</h3>
          <p className="text-sm text-[#737686] mt-0.5">{mine.location}</p>
        </div>
        <StatusBadge value={mine.status} variant="risk" />
      </div>

      <div className="flex items-center gap-3">
        <div
          className="h-14 w-14 rounded-lg flex flex-col items-center justify-center text-white font-bold"
          style={{ background: scoreColor }}
        >
          <span className="text-lg leading-none">{mine.complianceScore}</span>
          <span className="text-[9px] font-medium uppercase mt-0.5">score</span>
        </div>
        <div className="flex-1">
          <div className="h-2 rounded-full bg-[#e0e3e5] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${mine.complianceScore}%`, background: scoreColor }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#737686] mt-1.5">
            <span>0</span>
            <span className="font-mono">{mine.complianceScore}/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center border-t border-[#e0e3e5] pt-3">
        <div>
          <div className="text-lg font-semibold">{mine.totalInspections}</div>
          <div className="text-[10px] uppercase tracking-wider text-[#737686]">
            Inspections
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">{mine.openIssues}</div>
          <div className="text-[10px] uppercase tracking-wider text-[#737686]">Open</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{mine.resolvedIssues}</div>
          <div className="text-[10px] uppercase tracking-wider text-[#737686]">Resolved</div>
        </div>
      </div>
    </Link>
  );
}