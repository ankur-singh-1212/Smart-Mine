import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function ActionTable({ actions }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f2f4f6] border-b border-[#c3c6d7]">
            <tr>
              {["ID", "Issue", "Action", "Assigned To", "Priority", "Deadline", "Status", "Verification", ""].map(
                (item) => (
                  <th key={item} className="py-3 px-4 text-xs font-semibold uppercase whitespace-nowrap">
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action.actionId} className="row-hover border-b border-[#c3c6d7]">
                <td className="py-3 px-4 font-mono text-sm font-medium text-[#004ac6]">
                  {action.actionId}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{action.issue}</div>
                  <div className="text-xs text-[#737686]">{action.mine}</div>
                </td>
                <td className="py-3 px-4 max-w-[280px]">
                  <p className="text-sm text-[#434655] truncate">{action.action}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{action.assignedTo}</div>
                  <div className="text-xs text-[#737686]">{action.team}</div>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge value={action.priority} variant="risk" />
                </td>
                <td className="py-3 px-4">{formatDate(action.deadline)}</td>
                <td className="py-3 px-4">
                  <StatusBadge value={action.status} />
                </td>
                <td className="py-3 px-4">
                  <StatusBadge value={action.verificationStatus} />
                </td>
                <td className="py-3 px-4 text-right">
                  <Link to={`/actions/${action.actionId}`} className="p-1.5 text-[#434655] hover:text-[#004ac6]" aria-label="View">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      arrow_forward
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}