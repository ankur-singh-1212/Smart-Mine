export const checkCompliance = ({
  inspectionDate,
  description,
  category
}) => {
  let complianceStatus = "Compliant";
  let riskAlert = false;
  let reasons = [];

  const today = new Date();
  const inspectedDate = new Date(inspectionDate);

  // Rule 1: Inspection date is overdue
  if (inspectedDate < today) {
    complianceStatus = "Warning";
    reasons.push("Inspection is overdue");
  }

  // Rule 2: Safety issue reported
  const text = `${description} ${category}`.toLowerCase();

  const safetyKeywords = [
    "safety",
    "fire",
    "accident",
    "hazard",
    "emergency",
    "helmet",
    "ventilation",
    "gas",
    "danger"
  ];

  const safetyIssueDetected = safetyKeywords.some((keyword) =>
    text.includes(keyword)
  );

  if (safetyIssueDetected) {
    complianceStatus = "Non-Compliant";
    riskAlert = true;
    reasons.push("Safety-related issue detected");
  }

  return {
    complianceStatus,
    riskAlert,
    reasons
  };
};