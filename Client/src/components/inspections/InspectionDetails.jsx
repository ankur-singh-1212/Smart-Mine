import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatDate";

function DetailRow({ label, value }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase text-[#737686] mb-0.5">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

export default function InspectionDetails({ inspection, relatedIssues = [] }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0e3e5]">
          <div>
            <h3 className="text-xl font-semibold font-mono">#{inspection.id}</h3>
            <p className="text-sm text-[#737686] mt-0.5">{inspection.mine}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge value={inspection.riskLevel} variant="risk" />
            <StatusBadge value={inspection.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <DetailRow label="Mine" value={inspection.mine} />
          <DetailRow label="Area / Location" value={inspection.area} />
          <DetailRow label="Inspector" value={inspection.inspector} />
          <DetailRow label="Inspection Date" value={formatDate(inspection.date)} />
          <DetailRow label="Category" value={inspection.category} />
          <DetailRow label="Risk Score" value={inspection.riskScore != null ? `${inspection.riskScore}/100` : null} />
          <DetailRow label="Compliance Status" value={inspection.complianceStatus} />
          <DetailRow label="Risk Alert" value={inspection.riskAlert ? "Yes" : "No"} />
          <DetailRow
            label="Recurring Risk"
            value={
              <StatusBadge
                value={inspection.recurringRisk ? "Recurring" : "No"}
                variant="status"
              />
            }
          />
        </div>

        <div className="mt-6 border-t border-[#e0e3e5] pt-4">
          <div className="text-xs font-semibold uppercase text-[#737686] mb-1">
            Description
          </div>
          <p className="text-sm text-[#434655] leading-relaxed">
            {inspection.description || "No description recorded."}
          </p>
        </div>
      </div>

      {relatedIssues.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Related Issues</h3>
          <div className="space-y-3">
            {relatedIssues.map((issue) => (
              <div
                key={issue.issueId}
                className="rounded-lg border border-[#c3c6d7] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-medium">{issue.title}</div>
                  <div className="text-xs font-mono text-[#737686] mt-0.5">{issue.issueId}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge value={issue.riskLevel} variant="risk" />
                  <StatusBadge value={issue.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}