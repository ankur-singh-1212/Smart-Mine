import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";
import { formatDate } from "../../utils/formatDate";

export default function ReportTable({ reports, onExport }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f2f4f6] border-b border-[#c3c6d7]">
            <tr>
              {["ID", "Type", "Title", "Mine", "Generated", "Description", ""].map((item) => (
                <th key={item} className="py-3 px-4 text-xs font-semibold uppercase whitespace-nowrap">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="row-hover border-b border-[#c3c6d7]">
                <td className="py-3 px-4 font-mono text-sm font-medium text-[#004ac6]">
                  {report.id}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge value={report.type} variant="status" />
                </td>
                <td className="py-3 px-4 font-medium">{report.title}</td>
                <td className="py-3 px-4 text-[#434655]">{report.mine}</td>
                <td className="py-3 px-4">{formatDate(report.generatedAt)}</td>
                <td className="py-3 px-4 max-w-[260px]">
                  <p className="text-sm text-[#434655] truncate">{report.description}</p>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onExport(report)}
                    className="p-1.5 text-[#434655] hover:text-[#004ac6]"
                    aria-label="Export"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      download
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 && <EmptyState icon="description" title="No reports found" />}
    </div>
  );
}