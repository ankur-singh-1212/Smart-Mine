import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import {
  AlertTriangle, ShieldCheck, MapPin, Radio, Search, Bell, ChevronRight,
  Satellite, Wind, HardHat, FileWarning, Activity, ArrowUp, ArrowDown,
  ChevronUp, ChevronDown, Check, X, SlidersHorizontal,
} from "lucide-react";

/* ---------------------------------------------------------------
   MOCK DATA
--------------------------------------------------------------- */

const MINES = [
  { code: "JHR-04", name: "Jharia Coalfield", state: "Jharkhand", safety: 78, env: 61, statutory: 88, status: "review", lastInspection: "2026-08-22", history: [70, 72, 74, 76, 75, 77, 76, 78] },
  { code: "KRB-11", name: "Korba Coalfield", state: "Chhattisgarh", safety: 91, env: 84, statutory: 95, status: "compliant", lastInspection: "2026-08-29", history: [82, 84, 85, 87, 88, 89, 90, 90] },
  { code: "TLC-02", name: "Talcher Coalfield", state: "Odisha", safety: 66, env: 58, statutory: 71, status: "breach", lastInspection: "2026-08-14", history: [74, 72, 70, 68, 66, 64, 65, 65] },
  { code: "SGR-07", name: "Singrauli Coalfield", state: "Madhya Pradesh", safety: 85, env: 79, statutory: 90, status: "compliant", lastInspection: "2026-08-27", history: [80, 81, 82, 83, 84, 85, 85, 85] },
  { code: "RNG-03", name: "Raniganj Coalfield", state: "West Bengal", safety: 73, env: 69, statutory: 80, status: "review", lastInspection: "2026-08-19", history: [78, 76, 75, 74, 73, 74, 74, 74] },
  { code: "DHN-09", name: "Dhanbad Belt", state: "Jharkhand", safety: 88, env: 75, statutory: 92, status: "compliant", lastInspection: "2026-08-30", history: [79, 81, 82, 83, 84, 85, 86, 85] },
];

const TREND_12M = [
  { month: "Oct", safety: 71, env: 59, statutory: 78 },
  { month: "Nov", safety: 72, env: 60, statutory: 79 },
  { month: "Dec", safety: 73, env: 61, statutory: 79 },
  { month: "Jan", safety: 73, env: 63, statutory: 80 },
  { month: "Feb", safety: 74, env: 62, statutory: 80 },
  { month: "Mar", safety: 76, env: 64, statutory: 81 },
  { month: "Apr", safety: 75, env: 66, statutory: 83 },
  { month: "May", safety: 79, env: 68, statutory: 85 },
  { month: "Jun", safety: 80, env: 70, statutory: 84 },
  { month: "Jul", safety: 82, env: 71, statutory: 86 },
  { month: "Aug", safety: 80, env: 71, statutory: 86 },
  { month: "Sep", safety: 81, env: 72, statutory: 87 },
];

const RANGES = { "3M": 3, "6M": 6, "1Y": 12 };

const ALERTS = [
  { id: 1, sev: "critical", mine: "TLC-02", icon: MapPin, time: "08:14", title: "Boundary breach detected", detail: "Satellite diff shows 2.1ha extraction beyond approved lease boundary." },
  { id: 2, sev: "critical", mine: "JHR-04", icon: Wind, time: "07:52", title: "Methane threshold exceeded", detail: "Sensor cluster B-3 reporting 1.4% CH4, above 1.0% action limit." },
  { id: 3, sev: "warning", mine: "RNG-03", icon: HardHat, time: "07:30", title: "PPE non-compliance", detail: "CV pipeline flagged 6 personnel without helmets near Shaft 2 entrance." },
  { id: 4, sev: "warning", mine: "TLC-02", icon: FileWarning, time: "06:58", title: "Environmental clearance renewal due", detail: "MoEFCC clearance EC-2021-0447 expires in 9 days." },
  { id: 5, sev: "info", mine: "KRB-11", icon: Satellite, time: "06:40", title: "Weekly drone survey complete", detail: "Stockpile volume within \u00b13% of declared production." },
  { id: 6, sev: "info", mine: "DHN-09", icon: Activity, time: "06:12", title: "Predictive maintenance flag cleared", detail: "Conveyor bearing temperature returned to nominal range." },
];

