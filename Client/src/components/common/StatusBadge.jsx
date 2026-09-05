import { riskClass, statusClass } from "../../utils/status";

export default function StatusBadge({ value, variant = "status", className = "" }) {
  if (value === null || value === undefined || value === "") return null;
  const cls = variant === "risk" ? riskClass(value) : statusClass(value);
  return <span className={`${cls} ${className}`}>{value}</span>;
}