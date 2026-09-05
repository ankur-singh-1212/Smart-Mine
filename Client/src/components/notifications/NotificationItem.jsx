import { formatDateTime } from "../../utils/formatDate";

const TYPE_META = {
  HIGH_RISK: { icon: "warning", color: "#ba1a1a", bg: "rgba(186,26,26,0.1)" },
  OVERDUE: { icon: "schedule", color: "#c2410c", bg: "rgba(249,115,22,0.1)" },
  ASSIGNED: { icon: "assignment_ind", color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
  VERIFICATION: { icon: "fact_check", color: "#006242", bg: "rgba(0,98,66,0.1)" },
  COMPLIANCE: { icon: "rule", color: "#004ac6", bg: "rgba(0,74,198,0.1)" },
};

export default function NotificationItem({ notification, onToggleRead }) {
  const meta = TYPE_META[notification.type] || TYPE_META.COMPLIANCE;

  return (
    <div
      className={`rounded-lg border p-4 flex gap-3 transition ${
        notification.read ? "border-[#e0e3e5] bg-white" : "border-[#2563eb]/40 bg-[#2563eb]/[0.03]"
      }`}
    >
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: meta.bg, color: meta.color }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
          {meta.icon}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-sm">{notification.title}</h4>
          <span className="text-xs text-[#737686] whitespace-nowrap">
            {formatDateTime(notification.createdAt)}
          </span>
        </div>
        <p className="text-sm text-[#434655] mt-0.5">{notification.message}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="badge risk-low text-[9px]">
            {notification.type.replaceAll("_", " ")}
          </span>
          {notification.relatedMine && (
            <span className="flex items-center gap-1 text-xs text-[#737686]">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                fmd_good
              </span>
              {notification.relatedMine}
            </span>
          )}
          <button
            onClick={() => onToggleRead && onToggleRead(notification.id)}
            className="ml-auto text-xs font-semibold text-[#004ac6] hover:underline"
          >
            {notification.read ? "Mark unread" : "Mark as read"}
          </button>
        </div>
      </div>
    </div>
  );
}