const SEV_STYLES = {
  critical: { bar: "bg-[--critical]", text: "text-[--critical]", ring: "ring-[--critical]/30", label: "Critical" },
  warning: { bar: "bg-[--warn]", text: "text-[--warn]", ring: "ring-[--warn]/30", label: "Warning" },
  info: { bar: "bg-[--teal]", text: "text-[--teal]", ring: "ring-[--teal]/30", label: "Info" },
};

const STATUS_STYLES = {
  compliant: { text: "text-[--safe]", dot: "bg-[--safe]", label: "Compliant" },
  review: { text: "text-[--warn]", dot: "bg-[--warn]", label: "Under review" },
  breach: { text: "text-[--critical]", dot: "bg-[--critical]", label: "Breach" },
};

function scoreTone(v) {
  if (v >= 80) return "#5FA777";
  if (v >= 65) return "#E8A33D";
  return "#D6614A";
}
function overall(m) {
  return Math.round((m.safety + m.env + m.statutory) / 3);
}
function delta(history) {
  return history[history.length - 1] - history[history.length - 2];
}

/* ---------------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------------- */

function Sparkline({ data, tone, width = 64, height = 22 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = Math.max(max - min, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline points={pts} fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeltaTag({ value }) {
  const up = value >= 0;
  const tone = up ? "text-[--safe]" : "text-[--critical]";
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-mono ${tone}`}>
      <Icon size={11} strokeWidth={2.5} />
      {Math.abs(value)}
    </span>
  );
}

function ScoreBar({ value, tone }) {
  return (
    <div className="w-full h-1.5 bg-[--surface-2] rounded-sm overflow-hidden">
      <div className="h-full rounded-sm transition-all duration-500" style={{ width: `${value}%`, backgroundColor: tone }} />
    </div>
  );
}

function MiniBar({ value, tone, width = 46 }) {
  return (
    <div className="h-1.5 rounded-sm bg-[--surface-2] overflow-hidden" style={{ width }}>
      <div className="h-full rounded-sm" style={{ width: `${value}%`, backgroundColor: tone }} />
    </div>
  );
}

function ComplianceGauge({ value }) {
  const tone = scoreTone(value);
  const data = [{ value, fill: tone }];
  return (
    <div className="relative flex items-center justify-center" style={{ width: 108, height: 68 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%" cy="100%" innerRadius="140%" outerRadius="220%"
          startAngle={180} endAngle={0} data={data} barSize={9}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "#21262B" }} dataKey="value" cornerRadius={5} angleAxisId={0} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="font-mono text-xl leading-none" style={{ color: tone }}>{value}</span>
      </div>
    </div>
  );
}

function SortHeader({ label, sortKey, active, dir, onClick }) {
  return (
    <th
      onClick={() => onClick(sortKey)}
      className="font-medium px-3 py-2 cursor-pointer select-none group"
    >
      <span className="inline-flex items-center gap-1 hover:text-[--text] transition-colors">
        {label}
        <span className={`transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}>
          {dir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </span>
      </span>
    </th>
  );
}

/* ---------------------------------------------------------------
   MAIN
--------------------------------------------------------------- */

export default function KhanNetraDashboard() {
  const [selected, setSelected] = useState(MINES[2].code);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("6M");
  const [alertFilter, setAlertFilter] = useState("all");
  const [acked, setAcked] = useState(() => new Set());
  const [sortKey, setSortKey] = useState("safety");
  const [sortDir, setSortDir] = useState("desc");

  const activeMine = useMemo(() => MINES.find((m) => m.code === selected), [selected]);

  const filteredMines = useMemo(
    () => MINES.filter((m) => (m.name + m.code + m.state).toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const sortedMines = useMemo(() => {
    const arr = [...MINES];
    arr.sort((a, b) => {
      const va = sortKey === "name" ? a.name : sortKey === "overall" ? overall(a) : a[sortKey];
      const vb = sortKey === "name" ? b.name : sortKey === "overall" ? overall(b) : b[sortKey];
      if (typeof va === "string") return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [sortKey, sortDir]);

  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const trend = TREND_12M.slice(TREND_12M.length - RANGES[range]);

  const overallIndex = Math.round(MINES.reduce((s, m) => s + overall(m), 0) / MINES.length);
  const visibleAlerts = ALERTS.filter((a) => (alertFilter === "all" || a.sev === alertFilter) && !acked.has(a.id));
  const criticalCount = ALERTS.filter((a) => a.sev === "critical" && !acked.has(a.id)).length;
  const breachCount = MINES.filter((m) => m.status === "breach").length;

  const sevCounts = {
    all: ALERTS.filter((a) => !acked.has(a.id)).length,
    critical: ALERTS.filter((a) => a.sev === "critical" && !acked.has(a.id)).length,
    warning: ALERTS.filter((a) => a.sev === "warning" && !acked.has(a.id)).length,
    info: ALERTS.filter((a) => a.sev === "info" && !acked.has(a.id)).length,
  };

  return (
    <div
      className="w-full min-h-screen flex text-[--text] bg-[--bg]"
      style={{
        "--bg": "#14171A", "--surface": "#1B1F23", "--surface-2": "#21262B",
        "--border": "#2C3136", "--text": "#ECE8E0", "--text-muted": "#8B9199",
        "--amber": "#E8A33D", "--teal": "#4FA9A2", "--safe": "#5FA777", "--warn": "#E8A33D", "--critical": "#D6614A",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C3136; border-radius: 4px; }
        .panel-shadow { box-shadow: 0 1px 0 0 rgba(255,255,255,0.02) inset, 0 8px 20px -12px rgba(0,0,0,0.5); }
      `}</style>

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-72 shrink-0 border-r border-[--border] flex flex-col bg-[--surface]">
        <div className="px-5 py-5 border-b border-[--border]">
          <div className="h-1 w-10 mb-3" style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8A33D 0 6px, #14171A 6px 12px)" }} />
          <h1 className="font-display text-xl tracking-tight leading-none">KhanNetra</h1>
          <p className="text-[11px] text-[--text-muted] mt-1">Mine Governance &amp; Compliance Grid</p>
        </div>

        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-[--surface-2] border border-[--border] focus-within:border-[--amber]/50 transition-colors">
            <Search size={13} className="text-[--text-muted] shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter sites…"
              className="bg-transparent text-sm outline-none placeholder:text-[--text-muted] w-full"
            />
          </div>
        </div>

        <div className="px-5 pt-2 pb-2 text-[11px] text-[--text-muted] font-medium flex items-center justify-between">
          <span>Monitored sites</span>
          <span className="font-mono">{filteredMines.length}/{MINES.length}</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredMines.map((m) => {
            const st = STATUS_STYLES[m.status];
            const active = m.code === selected;
            const d = delta(m.history);
            return (
              <button
                key={m.code}
                onClick={() => setSelected(m.code)}
                className={`w-full text-left px-3 py-2.5 mb-0.5 rounded-sm flex items-center gap-3 transition-all duration-150 ${
                  active ? "bg-[--surface-2] ring-1 ring-inset ring-[--amber]/25" : "hover:bg-[--surface-2]/60"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${st.dot}`} />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm truncate">{m.name}</span>
                  <span className="block text-[11px] font-mono text-[--text-muted]">{m.code} · {m.state}</span>
                </span>
                <Sparkline data={m.history} tone={scoreTone(overall(m))} />
                {active && <ChevronRight size={14} className="text-[--text-muted] shrink-0" />}
              </button>
            );
          })}
          {filteredMines.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-[--text-muted]">No sites match "{query}".</p>
          )}
        </nav>

        <div className="px-5 py-4 border-t border-[--border] flex items-center gap-2 text-[11px] text-[--text-muted]">
          <Radio size={13} className="text-[--safe] animate-pulse" />
          Live feed connected
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-[--border] bg-[--surface]/95 backdrop-blur flex items-center justify-between px-6 h-14 shrink-0">
          <div>
            <span className="text-[11px] text-[--text-muted] font-mono">DASHBOARD / OVERVIEW</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[11px] font-mono text-[--text-muted]">04 SEP 2026 · 08:41 IST</span>
            <button className="relative text-[--text-muted] hover:text-[--text] transition-colors">
              <Bell size={17} />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[--critical] text-[9px] flex items-center justify-center text-[--bg] font-bold">
                  {criticalCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Stat strip */}
        <div className="flex items-stretch border-b border-[--border] bg-[--surface] px-2">
          <div className="flex items-center gap-3 px-4 py-2 border-r border-[--border]">
            <ComplianceGauge value={overallIndex} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] tracking-wide text-[--text-muted] font-medium">COMPLIANCE INDEX</span>
              <span className="text-[11px] text-[--text-muted]">network average</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1 px-5 py-3 border-r border-[--border]">
            <span className="text-[11px] tracking-wide text-[--text-muted] font-medium">ACTIVE ALERTS</span>
            <span className="font-mono text-2xl leading-none text-[--warn]">{sevCounts.all}<span className="text-sm text-[--text-muted] ml-1">open</span></span>
          </div>
          <div className="flex flex-col justify-center gap-1 px-5 py-3 border-r border-[--border]">
            <span className="text-[11px] tracking-wide text-[--text-muted] font-medium">MINES UNDER WATCH</span>
            <span className="font-mono text-2xl leading-none">{MINES.length}<span className="text-sm text-[--text-muted] ml-1">sites</span></span>
          </div>
          <div className="flex flex-col justify-center gap-1 px-5 py-3">
            <span className="text-[11px] tracking-wide text-[--text-muted] font-medium">BOUNDARY BREACHES</span>
            <span className="font-mono text-2xl leading-none text-[--critical]">{breachCount}<span className="text-sm text-[--text-muted] ml-1">ytd</span></span>
          </div>
        </div>

        {/* Body grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 overflow-y-auto">
          {/* LEFT / CENTER column */}
          <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
            {/* Selected mine schematic panel */}
            <section className="border border-[--border] bg-[--surface] rounded-sm overflow-hidden panel-shadow">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[--border]">
                <div>
                  <h2 className="font-display text-lg leading-none">{activeMine.name}</h2>
                  <p className="text-[11px] font-mono text-[--text-muted] mt-1">
                    {activeMine.code} · {activeMine.state} · Last inspection {activeMine.lastInspection}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 border rounded-sm ${STATUS_STYLES[activeMine.status].text}`} style={{ borderColor: "currentColor" }}>
                  {STATUS_STYLES[activeMine.status].label}
                </span>
              </div>

              <div className="relative h-56 bg-[#101315] overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 600 224" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#22282d" strokeWidth="1" />
                    </pattern>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D6614A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#D6614A" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="600" height="224" fill="url(#grid)" />
                  <circle cx="405" cy="95" r="70" fill="url(#glow)" />
                  <polygon points="140,50 380,40 420,150 180,180" fill="none" stroke="#4FA9A2" strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="145" y="42" fill="#4FA9A2" fontSize="10" fontFamily="IBM Plex Mono">APPROVED LEASE</text>
                  <polygon points="380,40 430,55 420,150 400,140" fill="#D6614A" fillOpacity="0.2" stroke="#D6614A" strokeWidth="1.5" />
                  <text x="392" y="30" fill="#D6614A" fontSize="10" fontFamily="IBM Plex Mono">FLAGGED · +2.1ha</text>
                  {[[200, 90], [260, 120], [330, 80], [300, 150], [220, 150]].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="6" fill="#E8A33D" fillOpacity="0.15" />
                      <circle cx={x} cy={y} r="3" fill="#E8A33D" />
                    </g>
                  ))}
                  {/* compass */}
                  <g transform="translate(30,190)">
                    <circle r="14" fill="none" stroke="#3A4046" strokeWidth="1" />
                    <text x="0" y="-18" fill="#8B9199" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Mono">N</text>
                    <line x1="0" y1="0" x2="0" y2="-11" stroke="#8B9199" strokeWidth="1" />
                  </g>
                </svg>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[--text-muted]">SENTINEL-2 · 03 SEP 2026</span>
              </div>

              <div className="grid grid-cols-3 gap-5 px-5 py-4">
                {[["Safety", activeMine.safety], ["Environmental", activeMine.env], ["Statutory", activeMine.statutory]].map(([label, val]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[--text-muted]">{label}</span>
                      <span className="font-mono" style={{ color: scoreTone(val) }}>{val}</span>
                    </div>
                    <ScoreBar value={val} tone={scoreTone(val)} />
                  </div>
                ))}
              </div>
            </section>

            {/* Trend chart */}
            <section className="border border-[--border] bg-[--surface] rounded-sm p-5 panel-shadow">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="font-display text-base">Compliance trend — network average</h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-4 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-[--text-muted]"><span className="h-2 w-2 rounded-full bg-[--amber] inline-block" />Safety</span>
                    <span className="flex items-center gap-1.5 text-[--text-muted]"><span className="h-2 w-2 rounded-full bg-[--teal] inline-block" />Environmental</span>
                    <span className="flex items-center gap-1.5 text-[--text-muted]"><span className="h-2 w-2 rounded-full bg-[--safe] inline-block" />Statutory</span>
                  </div>
                  <div className="flex border border-[--border] rounded-sm overflow-hidden">
                    {Object.keys(RANGES).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                          range === r ? "bg-[--surface-2] text-[--text]" : "text-[--text-muted] hover:text-[--text]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#2C3136" vertical={false} />
                  <XAxis dataKey="month" stroke="#8B9199" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: "#2C3136" }} tickLine={false} />
                  <YAxis stroke="#8B9199" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "#1B1F23", border: "1px solid #2C3136", borderRadius: 2, fontSize: 12, fontFamily: "IBM Plex Mono" }} labelStyle={{ color: "#ECE8E0" }} />
                  <Line type="monotone" dataKey="safety" stroke="#E8A33D" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="env" stroke="#4FA9A2" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="statutory" stroke="#5FA777" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Table */}
            <section className="border border-[--border] bg-[--surface] rounded-sm overflow-hidden panel-shadow">
              <div className="px-5 py-3 border-b border-[--border] flex items-center justify-between">
                <h3 className="font-display text-base">Site register</h3>
                <span className="text-[11px] text-[--text-muted] flex items-center gap-1"><SlidersHorizontal size={11} />sortable</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] text-[--text-muted] border-b border-[--border]">
                      <SortHeader label="Site" sortKey="name" active={sortKey === "name"} dir={sortDir} onClick={handleSort} />
                      <SortHeader label="Safety" sortKey="safety" active={sortKey === "safety"} dir={sortDir} onClick={handleSort} />
                      <SortHeader label="Env." sortKey="env" active={sortKey === "env"} dir={sortDir} onClick={handleSort} />
                      <SortHeader label="Statutory" sortKey="statutory" active={sortKey === "statutory"} dir={sortDir} onClick={handleSort} />
                      <th className="font-medium px-3 py-2">Inspected</th>
                      <th className="font-medium px-5 py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMines.map((m) => (
                      <tr
                        key={m.code}
                        onClick={() => setSelected(m.code)}
                        className={`border-b border-[--border] last:border-b-0 cursor-pointer transition-colors ${
                          m.code === selected ? "bg-[--surface-2]" : "hover:bg-[--surface-2]/50"
                        }`}
                      >
                        <td className="px-5 py-2.5">
                          <div className="leading-tight">{m.name}</div>
                          <div className="text-[11px] font-mono text-[--text-muted]">{m.code}</div>
                        </td>
                        {["safety", "env", "statutory"].map((k) => (
                          <td key={k} className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono w-6" style={{ color: scoreTone(m[k]) }}>{m[k]}</span>
                              <MiniBar value={m[k]} tone={scoreTone(m[k])} />
                            </div>
                          </td>
                        ))}
                        <td className="px-3 py-2.5 font-mono text-[--text-muted] whitespace-nowrap">{m.lastInspection}</td>
                        <td className="px-5 py-2.5 text-right">
                          <span className={`inline-flex items-center gap-1.5 text-xs ${STATUS_STYLES[m.status].text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[m.status].dot}`} />
                            {STATUS_STYLES[m.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT column — alert feed */}
          <div className="lg:col-span-1 min-w-0">
            <section className="border border-[--border] bg-[--surface] rounded-sm h-full flex flex-col panel-shadow">
              <div className="px-5 py-3 border-b border-[--border] flex items-center gap-2">
                <AlertTriangle size={15} className="text-[--warn]" />
                <h3 className="font-display text-base">Live alert feed</h3>
              </div>

              <div className="flex gap-1.5 px-5 py-2.5 border-b border-[--border] flex-wrap">
                {["all", "critical", "warning", "info"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAlertFilter(f)}
                    className={`px-2.5 py-1 rounded-sm text-[11px] font-mono capitalize border transition-colors ${
                      alertFilter === f
                        ? "bg-[--surface-2] border-[--border] text-[--text]"
                        : "border-transparent text-[--text-muted] hover:text-[--text]"
                    }`}
                  >
                    {f} <span className="opacity-60">{sevCounts[f]}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto">
                {visibleAlerts.map((a) => {
                  const sev = SEV_STYLES[a.sev];
                  const Icon = a.icon;
                  return (
                    <div key={a.id} className="group flex gap-3 px-5 py-3.5 border-b border-[--border] last:border-b-0 hover:bg-[--surface-2]/40 transition-colors">
                      <span className={`w-1 shrink-0 rounded-sm ${sev.bar}`} />
                      <Icon size={16} className={`shrink-0 mt-0.5 ${sev.text}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[--text-muted] mb-0.5">
                          <span>{a.time}</span>
                          <span>·</span>
                          <span>{a.mine}</span>
                          <span className={`ml-auto ${sev.text}`}>{sev.label}</span>
                        </div>
                        <div className="text-sm leading-snug">{a.title}</div>
                        <div className="text-xs text-[--text-muted] leading-snug mt-0.5">{a.detail}</div>
                      </div>
                      <button
                        onClick={() => setAcked((s) => new Set(s).add(a.id))}
                        title="Acknowledge"
                        className="shrink-0 h-6 w-6 rounded-sm border border-[--border] flex items-center justify-center text-[--text-muted] opacity-0 group-hover:opacity-100 hover:text-[--safe] hover:border-[--safe]/40 transition-all"
                      >
                        <Check size={12} />
                      </button>
                    </div>
                  );
                })}
                {visibleAlerts.length === 0 && (
                  <div className="px-5 py-10 text-center text-xs text-[--text-muted] flex flex-col items-center gap-2">
                    <ShieldCheck size={20} className="text-[--safe]" />
                    All clear in this category.
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-[--border] flex items-center justify-between text-xs text-[--text-muted]">
                <span className="flex items-center gap-2"><ShieldCheck size={14} />Synced 2 min ago</span>
                {acked.size > 0 && (
                  <button onClick={() => setAcked(new Set())} className="flex items-center gap-1 hover:text-[--text] transition-colors">
                    <X size={11} />{acked.size} acknowledged
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}