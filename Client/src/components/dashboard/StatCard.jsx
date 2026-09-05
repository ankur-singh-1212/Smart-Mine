export default function StatCard({ title, value, icon, tone = "text-[#434655]", trend }) {
  return (
    <div className="rounded-xl p-4 border shadow-sm flex flex-col bg-white border-[#c3c6d7]">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold uppercase text-[#434655] tracking-wider">
          {title}
        </span>
        <span className={`material-symbols-outlined ${tone}`} style={{ fontSize: "20px" }}>
          {icon}
        </span>
      </div>
      <div className="text-2xl font-semibold mt-auto">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-medium text-[#006242] bg-[rgba(0,98,66,0.1)] px-1.5 py-0.5 rounded mt-1 self-end">
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            arrow_upward
          </span>
          {trend}
        </div>
      )}
    </div>
  );
}