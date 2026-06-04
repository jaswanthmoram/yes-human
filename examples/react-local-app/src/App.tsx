import { useState } from "react";
import { createRouter } from "@yes-human/core";
import { defaultPack } from "@yes-human/packs";
import { SkillRunner, WorkflowRunner } from "@yes-human/runtime";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState<any>(null);
  const [execResult, setExecResult] = useState<any>(null);

  const samplePrompts = [
    "review code for bugs",
    "summarize this file",
    "extract tasks from meeting notes",
    "fix this stack trace error",
    "write a professional email"
  ];

  const handleRoute = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;
    setLoading(true);
    setRouteResult(null);
    setExecResult(null);

    try {
      const router = createRouter({
        mode: "offline",
        packs: [defaultPack],
        trace: true
      });

      const result = await router.route(inputPrompt);
      setRouteResult(result);

      if (result.workflow) {
        const runner = new WorkflowRunner(new SkillRunner());
        const runRes = await runner.run(
          result.workflow,
          inputPrompt
        );
        setExecResult(runRes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>yes-human</h1>
        <p>Offline-First AI Workflow Router &amp; Runtime Simulator</p>
      </header>

      <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Input Card */}
        <section className="card">
          <div className="input-section">
            <h2 className="section-title">Test Natural-Language Routing</h2>
            <div className="input-wrapper">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a task (e.g., 'review code for memory leaks' or 'summarize this document')"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleRoute(prompt);
                  }
                }}
              />
              <button disabled={loading} onClick={() => handleRoute(prompt)}>
                {loading ? "Routing..." : "Route Prompt"}
              </button>
            </div>

            <div className="examples-row">
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", alignSelf: "center" }}>
                Suggestions:
              </span>
              {samplePrompts.map((p, idx) => (
                <div
                  key={idx}
                  className="example-tag"
                  onClick={() => {
                    setPrompt(p);
                    handleRoute(p);
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Panels */}
        {routeResult && (
          <section className="results-grid">
            {/* Left Column: Trace Timeline */}
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <h3 className="section-title">Execution Trace Timeline</h3>
              <div className="timeline">
                {routeResult.trace.steps.map((step: any, idx: number) => (
                  <div key={idx} className="timeline-item">
                    <div className={`timeline-dot ${step.status === "success" ? "success" : ""}`} />
                    <div className="timeline-content">
                      <h4>{step.step}</h4>
                      <p>Status: <span style={{ color: step.status === "success" ? "var(--success-color)" : "var(--text-secondary)" }}>{step.status}</span></p>
                      {step.metadata && (
                        <span className="badge" style={{ marginTop: "0.25rem" }}>
                          {JSON.stringify(step.metadata)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {execResult && execResult.trace.steps.map((step: any, idx: number) => (
                  <div key={`exec-${idx}`} className="timeline-item">
                    <div className={`timeline-dot ${step.status === "success" ? "success" : ""}`} />
                    <div className="timeline-content">
                      <h4>{step.step}</h4>
                      <p>Status: <span style={{ color: step.status === "success" ? "var(--success-color)" : "var(--text-secondary)" }}>{step.status}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Route Details & Output */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card">
                <h3 className="section-title">Route Matching Metrics</h3>
                
                <div className="info-label">Route ID</div>
                <div className="info-val" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-color)" }}>
                  {routeResult.route.id}
                </div>

                <div className="info-label">Match Stage</div>
                <div className="info-val">
                  <span className={`badge ${routeResult.route.stage === "exact" ? "success" : ""}`}>
                    {routeResult.route.stage}
                  </span>
                </div>

                <div className="info-label">Confidence Score</div>
                <div className="info-val">{routeResult.route.confidence * 100}%</div>

                <div className="info-label">Match Reason</div>
                <div className="info-val" style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: 0 }}>
                  {routeResult.route.reason}
                </div>
              </div>

              {execResult && (
                <div className="card" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 className="section-title">Workflow Execution Output</h3>
                  <div className="pre-block">
                    {execResult.output}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
