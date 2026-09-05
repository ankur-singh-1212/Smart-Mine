export const mines = [
  {
    id: "m1",
    name: "Shakti Coal Mine",
    location: "Sector 4, Mining Zone A",
    latitude: 23.7957,
    longitude: 86.4304,
    complianceScore: 72,
    status: "High Risk",
    totalInspections: 34,
    openIssues: 5,
    resolvedIssues: 21,
  },
  {
    id: "m2",
    name: "Pragati Coal Mine",
    location: "Industrial Zone B",
    latitude: 23.8103,
    longitude: 86.4412,
    complianceScore: 86,
    status: "Warning",
    totalInspections: 29,
    openIssues: 3,
    resolvedIssues: 24,
  },
  {
    id: "m3",
    name: "Surya Coal Mine",
    location: "Mining Sector C",
    latitude: 23.7821,
    longitude: 86.4188,
    complianceScore: 94,
    status: "Compliant",
    totalInspections: 31,
    openIssues: 1,
    resolvedIssues: 28,
  },
  {
    id: "m4",
    name: "Bharat Coal Mine",
    location: "Eastern Mining Zone",
    latitude: 23.8245,
    longitude: 86.4621,
    complianceScore: 68,
    status: "High Risk",
    totalInspections: 27,
    openIssues: 6,
    resolvedIssues: 17,
  },
  {
    id: "m5",
    name: "Kolar Deep Shaft",
    location: "Shaft Cluster D, Level 12",
    latitude: 23.7621,
    longitude: 86.4551,
    complianceScore: 79,
    status: "Warning",
    totalInspections: 22,
    openIssues: 4,
    resolvedIssues: 16,
  },
  {
    id: "m6",
    name: "Godaveri Open Cast",
    location: "Pit 4, Western Block",
    latitude: 23.7998,
    longitude: 86.4091,
    complianceScore: 90,
    status: "Compliant",
    totalInspections: 18,
    openIssues: 0,
    resolvedIssues: 15,
  },
];

export const inspectors = [
  "Rajiv Kumar",
  "Anita Desai",
  "Suresh Mehta",
  "Priya Nair",
];

export const officers = [
  "Deepak Joshi",
  "Neha Sharma",
  "Arvind Singh",
  "Kavita Rao",
];

export const verifiers = [
  "Mohan Lal",
  "Sunita Verma",
];

export const inspectionCategories = [
  "Safety",
  "Environment",
  "Equipment",
  "Infrastructure",
  "Worker Welfare",
  "Emergency",
];

export const inspections = [
  {
    id: "INSP-772",
    mine: "Shakti Coal Mine",
    area: "Section B",
    inspector: "Rajiv Kumar",
    date: "2026-09-15",
    category: "Safety",
    description:
      "Ventilation ducts in Section B showed partial blockage; air flow below recommended threshold.",
    riskLevel: "High",
    riskScore: 87,
    status: "Completed",
    complianceStatus: "Non-Compliant",
    recurringRisk: true,
  },
  {
    id: "INSP-773",
    mine: "Godaveri Open Cast",
    area: "Pit 4",
    inspector: "Anita Desai",
    date: "2026-09-16",
    category: "Environment",
    description:
      "Dust suppression sprinklers operating normally; water level within acceptable limits.",
    riskLevel: "Low",
    riskScore: 22,
    status: "Completed",
    complianceStatus: "Compliant",
    recurringRisk: false,
  },
  {
    id: "INSP-774",
    mine: "Kolar Deep Shaft",
    area: "Level 12",
    inspector: "Rajiv Kumar",
    date: "2026-09-18",
    category: "Infrastructure",
    description:
      "Cracks observed on concrete shaft lining near level 12 landing; needs structural review.",
    riskLevel: "Medium",
    riskScore: 55,
    status: "In Progress",
    complianceStatus: "Warning",
    recurringRisk: false,
  },
  {
    id: "INSP-775",
    mine: "Bharat Coal Mine",
    area: "Ventilation Shaft 3",
    inspector: "Suresh Mehta",
    date: "2026-09-20",
    category: "Equipment",
    description:
      "Primary ventilation fan bearing temperature elevated during peak load run.",
    riskLevel: "Medium",
    riskScore: 61,
    status: "In Progress",
    complianceStatus: "Warning",
    recurringRisk: false,
  },
  {
    id: "INSP-776",
    mine: "Pragati Coal Mine",
    area: "Conveyor Belt 2",
    inspector: "Priya Nair",
    date: "2026-09-21",
    category: "Worker Welfare",
    description:
      "Canteen hygiene and first-aid kit checks found compliant; drinking water points maintained.",
    riskLevel: "Low",
    riskScore: 12,
    status: "Overdue",
    complianceStatus: "Compliant",
    recurringRisk: false,
  },
  {
    id: "INSP-777",
    mine: "Shakti Coal Mine",
    area: "Overburden Dump 3",
    inspector: "Anita Desai",
    date: "2026-09-22",
    category: "Safety",
    description:
      "Slope angle of overburden dump exceeded recommended value after recent rainfall.",
    riskLevel: "High",
    riskScore: 79,
    status: "In Progress",
    complianceStatus: "Non-Compliant",
    recurringRisk: true,
  },
];

