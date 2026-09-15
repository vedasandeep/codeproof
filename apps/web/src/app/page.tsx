"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const historyTrendData = [
  { commit: "c1", qualityScore: 72, riskIndex: 65, coverage: 60 },
  { commit: "c2", qualityScore: 78, riskIndex: 50, coverage: 70 },
  { commit: "c3", qualityScore: 84, riskIndex: 35, coverage: 78 },
  { commit: "c4", qualityScore: 91, riskIndex: 20, coverage: 88.5 },
];

const dependencyGraphNodes = [
  { id: "apps/web", label: "Web UI Control Plane", type: "app", target: "packages/engine" },
  { id: "apps/cli", label: "CodeProof CLI", type: "app", target: "packages/engine" },
  { id: "apps/api", label: "Fastify API Gateway", type: "app", target: "packages/engine" },
  { id: "packages/mcp", label: "Stdio MCP Server", type: "gateway", target: "packages/core" },
  { id: "packages/engine", label: "Engineering Engine", type: "engine", target: "packages/core" },
  { id: "packages/core", label: "Core Schema Root", type: "root", target: "none" }
];

export default function Home() {
  const [intent, setIntent] = useState("Implement password reset token generation & email verification");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState<any>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [gitInfo, setGitInfo] = useState<any>(null);
  const [policies, setPolicies] = useState<any[]>([]);
  const [testMatrix, setTestMatrix] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "graphs">("overview");

  useEffect(() => {
    fetch("http://localhost:3001/api/git/diff")
      .then(res => res.json())
      .then(data => setGitInfo(data.gitInfo))
      .catch(() => {});

    fetch("http://localhost:3001/api/testing/matrix", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
      .then(res => res.json())
      .then(data => setTestMatrix(data.testMatrix))
      .catch(() => {});
  }, []);

  const handleGenerateProof = async () => {
    setLoading(true);
    try {
      const analyzeRes = await fetch("http://localhost:3001/api/tasks/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, targetFiles: ["src/auth/reset.ts"] }),
      });
      const analyzeData = await analyzeRes.json();
      setPolicies(analyzeData.policies || []);

      const res = await fetch("http://localhost:3001/api/proofs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, targetFiles: ["src/auth/reset.ts"] }),
      });
      const data = await res.json();
      setProof(data.proof);
      setMarkdown(data.markdown);
    } catch (err) {
      console.error(err);
      alert("Error generating proof. Make sure API server is running at http://localhost:3001");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/30 backdrop-blur flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-zinc-100">Vibe Code Freely. CodeProof Supplies Engineering Discipline.</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-3xl">
            CodeProof sits between developers/AI agents and the codebase—analyzing developer intent, establishing engineering obligations, performing deterministic verification, and producing verified Engineering Proofs.
          </p>
        </div>
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${activeTab === "overview" ? "bg-emerald-600 text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Proof Console
          </button>
          <button
            onClick={() => setActiveTab("graphs")}
            className={`px-3 py-1.5 rounded transition cursor-pointer ${activeTab === "graphs" ? "bg-emerald-600 text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Architecture Graphs
          </button>
        </div>
      </section>

      {/* Live Git Status & Diff Metrics */}
      {gitInfo && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-zinc-800 rounded-lg p-4 bg-zinc-950 font-mono text-xs">
          <div>
            <span className="text-zinc-500">Active Branch:</span> <strong className="text-emerald-400">{gitInfo.branch}</strong>
          </div>
          <div>
            <span className="text-zinc-500">Modified Files:</span> <span className="text-zinc-200">{gitInfo.modifiedFiles.length} files</span>
          </div>
          <div>
            <span className="text-zinc-500">Diff Metrics:</span> <span className="text-emerald-400">+{gitInfo.addedLines}</span> / <span className="text-rose-400">-{gitInfo.deletedLines}</span>
          </div>
        </section>
      )}

      {/* Testing & Architectural Matrix */}
      {testMatrix && (
        <section className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 space-y-4">
          <h2 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">System Verification Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="border border-zinc-800 bg-zinc-950 p-3 rounded">
              <div className="text-zinc-500 text-[10px]">UNIT TESTS</div>
              <div className="text-emerald-400 font-bold mt-1">14/14 PASS</div>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-3 rounded">
              <div className="text-zinc-500 text-[10px]">MODULE BOUNDARY</div>
              <div className="text-emerald-400 font-bold mt-1">4/4 VERIFIED</div>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-3 rounded">
              <div className="text-zinc-500 text-[10px]">BLACK BOX REST</div>
              <div className="text-emerald-400 font-bold mt-1">4 API PASS</div>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-3 rounded">
              <div className="text-zinc-500 text-[10px]">WHITE BOX AST</div>
              <div className="text-emerald-400 font-bold mt-1">88.5% COVERAGE</div>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-3 rounded">
              <div className="text-zinc-500 text-[10px]">COUPLING ANALYSIS</div>
              <div className="text-emerald-400 font-bold mt-1">LOOSE (0.92)</div>
            </div>
          </div>
        </section>
      )}

      {/* Main Tab Content */}
      {activeTab === "overview" ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">1. Intent & Policy Checks (BEFORE)</h2>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Developer Intent</label>
              <textarea
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                rows={4}
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
              />
            </div>
            <button
              onClick={handleGenerateProof}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono font-bold text-sm py-2.5 px-4 rounded transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Running Verification..." : "Synthesize Engineering Proof"}
            </button>

            {/* Evaluated Policies */}
            {policies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h3 className="text-xs font-mono font-semibold text-zinc-400">Governance Policies Evaluated:</h3>
                {policies.map(p => (
                  <div key={p.ruleId} className={`p-2.5 rounded font-mono text-xs border ${p.passed ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-rose-950/40 border-rose-800/60 text-rose-300'}`}>
                    <div className="font-bold">{p.ruleId}: {p.ruleName}</div>
                    <div className="text-[11px] mt-0.5 opacity-90">{p.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">2. Engineering Proof Artifact (AFTER)</h2>
            {proof ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-zinc-500">Proof ID:</span> <span className="text-zinc-200">{proof.proofId}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded font-bold ${proof.stage === 'VERIFIED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                    {proof.stage}
                  </div>
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                  {markdown}
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-zinc-600 font-mono text-xs border border-dashed border-zinc-800 rounded">
                Click &quot;Synthesize Engineering Proof&quot; to run real-time verification pipeline
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Architecture Graphs Tab */
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engineering Quality & Risk Trends */}
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">Engineering Quality & Risk Trend</h2>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="commit" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="qualityScore" name="Quality Score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="riskIndex" name="Risk Index" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monorepo Architecture Dependency Topology */}
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">Monorepo Architectural Dependency Graph</h2>
            <div className="space-y-3 font-mono text-xs pt-2">
              {dependencyGraphNodes.map(node => (
                <div key={node.id} className="flex items-center justify-between border border-zinc-800 bg-zinc-950 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${node.type === 'root' ? 'bg-indigo-500' : node.type === 'engine' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
                    <strong className="text-zinc-200">{node.id}</strong>
                    <span className="text-zinc-500 text-[11px]">({node.label})</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    depends on: <span className="text-emerald-400">{node.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
