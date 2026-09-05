import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import RiskBadge from "./RiskBadge";

export default function IssueCard({ issue }) {
  return (
    <Link
      to={`/issues/${issue.issueId}`}
      className="card p-5 flex flex-col gap-3 hover:border-[#2563eb] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs text-[#737686]">{issue.issueId}</div>
          <h3 className="text-base font-semibold mt-0.5">{issue.title}</h3>
        </div>
        <RiskBadge score={issue.riskScore} />
      </div>

      <p className="text-sm text-[#434655] line-clamp-2 min-h-[40px]">{issue.description}</p>

      <div className="flex items-center justify-between border-t border-[#e0e3e5] pt-3">
        <div className="text-xs text-[#737686]">
          <span className="font-medium text-[#191c1e]">{issue.mine}</span> · {issue.category}
        </div>
        <StatusBadge value={issue.status} />
      </div>

      {issue.recurring && (
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#c2410c] bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)] rounded-full px-2 py-0.5 self-start">
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            history
          </span>
          Recurring Risk
        </div>
      )}
    </Link>
  );
}