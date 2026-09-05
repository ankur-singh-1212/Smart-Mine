import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatDate";

function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase text-[#737686] mb-0.5">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
}

export default function MineDetails({ mine, inspections = [], issues = [] }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0e3e5]">
          <div>
            <h3 className="text-xl font-semibold">{mine.name}</h3>
            <p className="text-sm text-[#737686] mt-0.5">{mine.location}</p>
          </div>
          <StatusBadge value={mine.status} variant="risk" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <Field label="Latitude">{mine.latitude}</Field>
          <Field label="Longitude">{mine.longitude}</Field>
          <Field label="Compliance Score">{mine.complianceScore}/100</Field>
          <Field label="Total Inspections">{mine.totalInspections}</Field>
          <Field label="Open Issues">{mine.openIssues}</Field>
          <Field label="Resolved Issues">{mine.resolvedIssues}</Field>
        </div>
      </div>

      {inspections.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Inspections</h3>
          <div className="space-y-3">
            {inspections.slice(0, 5).map((inspection) => (
              <div
                key={inspection.id}
                className="rounded-lg border border-[#c3c6d7] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-medium font-mono text-[#004ac6]">{inspection.id}</div>
                  <div className="text-xs text-[#737686] mt-0.5">
                    {inspection.area} · {formatDate(inspection.date)} · {inspection.inspector}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge value={inspection.riskLevel} variant="risk" />
                  <StatusBadge value={inspection.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {issues.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Open Issues</h3>
          <div className="space-y-3">
            {issues.map((issue) => (
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