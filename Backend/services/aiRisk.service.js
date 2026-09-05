export const calculateRisk = ({
  description,
  category,
  complianceStatus,
  recurringRisk = false
}) => {
  let score = 0;
  const reasons = [];

  const text = `${description} ${category}`.toLowerCase();

  // Safety-related keywords
  const highRiskKeywords = [
    "fire",
    "gas",
    "accident",
    "collapse",
    "explosion",
    "emergency",
    "fatal",
    "hazard",
    "ventilation"
  ];

  const mediumRiskKeywords = [
    "damage",
    "leak",
    "warning",
    "broken",
    "missing",
    "unsafe"
  ];

  const highRiskDetected = highRiskKeywords.some((keyword) =>
    text.includes(keyword)
  );

  const mediumRiskDetected = mediumRiskKeywords.some((keyword) =>
    text.includes(keyword)
  );

  if (highRiskDetected) {
    score += 40;
    reasons.push("High-risk safety indicator detected");
  } else if (mediumRiskDetected) {
    score += 25;
    reasons.push("Medium-risk issue indicator detected");
  }

  // Compliance status
  if (complianceStatus === "Non-Compliant") {
    score += 25;
    reasons.push("Non-compliant inspection");
  } else if (complianceStatus === "Warning") {
    score += 15;
    reasons.push("Compliance warning");
  }

  // Recurring issue
  if (recurringRisk) {
    score += 25;
    reasons.push("Recurring issue detected");
  }

  // Limit score to 100
  score = Math.min(score, 100);

  let riskLevel = "Low";

  if (score >= 70) {
    riskLevel = "High";
  } else if (score >= 40) {
    riskLevel = "Medium";
  }

  return {
    score,
    riskLevel,
    reasons,
    recurringRisk
  };
};