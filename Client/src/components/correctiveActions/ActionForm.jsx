import { useState } from "react";
import { issues, officers } from "../../data/demoData";

const inputClass = "w-full h-10 rounded-lg px-3 border border-[#c3c6d7] outline-none focus:border-[#2563eb]";
const labelClass = "block text-xs font-semibold uppercase mb-1 text-[#434655]";

const DEFAULT_DEADLINE = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

export default function ActionForm({ onSubmit, formRef }) {
  const [form, setForm] = useState({
    issue: issues[0]?.issueId || "",
    assignedTo: officers[0],
    team: "Compliance Team",
    priority: "Medium",
    deadline: DEFAULT_DEADLINE,
    action: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Source Issue</label>
        <select value={form.issue} onChange={set("issue")} className={inputClass}>
          {issues.map((issue) => (
            <option key={issue.issueId} value={issue.issueId}>
              {issue.issueId} — {issue.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Assigned To</label>
        <select value={form.assignedTo} onChange={set("assignedTo")} className={inputClass}>
          {officers.map((officer) => (
            <option key={officer}>{officer}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Team</label>
        <input type="text" value={form.team} onChange={set("team")} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Priority</label>
          <select value={form.priority} onChange={set("priority")} className={inputClass}>
            {["Low", "Medium", "High", "Critical"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Deadline</label>
          <input type="date" value={form.deadline} onChange={set("deadline")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Action Required</label>
        <textarea
          required
          rows="3"
          value={form.action}
          onChange={set("action")}
          placeholder="Describe the corrective action required..."
          className="w-full rounded-lg p-3 border border-[#c3c6d7] outline-none resize-none focus:border-[#2563eb]"
        />
      </div>
    </form>
  );
}