import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import RiskBadge from "./RiskBadge";

export default function IssueTable({ issues }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f2f4f6] border-b border-[#c3c6d7]">
            <tr>
              {["ID", "Issue", "Mine", "Category", "Risk", "Assigned To", "Status", ""].map((item) => (
                <th key={item} className="py-3 px-4 text-xs font-semibold uppercase whitespace-nowrap">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.issueId} className="row-hover border-b border-[#c3c6d7]">
                <td className="py-3 px-4 font-mono text-sm font-medium text-[#004ac6]">
                  {issue.issueId}
                </td>
                <td className="py-3 px-4">
                  <Link to={`/issues/${issue.issueId}`} className="font-medium hover:text-[#004ac6]">
                    {issue.title}
                  </Link>
                </td>
                <td className="py-3 px-4 text-[#434655]">{issue.mine}</td>
                <td className="py-3 px-4">{issue.category}</td>
                <td className="py-3 px-4">
                  <RiskBadge score={issue.riskScore} />
                </td>
                <td className="py-3 px-4">{issue.assignedTo || "—"}</td>
                <td className="py-3 px-4">
                  <StatusBadge value={issue.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <Link to={`/issues/${issue.issueId}`} className="p-1.5 text-[#434655] hover:text-[#004ac6]" aria-label="View">
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