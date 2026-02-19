import Link from "next/link";

/* ─── tiny icon helpers (inline SVG, no deps) ─── */
const Icon = ({ d, cls = "w-6 h-6" }: { d: string; cls?: string }) => (
  <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const BoltIcon = ({ cls }: { cls?: string }) => (
  <Icon cls={cls} d="M13 10V3L4 14h7v7l9-11h-7z" />
);

/* ═══════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="bg-bg-page min-h-screen">
      {/* ───────── 1. NAVBAR ───────── */}
      <nav className="bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/15">
              <BoltIcon cls="w-5 h-5 text-white" />
            </span>
            <span className="text-white font-semibold text-lg tracking-tight">OptiForge AI</span>
          </Link>

          {/* Auth links */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-white/90 hover:text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm text-primary-dark bg-white font-semibold px-5 py-2 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ───────── 2. HERO ───────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              AI-Powered Design Optimization
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
              Optimize Your Product Designs with{" "}
              <span className="text-primary">Intelligent AI</span>
            </h1>
            <p className="mt-5 text-lg text-text-light leading-relaxed max-w-xl">
              Detect inefficiencies early, get instant improvement suggestions,
              and ship better designs — all powered by deep-learning analysis.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started Free
                <Icon cls="w-4 h-4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold text-sm px-7 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Dashboard illustration */}
          <div className="hidden lg:block">
            <div className="rounded-card border border-border bg-bg-page p-5">
              {/* Mini dashboard mock */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber" />
                <span className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-auto text-xs text-text-light font-medium">OptiForge Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Design Score", value: "94.2%", color: "text-success" },
                  { label: "Issues Found", value: "3", color: "text-amber" },
                  { label: "Optimized", value: "12", color: "text-primary" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-lg border border-border p-3">
                    <p className="text-[11px] text-text-light">{s.label}</p>
                    <p className={`text-xl font-bold ${s.color} mt-0.5`}>{s.value}</p>
                  </div>
                ))}
              </div>
              {/* Bars chart placeholder */}
              <div className="bg-white rounded-lg border border-border p-4">
                <p className="text-xs font-medium text-text-medium mb-3">Performance Analysis</p>
                <div className="space-y-2.5">
                  {[85, 70, 95, 60].map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-20 text-[11px] text-text-light">
                        {["Strength", "Weight", "Thermal", "Cost"][i]}
                      </span>
                      <div className="flex-1 h-2.5 bg-primary-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 3. PROBLEM ───────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">The Problem</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-dark">
              Traditional Design Workflows Are Broken
            </h2>
            <p className="mt-4 text-text-light text-lg">
              Engineering teams waste time & money on avoidable design errors that
              compound through the production pipeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Late Error Detection",
                desc: "Critical flaws discovered after prototyping cost 10× more to fix than errors caught during design.",
              },
              {
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                title: "Manual Feedback Loops",
                desc: "Designers wait days for simulation results, stalling iteration and delaying time-to-market.",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Cost Overruns",
                desc: "Inefficient geometries and material choices silently inflate production budgets by up to 30%.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-card border border-border p-7 shadow-card"
              >
                <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <Icon cls="w-5 h-5 text-warning" d={c.icon} />
                </div>
                <h3 className="text-lg font-semibold text-text-dark">{c.title}</h3>
                <p className="mt-2 text-sm text-text-light leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. SOLUTION / HOW IT WORKS ───────── */}
      <section className="bg-white border-y border-border py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-dark">
              Three Steps to Better Designs
            </h2>
            <p className="mt-4 text-text-light text-lg">
              OptiForge AI integrates directly into your workflow — no steep
              learning curve, no disruption.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
                title: "Upload Your Design",
                desc: "Import CAD files, 3D models, or design specs in any major format — STEP, STL, IGES, and more.",
              },
              {
                step: "02",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "AI Analyzes & Scores",
                desc: "Our deep-learning engine evaluates structural integrity, thermal performance, weight, and cost in seconds.",
              },
              {
                step: "03",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Optimize & Ship",
                desc: "Apply AI-recommended improvements, re-verify instantly, and export production-ready files with confidence.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center px-4">
                <span className="inline-block text-5xl font-extrabold text-primary-100 mb-4">
                  {s.step}
                </span>
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                  <Icon cls="w-6 h-6 text-primary" d={s.icon} />
                </div>
                <h3 className="text-lg font-semibold text-text-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-text-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. FEATURES ───────── */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-dark">
              Everything You Need to Design Smarter
            </h2>
            <p className="mt-4 text-text-light text-lg">
              A comprehensive toolset that empowers engineering teams to move faster
              with higher confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "Real-Time Analysis",
                desc: "Get instant feedback on structural, thermal, and cost metrics as you refine your design.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "AI Suggestions",
                desc: "Receive actionable improvement recommendations backed by deep-learning insights.",
              },
              {
                icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Detailed Reports",
                desc: "Export comprehensive PDF and CSV reports with visualization overlays for stakeholders.",
              },
              {
                icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                title: "Version History",
                desc: "Track every design iteration, compare versions side-by-side, and revert with one click.",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Team Collaboration",
                desc: "Invite teammates, assign reviews, and comment directly on design elements in real time.",
              },
              {
                icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
                title: "Multi-Format Import",
                desc: "Supports STEP, STL, IGES, OBJ, and more — drag-and-drop directly from your file system.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-card border border-border p-7 shadow-card hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <Icon cls="w-5 h-5 text-primary" d={f.icon} />
                </div>
                <h3 className="text-base font-semibold text-text-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-text-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 6. FINAL CTA ───────── */}
      <section className="bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Design Smarter?
          </h2>
          <p className="mt-4 text-lg text-blue-200 max-w-xl mx-auto">
            Join hundreds of engineering teams using OptiForge AI to eliminate
            design errors and accelerate time-to-market.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-primary-dark font-semibold text-sm px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Start Free Trial
              <Icon cls="w-4 h-4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 7. FOOTER ───────── */}
      <footer className="bg-navy text-white/80">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/15">
                  <BoltIcon cls="w-4 h-4 text-white" />
                </span>
                <span className="text-white font-semibold text-base">OptiForge AI</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered product design optimization platform for modern
                engineering teams.
              </p>
            </div>

            {/* Links */}
            {[
              {
                heading: "Product",
                links: ["Features", "Pricing", "Integrations", "Changelog"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                heading: "Resources",
                links: ["Documentation", "API Reference", "Community", "Support"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <span className="text-sm hover:text-white cursor-pointer transition-colors">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} OptiForge AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/50">
              <span className="hover:text-white/80 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white/80 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
