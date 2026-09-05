export function riskClass(level) {
  const key = String(level ?? "").toLowerCase();
  if (key.includes("high") || key.includes("critical")) return "badge risk-high";
  if (key.includes("medium") || key.includes("warning")) return "badge risk-medium";
  if (key.includes("low") || key.includes("compliant")) return "badge risk-low";
  return "badge risk-low";
}

export function statusClass(status) {
  const key = String(status ?? "").toLowerCase();
  if (
    key.includes("completed") ||
    key.includes("resolved") ||
    key.includes("verified") ||
    key.includes("approved") ||
    key.includes("compliant")
  ) {
    return "badge status-completed";
  }
  if (key.includes("overdue") || key.includes("high") || key.includes("rejected")) {
    return "badge status-overdue";
  }
  return "badge status-progress";
}

export function riskScoreLevel(score) {
  if (score >= 70) return { level: "High", cls: "risk-high" };
  if (score >= 40) return { level: "Medium", cls: "risk-medium" };
  return { level: "Low", cls: "risk-low" };
}