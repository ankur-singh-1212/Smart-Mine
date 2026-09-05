import { useState } from "react";
import { reports } from "../../data/demoData";
import ReportFilters from "../../components/reports/ReportFilters";
import ReportTable from "../../components/reports/ReportTable";
import Button from "../../components/common/Button";
import { downloadCSV } from "../../utils/csvExport";

const INITIAL = { type: "", mine: "", from: "", to: "" };

function Reports() {
  const [filters, setFilters] = useState(INITIAL);

  const filtered = reports.filter((report) => {
    const type = !filters.type || report.type === filters.type;
    const mine = !filters.mine || report.mine === filters.mine || report.mine === "All Mines";
    const from = !filters.from || report.generatedAt >= filters.from;
    const to = !filters.to || report.generatedAt <= filters.to;
    return type && mine && from && to;
  });

  const exportOne = (report) => {
    downloadCSV(
      `${report.id}.csv`,
      ["ID", "Type", "Title", "Mine", "Generated", "Description"],
      [[report.id, report.type, report.title, report.mine, report.generatedAt, report.description]]
    );
  };

  const exportAll = () => {
    downloadCSV(
      "reports.csv",
      ["ID", "Type", "Title", "Mine", "Generated", "Description"],
      filtered.map((r) => [r.id, r.type, r.title, r.mine, r.generatedAt, r.description])
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Reports &amp; Analytics</h2>
          <p className="text-sm mt-1 text-[#434655]">
            Generate, filter and export inspection, risk and compliance reports.
          </p>
        </div>

        <Button variant="secondary" onClick={exportAll}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            download
          </span>
          Export All ({filtered.length})
        </Button>
      </div>

      <ReportFilters filters={filters} onChange={setFilters} onClear={() => setFilters(INITIAL)} />

      <ReportTable reports={filtered} onExport={exportOne} />
    </div>
  );
}

export default Reports;