export const issues = [
  {
    issueId: "ISS-1042",
    inspection: "INSP-772",
    mine: "Shakti Coal Mine",
    title: "Ventilation duct blockage in Section B",
    description:
      "Air flow in Section B dropped below statutory minimum. Rectification required within 7 days.",
    category: "Safety",
    riskLevel: "High",
    riskScore: 87,
    status: "In Progress",
    assignedTo: "Deepak Joshi",
    recurring: true,
    preventionRecommendation:
      "Install weekly duct blockage sensors and schedule automated air-flow logging.",
  },
  {
    issueId: "ISS-1041",
    inspection: "INSP-777",
    mine: "Shakti Coal Mine",
    title: "Overburden dump slope instability",
    description:
      "Post-rain slope angle exceeded safe limit. Immediate re-profiling suggested.",
    category: "Safety",
    riskLevel: "Medium",
    riskScore: 65,
    status: "Assigned",
    assignedTo: "Arvind Singh",
    recurring: false,
    preventionRecommendation:
      "Deploy slope monitoring inclinometers and trigger alarm beyond 34 degrees.",
  },
  {
    issueId: "ISS-1040",
    inspection: "INSP-774",
    mine: "Kolar Deep Shaft",
    title: "Shaft lining cracks at Level 12",
    description:
      "Minor structural cracks observed. Structural audit and grouting recommended.",
    category: "Infrastructure",
    riskLevel: "Medium",
    riskScore: 55,
    status: "Open",
    assignedTo: null,
    recurring: false,
    preventionRecommendation: "",
  },
  {
    issueId: "ISS-1039",
    inspection: "INSP-775",
    mine: "Bharat Coal Mine",
    title: "Ventilation fan bearing overheating",
    description:
      "Bearing temperature 12C above normal. Needs replacement during next maintenance window.",
    category: "Equipment",
    riskLevel: "Medium",
    riskScore: 61,
    status: "Verified",
    assignedTo: "Neha Sharma",
    recurring: false,
    preventionRecommendation:
      "Add vibration analysis to routine maintenance checklist.",
  },
  {
    issueId: "ISS-1038",
    inspection: "INSP-773",
    mine: "Godaveri Open Cast",
    title: "Dust suppression coverage gap",
    description:
      "Edge of Pit 4 not covered by sprinkler range during high wind.",
    category: "Environment",
    riskLevel: "Low",
    riskScore: 30,
    status: "Resolved",
    assignedTo: "Kavita Rao",
    recurring: false,
    preventionRecommendation:
      "Extend sprinkler risers and add wind-speed based scheduling.",
  },
];

export const actions = [
  {
    actionId: "ACT-1001",
    issue: "ISS-1042",
    mine: "Shakti Coal Mine",
    assignedTo: "Deepak Joshi",
    team: "Ventilation Engineering",
    priority: "Critical",
    deadline: "2026-09-30",
    action: "Clear duct blockage and replace damaged vent panels in Section B.",
    status: "In Progress",
    verificationStatus: "Pending",
    remarks: "Two of four duct segments cleared; panel replacement underway.",
  },
  {
    actionId: "ACT-0998",
    issue: "ISS-1041",
    mine: "Shakti Coal Mine",
    assignedTo: "Arvind Singh",
    team: "Civil & Mining",
    priority: "High",
    deadline: "2026-10-05",
    action: "Re-profile overburden dump slope and install monitoring stakes.",
    status: "Assigned",
    verificationStatus: "Pending",
    remarks: "",
  },
  {
    actionId: "ACT-0995",
    issue: "ISS-1039",
    mine: "Bharat Coal Mine",
    assignedTo: "Neha Sharma",
    team: "Maintenance Crew",
    priority: "High",
    deadline: "2026-09-25",
    action: "Replace ventilation fan bearing and run load test.",
    status: "Resolved",
    verificationStatus: "Approved",
    remarks: "Bearing replaced; vibration readings normal for 48 hours.",
  },
  {
    actionId: "ACT-0992",
    issue: "ISS-1038",
    mine: "Godaveri Open Cast",
    assignedTo: "Kavita Rao",
    team: "Environment Cell",
    priority: "Medium",
    deadline: "2026-09-22",
    action: "Install mobile sprinkler unit for Pit 4 edge coverage.",
    status: "Resolved",
    verificationStatus: "Approved",
    remarks: "Mobile unit deployed and tested during high wind.",
  },
  {
    actionId: "ACT-0989",
    issue: "ISS-1040",
    mine: "Kolar Deep Shaft",
    assignedTo: "Mohan Lal",
    team: "Structural Audit",
    priority: "Medium",
    deadline: "2026-10-12",
    action: "Conduct detailed structural audit of shaft lining at Level 12.",
    status: "Open",
    verificationStatus: "Pending",
    remarks: "",
  },
];

