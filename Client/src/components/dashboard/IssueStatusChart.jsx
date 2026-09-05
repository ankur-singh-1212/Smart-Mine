import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function IssueStatusChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#737686" }} />
        <YAxis tick={{ fontSize: 11, fill: "#737686" }} allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "rgba(0,74,198,0.06)" }}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #c3c6d7",
            background: "#ffffff",
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" name="Issues" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}