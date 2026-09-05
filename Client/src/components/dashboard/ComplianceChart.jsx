import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const BAR_COLORS = { Compliant: "#006242", Warning: "#c2410c", "High Risk": "#ba1a1a" };

export default function ComplianceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#737686" }}
          interval={0}
          tickFormatter={(v) => (v.length > 12 ? v.split(" ")[0] : v)}
        />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#737686" }} />
        <Tooltip
          cursor={{ fill: "rgba(0,74,198,0.06)" }}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #c3c6d7",
            background: "#ffffff",
            fontSize: 12,
          }}
        />
        <Bar dataKey="complianceScore" name="Compliance" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.id} fill={BAR_COLORS[entry.status] || "#2563eb"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}