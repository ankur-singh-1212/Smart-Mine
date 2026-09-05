import { riskScoreLevel } from "../../utils/status";

export default function RiskBadge({ score }) {
  if (score === null || score === undefined) return null;
  const { level, cls } = riskScoreLevel(score);
  return (
    <span className={`badge ${cls} gap-1`}>
      <span className="font-mono">{score}</span>
      {level}
    </span>
  );
}