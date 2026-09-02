SmartMine ⛏️

AI-Based Smart Governance and Compliance Monitoring System for Coal Mines

«SIH 2026 — Problem Statement: SIH26024»

SmartMine is a frontend-only prototype designed to demonstrate a centralized smart governance and compliance monitoring platform for coal mines.

The system combines compliance monitoring, field inspection, risk analysis, corrective-action tracking, verification, and smart automation into a single dashboard.

---

🚀 Project Overview

Coal-mine operations involve continuous inspections, safety requirements, compliance checks, issue reporting, corrective actions, and verification.

SmartMine demonstrates how these activities can be digitally connected through a single platform.

Core Workflow

Report → Detect Risk → Assign → Fix → Verify → Prevent

The prototype uses realistic mock data to demonstrate this workflow without requiring a backend or external API.

---

✨ Key Features

📊 Smart Dashboard

- Total mines
- Compliance percentage
- Active inspections
- High-risk issues
- Pending corrective actions
- Verified issues
- Compliance and risk charts
- Priority risk alerts

🔍 Field Inspections

- Create new inspections
- Select mine and area
- Add issue details
- Select severity
- Upload evidence
- Select inspection location
- Simulated AI risk analysis

🤖 AI Risk Analysis

The prototype demonstrates:

- Risk scoring
- Risk classification
- Anomaly detection
- Recurring-risk detection
- Risk prioritization

«Note: The current prototype uses simulated/rule-based AI analysis. It does not claim to contain a trained production ML model.»

⚙️ Smart Automation

The platform demonstrates automated workflow steps such as:

- Compliance checking
- Risk flagging
- Corrective-action creation
- Assignment
- Deadline monitoring
- Verification tracking
- Recurring-risk identification

🛠️ Corrective Action Tracking

Track an issue through:

Open → Assigned → In Progress → Submitted → Verified

Officers can update actions and submit resolution evidence.

✅ Verification

Verifiers can:

- Review evidence
- Approve actions
- Reject actions
- Request rework

🗺️ Mine Risk Map

Interactive map using:

- Leaflet
- OpenStreetMap

Mine markers represent different compliance/risk conditions.

📑 Reports & Analytics

Generate and filter:

- Compliance reports
- Inspection reports
- Risk reports
- Corrective-action reports

The prototype supports basic CSV export.

🔔 Notifications

Examples:

- High-risk issue detected
- Corrective action overdue
- Verification pending
- Recurring risk detected

---

👥 Demo Roles

The prototype demonstrates four user roles:

Role| Main Access
Admin| Complete dashboard and management
Inspector| Create inspections and report issues
Officer| Manage assigned corrective actions
Verifier| Review and verify evidence

Role-based UI controls are implemented on the frontend for demonstration purposes.

---

🧠 Smart Automation

SmartMine's main concept is to automate the compliance lifecycle.

1. REPORT

An inspector submits an inspection and reports an issue.

2. DETECT RISK

The system performs rule-based checks and simulated AI risk analysis.

3. ASSIGN

A corrective action is created and assigned to a responsible officer.

4. FIX

The officer works on the issue and submits resolution evidence.

5. VERIFY

A verifier reviews the submitted evidence.

6. PREVENT

Recurring issues are highlighted so management can focus on future risk prevention.

---

🏗️ Technology Stack

Frontend

- React.js
- Vite
- JavaScript
- CSS / Tailwind CSS

Libraries

- React Router
- Recharts
- Lucide React
- Leaflet
- React Leaflet

Data

- Mock JSON data
- React state
- LocalStorage

Current Prototype

- Frontend only
- No backend required
- No MongoDB required
- No paid API required

---

📁 Project Structure

smartmine/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── data/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── assets/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md

---

💻 Installation

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Open the project

cd smartmine

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open the application

Vite will provide a local URL similar to:

http://localhost:5173

---

🎬 Recommended Demo Flow

For an SIH presentation, use the following flow:

Login as Inspector
        ↓
Create Inspection
        ↓
Report Safety Issue
        ↓
Upload Evidence
        ↓
AI Risk Analysis
        ↓
High Risk Detected
        ↓
Corrective Action Created
        ↓
Assign Officer
        ↓
Officer Updates Status
        ↓
Upload Resolution Evidence
        ↓
Verifier Reviews
        ↓
Approve
        ↓
Issue Verified
        ↓
Dashboard Updated
        ↓
Recurring Risk / Prevention

This demonstrates the complete Smart Automation lifecycle.

---

📊 Prototype Risk Levels

The prototype uses the following demonstration risk levels:

Risk Score| Level
0–39| 🟢 Low
40–69| 🟡 Medium
70–100| 🔴 High

These values are used for prototype demonstration and are not intended to represent an official coal-mine safety standard.

---

🗺️ Map

The map interface uses:

- Leaflet for map interaction
- OpenStreetMap for map data

The prototype uses fictional mine locations for demonstration.

---

🤖 AI Disclaimer

The current version is a prototype.

AI Risk Analysis is simulated using frontend logic/mock data to demonstrate the intended functionality.

A future version can integrate:

- Historical mine data
- Machine-learning models
- Real anomaly detection
- Predictive risk analysis
- Authorized government/enterprise APIs

---

🔮 Future Scope

The prototype can be extended with:

- Real backend
- MongoDB database
- Real authentication
- Real ML/AI models
- Real-time notifications
- Offline-first mobile application
- Advanced predictive analytics
- Government/enterprise API integration
- Real mine data integration
- Advanced audit trails
- Multi-mine centralized monitoring

---

🎯 Project Objective

The objective of SmartMine is to demonstrate how technology can help transform traditional compliance monitoring into a more:

- Centralized
- Transparent
- Automated
- Data-driven
- Risk-aware

governance workflow.

---

🏆 SIH 2026

Problem Statement: SIH26024
Category: Software
Theme: Smart Automation
Domain: Coal Mine Governance & Compliance

Team

Team Rocket

---

📌 Prototype Status

Current Status: Frontend Prototype 🚧

This project is developed for demonstration and proof-of-concept purposes.

It is not intended for direct deployment in real coal-mine operations without proper validation, security assessment, domain approval, and integration with authorized systems.

---

💡 Tagline

«SmartMine — From Compliance Monitoring to Intelligent Risk Prevention.»