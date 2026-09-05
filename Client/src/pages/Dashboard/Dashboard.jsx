import { Link } from "react-router-dom";
import { mines, inspections, issues, actions } from "../../data/demoData";
import StatCard from "../../components/dashboard/StatCard";
import ComplianceChart from "../../components/dashboard/ComplianceChart";
import RiskChart from "../../components/dashboard/RiskChart";
import IssueStatusChart from "../../components/dashboard/IssueStatusChart";
import StatusBadge from "../../components/common/StatusBadge";

const complianceRate = Math.round(
  (mines.reduce((sum, m) => sum + m.complianceScore, 0) / mines.length) * 10
) / 10;

const activeInspections = inspections.filter((i) => i.status !== "Completed").length;
const highRiskIssues = issues.filter((i) => i.riskLevel === "High").length;
const pendingActions = actions.filter((a) => a.verificationStatus !== "Approved").length;
const verifiedIssues = issues.filter((i) => i.status === "Verified").length;

const kpis = [
  { title: "Total Mines", value: mines.length, icon: "fmd_good", tone: "text-[#004ac6]" },
  { title: "Compliance Rate", value: `${complianceRate}%`, icon: "verified", tone: "text-[#006242]", trend: "4.2%" },
  { title: "Active Inspections", value: activeInspections, icon: "fact_check", tone: "text-[#2563eb]" },
  { title: "High Risk Issues", value: highRiskIssues, icon: "warning", tone: "text-[#ba1a1a]" },
  { title: "Pending Actions", value: pendingActions, icon: "pending_actions", tone: "text-[#737686]" },
  { title: "Verified Issues", value: verifiedIssues, icon: "rule", tone: "text-[#737686]" },
];

const riskByLevel = [
  { name: "High", value: issues.filter((i) => i.riskLevel === "High").length },
  { name: "Medium", value: issues.filter((i) => i.riskLevel === "Medium").length },
  { name: "Low", value: issues.filter((i) => i.riskLevel === "Low").length },
];

const issueByStatus = ["Open", "Assigned", "In Progress", "Resolved", "Verified"].map(
  (name) => ({ name, count: issues.filter((i) => i.status === name).length })
);

const priorityRisks = [...issues]
  .sort((a, b) => b.riskScore - a.riskScore)
  .slice(0, 5);

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SmartMine Command Center</h1>
        <p className="text-base mt-1 text-[#434655]">
          Real-time governance, compliance &amp; risk monitoring
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-12 gap-6">
        <section className="card p-4 col-span-12 lg:col-span-8">
          <div className="border-b border-[#e0e3e5] pb-3 mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Compliance &amp; Risk Overview</h2>
            <span className="material-symbols-outlined text-[#737686]">bar_chart</span>
          </div>
          <ComplianceChart data={mines} />
        </section>

        <section className="card p-4 col-span-12 lg:col-span-4">
          <div className="border-b border-[#e0e3e5] pb-3 mb-4">
            <h2 className="text-xl font-semibold">Risk Distribution</h2>
          </div>
          <RiskChart data={riskByLevel} />
        </section>

        <section className="card p-4 col-span-12 lg:col-span-6">
          <div className="border-b border-[#e0e3e5] pb-3 mb-4">
            <h2 className="text-xl font-semibold">Issue Status</h2>
          </div>
          <IssueStatusChart data={issueByStatus} />
        </section>

        <section className="card p-4 col-span-12 lg:col-span-6">
          <div className="border-b border-[#e0e3e5] pb-3 mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Priority Risk Alerts</h2>
            <Link to="/issues" className="text-xs font-semibold text-[#004ac6] tracking-wider">
              VIEW ALL
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-[#f2f4f6] text-[#434655]">
                  <th className="py-3 px-4 text-xs uppercase">Issue</th>
                  <th className="py-3 px-4 text-xs uppercase">Mine</th>
                  <th className="py-3 px-4 text-xs uppercase">Score</th>
                  <th className="py-3 px-4 text-xs uppercase">Level</th>
                  <th className="py-3 px-4 text-xs uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {priorityRisks.map((risk) => (
                  <tr key={risk.issueId} className="border-b border-[#e0e3e5] row-hover">
                    <td className="py-3 px-4">
                      <div className="font-medium">{risk.title}</div>
                      <div className="text-xs font-mono text-[#737686]">{risk.issueId}</div>
                    </td>
                    <td className="py-3 px-4 text-[#434655]">{risk.mine}</td>
                    <td className="py-3 px-4 font-mono">{risk.riskScore}</td>
                    <td className="py-3 px-4">
                      <StatusBadge value={risk.riskLevel} variant="risk" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge value={risk.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* AI INSIGHT + QUICK ACTIONS */}
      <div className="grid grid-cols-12 gap-6">
        <section className="glass-ai rounded-xl p-4 shadow-md relative overflow-hidden col-span-12 lg:col-span-7">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(0,74,198,0.05), rgba(78,222,163,0.05))",
            }}
          />
          <div className="relative flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 text-[#004ac6]">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Recurring Risk Detected</h3>
              <p className="text-sm mb-4 text-[#434655]">
                3 similar issues reported in Section B within the last 30 days. Consider
                comprehensive structural review.
              </p>
              <Link
                to="/issues"
                className="flex items-center gap-1 text-sm font-medium text-[#004ac6] hover:underline"
              >
                Analyze Pattern
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="card p-4 col-span-12 lg:col-span-5">
          <div className="border-b border-[#e0e3e5] pb-3 mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            <Link
              to="/reports"
              className="w-full text-left px-4 py-3 rounded-lg border border-[#e0e3e5] flex items-center justify-between transition hover:border-[#2563eb]"
            >
              <span className="font-medium">Generate Compliance Report</span>
              <span className="material-symbols-outlined text-[#737686]">description</span>
            </Link>
            <Link
              to="/actions"
              className="w-full text-left px-4 py-3 rounded-lg border border-[#e0e3e5] flex items-center justify-between transition hover:border-[#2563eb]"
            >
              <span className="font-medium">Review Pending Actions</span>
              <span className="material-symbols-outlined text-[#737686]">checklist</span>
            </Link>
            <Link
              to="/inspections"
              className="w-full text-left px-4 py-3 rounded-lg border border-[#e0e3e5] flex items-center justify-between transition hover:border-[#2563eb]"
            >
              <span className="font-medium">Log New Inspection</span>
              <span className="material-symbols-outlined text-[#737686]">add_box</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;