export const notifications = [
  {
    id: "n1",
    type: "HIGH_RISK",
    title: "High-risk issue detected",
    message: "Ventilation duct blockage at Shakti Coal Mine scored 87/100.",
    relatedMine: "Shakti Coal Mine",
    read: false,
    createdAt: "2026-09-15T10:30:00Z",
  },
  {
    id: "n2",
    type: "OVERDUE",
    title: "Corrective action overdue",
    message: "ACT-0989 deadline approaching for shaft lining audit.",
    relatedMine: "Kolar Deep Shaft",
    read: false,
    createdAt: "2026-09-16T08:00:00Z",
  },
  {
    id: "n3",
    type: "ASSIGNED",
    title: "Action assigned to you",
    message: "Overburden slope re-profiling assigned to Arvind Singh.",
    relatedMine: "Shakti Coal Mine",
    read: true,
    createdAt: "2026-09-17T14:15:00Z",
  },
  {
    id: "n4",
    type: "VERIFICATION",
    title: "Verification pending",
    message: "ACT-0995 resolution evidence submitted for review.",
    relatedMine: "Bharat Coal Mine",
    read: false,
    createdAt: "2026-09-18T09:45:00Z",
  },
  {
    id: "n5",
    type: "COMPLIANCE",
    title: "Recurring risk detected",
    message: "3 similar issues reported in Section B within 30 days.",
    relatedMine: "Shakti Coal Mine",
    read: true,
    createdAt: "2026-09-19T11:20:00Z",
  },
];

export const users = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@coal.gov",
    role: "Admin",
    department: "Management",
    isActive: true,
  },
  {
    id: "u2",
    name: "Inspector User",
    email: "inspector@coal.gov",
    role: "Inspector",
    department: "Inspection",
    isActive: true,
  },
  {
    id: "u3",
    name: "Officer User",
    email: "officer@coal.gov",
    role: "Officer",
    department: "Compliance",
    isActive: true,
  },
  {
    id: "u4",
    name: "Verifier User",
    email: "verifier@coal.gov",
    role: "Verifier",
    department: "Verification",
    isActive: true,
  },
  {
    id: "u5",
    name: "Rajiv Kumar",
    email: "rajiv@coal.gov",
    role: "Inspector",
    department: "Inspection",
    isActive: true,
  },
  {
    id: "u6",
    name: "Deepak Joshi",
    email: "deepak@coal.gov",
    role: "Officer",
    department: "Ventilation Engineering",
    isActive: false,
  },
];

export const reports = [
  {
    id: "RPT-001",
    type: "Compliance",
    title: "Quarterly Compliance Summary",
    mine: "All Mines",
    generatedAt: "2026-09-01",
    description: "Consolidated compliance score across all registered coal mines.",
  },
  {
    id: "RPT-002",
    type: "Inspection",
    title: "September Inspection Log",
    mine: "Shakti Coal Mine",
    generatedAt: "2026-09-22",
    description: "All field inspections logged against Shakti Coal Mine in September.",
  },
  {
    id: "RPT-003",
    type: "Risk",
    title: "High-Risk Issue Register",
    mine: "All Mines",
    generatedAt: "2026-09-20",
    description: "Open issues ranked by risk score above threshold.",
  },
  {
    id: "RPT-004",
    type: "Corrective Action",
    title: "Overdue Actions Report",
    mine: "Kolar Deep Shaft",
    generatedAt: "2026-09-19",
    description: "Corrective actions pending beyond their deadlines.",
  },
  {
    id: "RPT-005",
    type: "Compliance",
    title: "Surya Coal Mine Scorecard",
    mine: "Surya Coal Mine",
    generatedAt: "2026-09-15",
    description: "Water, air quality and worker welfare compliance scorecard.",
  },
];

export const reportTypes = [
  "Compliance",
  "Inspection",
  "Risk",
  "Corrective Action",
];

export const nav = [
  { label: "Dashboard", icon: "dashboard", path: "/" },
  { label: "Inspections", icon: "fact_check", path: "/inspections" },
  { label: "Issues & Risks", icon: "warning", path: "/issues" },
  { label: "Corrective Actions", icon: "task_alt", path: "/actions" },
  { label: "Mines", icon: "fmd_good", path: "/mines" },
  { label: "Reports", icon: "description", path: "/reports" },
  { label: "Notifications", icon: "notifications", path: "/notifications" },
  { label: "Users", icon: "group", path: "/users" },
];

const STORAGE_KEY = "smartmine.createdInspections";

export function loadInspections() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return [...stored.reverse(), ...inspections];
  } catch {
    return inspections;
  }
}

export function persistInspection(inspection) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([inspection, ...stored]));
  } catch {
    /* ignore storage errors in prototype */
  }
}

export function computeRisk(form) {
  const { category, description, area } = form;
  let score = 35;
  if (category === "Safety") score += 20;
  if (category === "Emergency") score += 30;
  if (category === "Infrastructure") score += 12;
  if (category === "Equipment") score += 8;
  if ((description || "").length > 80) score += 15;
  if (/crack|blockage|overheat|leak|slope|ventilation/i.test(description || "")) score += 18;
  if (/rail|conveyor|explosive|high/i.test(area || "")) score += 8;
  score = Math.min(98, Math.max(10, Math.round(score)));
  const level = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";
  return { riskScore: score, riskLevel: level };
}