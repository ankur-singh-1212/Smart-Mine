import PhotoUpload from "../inspections/PhotoUpload";
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

export default function ActionDetails({ action, onEvidenceChange }) {
  const evidence = action.evidencePhoto ? [action.evidencePhoto] : [];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e0e3e5]">
          <div>
            <h3 className="text-xl font-semibold font-mono">#{action.actionId}</h3>
            <p className="text-sm text-[#737686] mt-0.5">
              For issue <span className="font-mono">{action.issue}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge value={action.priority} variant="risk" />
            <StatusBadge value={action.verificationStatus} />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <Field label="Mine">{action.mine}</Field>
          <Field label="Assigned To">{action.assignedTo}</Field>
          <Field label="Team">{action.team}</Field>
          <Field label="Deadline">{formatDate(action.deadline)}</Field>
          <Field label="Status">
            <StatusBadge value={action.status} />
          </Field>
          <Field label="Verification">
            <StatusBadge value={action.verificationStatus} />
          </Field>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e0e3e5] space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase text-[#737686] mb-1">
              Required Action
            </div>
            <p className="text-sm text-[#191c1e] leading-relaxed">{action.action}</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase text-[#737686] mb-1">Remarks</div>
            <p className="text-sm text-[#434655]">{action.remarks || "No remarks recorded."}</p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-4">Resolution Evidence</h3>
        {action.verificationStatus === "Approved" ? (
          <p className="text-sm text-[#006242] flex items-center gap-2">
            <span className="material-symbols-outlined">verified</span>
            Approved &amp; verified on record.
          </p>
        ) : (
          <>
            <PhotoUpload
              photos={evidence}
              onAdd={(src) => onEvidenceChange && onEvidenceChange(src)}
            />
            {action.verifiedBy && (
              <p className="text-xs text-[#737686] mt-3">
                Submitted for review · Last reviewed by {action.verifiedBy}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}