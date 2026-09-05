import { useRef, useState } from "react";
import { actions } from "../../data/demoData";
import ActionTable from "../../components/correctiveActions/ActionTable";
import ActionForm from "../../components/correctiveActions/ActionForm";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

const STATUS_FILTERS = ["All", "Open", "Assigned", "In Progress", "Resolved", "Verified"];

function CorrectiveActions() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNew, setShowNew] = useState(false);
  const [localActions, setLocalActions] = useState(actions);
  const formRef = useRef(null);

  const filtered = localActions.filter(
    (action) => statusFilter === "All" || action.status === statusFilter
  );

  const handleCreate = (form) => {
    const actionId = `ACT-${1000 + Math.floor(Math.random() * 900)}`;
    setLocalActions([
      {
        actionId,
        issue: form.issue,
        mine: "Shakti Coal Mine",
        assignedTo: form.assignedTo,
        team: form.team,
        priority: form.priority,
        deadline: form.deadline,
        action: form.action,
        status: "Assigned",
        verificationStatus: "Pending",
        remarks: "",
      },
      ...localActions,
    ]);
    setShowNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Corrective Actions</h2>
          <p className="text-sm mt-1 text-[#434655]">
            Track issues from assignment to verified resolution.
          </p>
        </div>

        <Button onClick={() => setShowNew(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            add
          </span>
          Assign New Action
        </Button>
      </div>

      <div className="card p-4 flex flex-wrap gap-3 items-end">
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
      </div>

      <ActionTable actions={filtered} />

      <Modal
        open={showNew}
        onClose={() => setShowNew(false)}
        title="Assign New Corrective Action"
        subtitle="Create and assign an action to a responsible officer."
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowNew(false)}>
              Cancel
            </Button>
            <Button onClick={() => formRef.current?.requestSubmit()}>
              Assign Action
            </Button>
          </>
        }
      >
        <ActionForm formRef={formRef} onSubmit={handleCreate} />
      </Modal>
    </div>
  );
}

export default CorrectiveActions;