import { useState } from "react";
import { issues } from "../../data/demoData";
import IssueCard from "../../components/issues/IssueCard";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";

const RISK_FILTERS = ["All", "High", "Medium", "Low"];
const STATUS_FILTERS = ["All", "Open", "Assigned", "In Progress", "Resolved", "Verified"];

function Issues() {
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = issues.filter(
    (issue) =>
      (riskFilter === "All" || issue.riskLevel === riskFilter) &&
      (statusFilter === "All" || issue.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Issues &amp; Risks</h2>
        <p className="text-sm mt-1 text-[#434655]">
          Track reported issues, risk levels and resolution status.
        </p>
      </div>

      <div className="card p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Risk Level
          </label>
          <div className="flex flex-wrap gap-2">
            {RISK_FILTERS.map((level) => (
              <button
                key={level}
                onClick={() => setRiskFilter(level)}
                className={`h-9 px-3 rounded-lg text-sm font-medium transition ${
                  riskFilter === level
                    ? "bg-[#2563eb] text-white"
                    : "bg-white border border-[#c3c6d7] hover:bg-[#f2f4f6]"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 rounded-lg px-3 bg-white border border-[#c3c6d7] outline-none"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            setRiskFilter("All");
            setStatusFilter("All");
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            filter_alt_off
          </span>
          Clear
        </Button>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((issue) => (
            <IssueCard key={issue.issueId} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState icon="warning" title="No issues found" description="Adjust the filters to see more results." />
        </div>
      )}
    </div>
  );
}

export default Issues;