import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InspectionForm from "../../components/inspections/InspectionForm";
import Button from "../../components/common/Button";
import { persistInspection, computeRisk } from "../../data/demoData";

const PHASES = [
  [25, "Analyzing structural image data..."],
  [50, "Checking regional compliance rules..."],
  [75, "Pattern matching against historical incidents..."],
  [100, "Generating final risk score..."],
];

function AiRiskAnalysis({ analyzeSignal }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Ready...");
  const [result, setResult] = useState(null);

  const run = () => {
    setAnalyzing(true);
    setResult(null);
    setProgress(0);

    let index = 0;
    const runPhase = () => {
      if (index < PHASES.length) {
        setProgress(PHASES[index][0]);
        setStatus(PHASES[index][1]);
        index++;
        setTimeout(runPhase, 700);
      } else {
        setTimeout(() => {
          setAnalyzing(false);
          setResult({
            score: analyzeSignal.riskScore,
            level: analyzeSignal.riskLevel,
            levelClass:
              analyzeSignal.riskLevel === "High"
                ? "bg-[#ba1a1a]/10 border-[#ba1a1a] text-[#ba1a1a]"
                : analyzeSignal.riskLevel === "Medium"
                  ? "bg-[#f59e0b]/10 border-[#c2410c] text-[#c2410c]"
                  : "bg-[#004ac6]/10 border-[#004ac6] text-[#004ac6]",
          });
        }, 500);
      }
    };
    runPhase();
  };

  return (
    <section className="relative p-6 rounded-xl overflow-hidden bg-[#004ac6]/5 border border-[#004ac6]/20">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] bg-[#004ac6] opacity-20" />

      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#004ac6]/10">
        <h4 className="text-xl font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6]">auto_awesome</span>
          3. AI Risk Analysis
        </h4>

        <Button variant="primary" onClick={run} disabled={analyzing}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            analytics
          </span>
          {analyzing ? "Analyzing..." : "Analyze Risk"}
        </Button>
      </div>

      {analyzing && (
        <div className="relative py-4">
          <div className="flex justify-between items-center mb-2 font-mono text-sm text-[#004ac6]">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#e0e3e5] overflow-hidden">
            <div
              className="h-full bg-[#004ac6] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {result && (
        <div className="result relative mt-4 p-4 rounded-lg bg-white border border-[#c3c6d7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl bg-[#ba1a1a]/10 border-2 border-[#ba1a1a] text-[#ba1a1a]"
              style={{
                borderColor:
                  result.level === "High" ? "#ba1a1a" : result.level === "Medium" ? "#c2410c" : "#004ac6",
                color: result.level === "High" ? "#ba1a1a" : result.level === "Medium" ? "#c2410c" : "#004ac6",
              }}
            >
              {result.score}
            </div>
            <div>
              <p className="text-xl font-semibold">AI Risk Score: {result.score}/100</p>
              <p className="text-sm text-[#434655]">
                Based on historical data and evidence provided.
              </p>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center gap-2 border ${result.levelClass}`}
          >
            <span className="material-symbols-outlined">warning</span>
            Risk Level: {result.level.toUpperCase()}
          </div>
        </div>
      )}
    </section>
  );
}

function CreateInspection() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState({});

  const handleSubmit = (values) => {
    const risk = computeRisk(values);
    const id = `INSP-${780 + Math.floor(Math.random() * 900)}`;
    const inspection = {
      id,
      mine: values.mine || "Unassigned Mine",
      area: values.area,
      inspector: values.inspector,
      date: values.inspectionDate,
      category: values.category,
      description: values.description,
      riskLevel: risk.riskLevel,
      riskScore: risk.riskScore,
      status: "Completed",
      complianceStatus: risk.riskLevel === "High" ? "Non-Compliant" : risk.riskLevel === "Medium" ? "Warning" : "Compliant",
      recurringRisk: values.category === "Safety",
    };
    persistInspection(inspection);
    navigate("/inspections", { state: { created: id } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/inspections" className="p-2 text-[#434655] hover:text-[#004ac6]" aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">New Field Inspection</h2>
          <p className="text-sm mt-1 text-[#434655]">Log a new safety or compliance audit.</p>
        </div>
      </div>

      <div className="card p-6 space-y-8">
        <InspectionForm onSubmit={handleSubmit} onChange={setDraft} />

        <AiRiskAnalysis analyzeSignal={computeRisk(draft)} />
      </div>
    </div>
  );
}

export default CreateInspection;