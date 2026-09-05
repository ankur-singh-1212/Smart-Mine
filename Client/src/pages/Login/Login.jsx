import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const DEMO_ROLES = [
  { role: "Inspector", email: "inspector@coal.gov", password: "inspector123", desc: "Create inspections & report issues" },
  { role: "Officer", email: "officer@coal.gov", password: "officer123", desc: "Manage corrective actions" },
  { role: "Verifier", email: "verifier@coal.gov", password: "verifier123", desc: "Review & verify evidence" },
  { role: "Admin", email: "admin@coal.gov", password: "admin123", desc: "Full platform access" },
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter an email and password.");
      return;
    }
    navigate("/");
  };

  const fillDemo = (demo) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
  };

  const inputClass =
    "w-full h-11 rounded-lg px-4 bg-white border border-[#c3c6d7] outline-none focus:border-[#2563eb]";

  return (
    <div className="min-h-screen flex bg-[#f7f9fb] text-[#191c1e]">
      {/* BRAND SIDE */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] p-12 bg-[#2d3133] text-white">
        <div>
          <h1 className="text-3xl font-bold">SmartMine</h1>
          <p className="text-sm mt-1 text-[#bec6e0] opacity-80">Coal Governance AI</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-snug max-w-md">
            From compliance monitoring to intelligent risk prevention.
          </h2>
          <p className="text-[#e0e3e5] mt-3 max-w-md text-sm leading-relaxed">
            A centralized platform for field inspections, compliance checks, risk analysis and
            corrective-action verification across coal mines.
          </p>
        </div>

        <div className="space-y-3 text-sm text-[#e0e3e5]">
          {["Smart Automation", "AI Risk Analysis", "Role-based Access"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563eb]">check_circle</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <h1 className="text-2xl font-bold">SmartMine</h1>
            <p className="text-sm text-[#434655]">Coal Governance AI</p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="text-sm text-[#434655] mt-1">
              Use a demo account to explore the platform.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@coal.gov"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1 text-[#434655]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>

              {error && <p className="text-sm text-[#ba1a1a]">{error}</p>}

              <Button type="submit" className="w-full">
                Sign in
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  arrow_forward
                </span>
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e0e3e5]">
              <p className="text-xs font-semibold uppercase text-[#737686] mb-3">
                Quick demo access
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ROLES.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => fillDemo(demo)}
                    className="text-left rounded-lg border border-[#c3c6d7] p-3 hover:border-[#2563eb] transition"
                  >
                    <div className="font-semibold text-sm">{demo.role}</div>
                    <div className="text-xs text-[#737686] mt-0.5 leading-snug">{demo.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;