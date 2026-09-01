import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-bold">
              TF
            </span>
            <span className="font-semibold text-lg">TradeFlowFX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#analytics" className="hover:text-white">Analytics</a>
            <a href="#community" className="hover:text-white">Community</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm text-slate-300 hover:text-white">
              Log in
            </button>
            <button className="text-sm rounded-md bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              The Trading Journal That Works For You
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Track trades, analyze PnL, and refine your edge. TradeFlowFX gives you
              a clear view of your performance across MT4/MT5 accounts.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-md bg-indigo-500 px-5 py-2 text-sm font-medium hover:bg-indigo-400">
                Get Started
              </button>
              <button className="rounded-md border border-slate-700 px-5 py-2 text-sm font-medium text-slate-200 hover:border-slate-500">
                View Demo
              </button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-300">
              <div>
                <div className="font-semibold text-lg text-emerald-400">
                  +$2,847.50
                </div>
                <div>Today's PnL</div>
              </div>
              <div>
                <div className="font-semibold text-lg text-indigo-400">
                  67.8%
                </div>
                <div>Win Rate</div>
              </div>
              <div>
                <div className="font-semibold text-lg text-amber-400">
                  2,000+
                </div>
                <div>Traders on TradeFlowFX</div>
              </div>
            </div>
          </div>

          {/* Hero mock dashboard */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-slate-300">
                Equity Curve
              </span>
              <span className="text-xs text-slate-400">Last 30 days</span>
            </div>
            <div className="h-32 rounded-md bg-slate-800 flex items-center justify-center text-xs text-slate-500">
              Chart Placeholder
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-md bg-slate-800 p-3">
                <div className="text-slate-400">Win Rate</div>
                <div className="mt-1 text-lg font-semibold text-indigo-400">
                  67.8%
                </div>
              </div>
              <div className="rounded-md bg-slate-800 p-3">
                <div className="text-slate-400">Profit Factor</div>
                <div className="mt-1 text-lg font-semibold text-emerald-400">
                  1.92
                </div>
              </div>
              <div className="rounded-md bg-slate-800 p-3">
                <div className="text-slate-400">Max Drawdown</div>
                <div className="mt-1 text-lg font-semibold text-amber-400">
                  8.4%
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-300">Recent Trades</span>
                <span className="text-xs text-slate-500">MT5 • XAUUSD</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { symbol: "XAUUSD", dir: "Buy", pnl: "+$480.00" },
                  { symbol: "NAS100", dir: "Sell", pnl: "-$120.00" },
                  { symbol: "EURUSD", dir: "Buy", pnl: "+$75.50" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex justify-between rounded-md bg-slate-800 px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-200">
                        {t.symbol}
                      </span>
                      <span className="text-slate-400">{t.dir}</span>
                    </div>
                    <span
                      className={
                        t.pnl.startsWith("+")
                          ? "text-emerald-400 font-semibold"
                          : "text-rose-400 font-semibold"
                      }
                    >
                      {t.pnl}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
          <h2 className="text-2xl font-semibold">Built for serious traders</h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-semibold mb-2">Structured journaling</h3>
              <p className="text-slate-300">
                Tag trades by setup, session, and emotion so you can see exactly what works.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-semibold mb-2">Performance analytics</h3>
              <p className="text-slate-300">
                Win rate, RR, drawdown, and calendar heatmaps—automatically calculated from your history.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-semibold mb-2">Multi‑account ready</h3>
              <p className="text-slate-300">
                Track multiple MT4/MT5 accounts in one place and compare performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
          <h2 className="text-2xl font-semibold">Start free, grow with Pro</h2>
          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-semibold mb-1">Free</h3>
              <p className="text-slate-300 mb-3">Manual journaling, basic stats, single account.</p>
              <div className="text-lg font-semibold mb-3">$0 / month</div>
              <button className="w-full rounded-md bg-slate-800 py-2 text-xs font-medium hover:bg-slate-700">
                Choose Free
              </button>
            </div>
            <div className="rounded-lg border border-indigo-500 bg-slate-900/70 p-4">
              <h3 className="font-semibold mb-1">Pro</h3>
              <p className="text-slate-300 mb-3">MT4/MT5 sync, advanced analytics, export, and more.</p>
              <div className="text-lg font-semibold mb-3">$29 / month</div>
              <button className="w-full rounded-md bg-indigo-500 py-2 text-xs font-medium hover:bg-indigo-400">
                Choose Pro
              </button>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-semibold mb-1">Teams</h3>
              <p className="text-slate-300 mb-3">Multiple traders, shared dashboards, custom reporting.</p>
              <div className="text-lg font-semibold mb-3">Contact us</div>
              <button className="w-full rounded-md bg-slate-800 py-2 text-xs font-medium hover:bg-slate-700">
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 flex flex-wrap justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} TradeFlowFX. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#features" className="hover:text-slate-200">Features</a>
            <a href="#pricing" className="hover:text-slate-200">Pricing</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
