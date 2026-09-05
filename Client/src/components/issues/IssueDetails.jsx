import StatusBadge from "../common/StatusBadge";
import RiskBadge from "./RiskBadge";

function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase text-[#737686] mb-0.5">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
}

export default function IssueDetails({ issue }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0e3e5]">
          <div>
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <p className="text-sm text-[#737686] mt-0.5 font-mono">{issue.issueId}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiskBadge score={issue.riskScore} />
            <StatusBadge value={issue.status} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <Field label="Mine">{issue.mine}</Field>
          <Field label="Source Inspection">{issue.inspection || "—"}</Field>
          <Field label="Category">{issue.category}</Field>
          <Field label="Risk Level">{issue.riskLevel}</Field>
          <Field label="Risk Score">{issue.riskScore}/100</Field>
          <Field label="Assigned To">{issue.assignedTo || "Unassigned"}</Field>
          <Field label="Recurring Risk">
            <StatusBadge value={issue.recurring ? "Recurring" : "No"} />
          </Field>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e0e3e5] space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase text-[#737686] mb-1">Description</div>
            <p className="text-sm text-[#434655] leading-relaxed">{issue.description}</p>
          </div>

          {issue.preventionRecommendation && (
            <div className="rounded-lg p-4 bg-[rgba(0,74,198,0.06)] border border-[#004ac6]/15">
              <div className="text-xs font-semibold uppercase text-[#004ac6] mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  psychology
                </span>
                AI Prevention Recommendation
              </div>
              <p className="text-sm text-[#434655]">{issue.preventionRecommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}