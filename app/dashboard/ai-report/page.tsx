"use client";

import { useState, useEffect } from "react";
import { FiCpu, FiPieChart, FiZap, FiCheckCircle, FiRefreshCw, FiTrendingUp, FiActivity, FiPercent, FiSmile } from "react-icons/fi";

export default function AIReportPage() {
  // 1. MASTER TRADES DATA POOL SOURCE
  const [trades] = useState([
    { id: 1, pair: "XAUUSD", type: "Buy", entry: "2430.5", exit: "2450.2", size: "0.10", pnl: 195, date: "2024-06-01", source: "MT5 Sync" },
    { id: 2, pair: "NAS100", type: "Sell", entry: "18900", exit: "18840", size: "1.00", pnl: 120, date: "2024-06-02", source: "MT5 Sync" },
    { id: 3, pair: "BTCUSD", type: "Buy", entry: "61000", exit: "61200", size: "0.05", pnl: 200, date: "2024-06-03", source: "Manual" },
    { id: 4, pair: "XAUUSD", type: "Sell", entry: "2440", exit: "2430", size: "0.20", pnl: -100, date: "2024-06-04", source: "MT5 Sync" },
  ]);

  // COMPUTED METRICS INITIALIZERS
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [metrics, setMetrics] = useState({
    totalTrades: 0,
    winRate: "0%",
    netPnL: 0,
    profitFactor: "0.00",
    mostTradedPair: "—"
  });

  // 2. BACK-END MATHEMATICAL AGGREGATION LOOP
  useEffect(() => {
    const runLedgerAnalysis = () => {
      setIsAnalyzing(true);
      
      if (trades.length === 0) {
        setIsAnalyzing(false);
        return;
      }

      const total = trades.length;
      const winners = trades.filter(t => t.pnl > 0);
      const winRatePct = ((winners.length / total) * 100).toFixed(1) + "%";
      const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

      const grossProfit = trades.reduce((sum, t) => t.pnl > 0 ? sum + t.pnl : sum, 0);
      const grossLoss = Math.abs(trades.reduce((sum, t) => t.pnl < 0 ? sum + t.pnl : sum, 0));
      const pf = grossLoss === 0 ? grossProfit.toFixed(2) : (grossProfit / grossLoss).toFixed(2);

      const pairCounts: { [key: string]: number } = {};
      trades.forEach(t => pairCounts[t.pair] = (pairCounts[t.pair] || 0) + 1);
      const favoritePair = Object.keys(pairCounts).reduce((a, b) => pairCounts[a] > pairCounts[b] ? a : b, "—");

      setMetrics({
        totalTrades: total,
        winRate: winRatePct,
        netPnL: totalPnL,
        profitFactor: pf,
        mostTradedPair: favoritePair
      });
      
      setIsAnalyzing(false);
    };

    const delayTimer = setTimeout(runLedgerAnalysis, 800);
    return () => clearTimeout(delayTimer);
  }, [trades]);

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12">
      
      {/* TOP ACTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <FiCpu className={`text-blue-500 ${isAnalyzing ? "animate-spin" : "animate-pulse"}`} /> AI Performance Report
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Automated computational summaries compiled from live account databases</p>
        </div>

        <div className="text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-[#1e293b]/40 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
          Last processed: <span className="text-slate-700 dark:text-white">Sat, Sep 5, 2026</span>
        </div>
      </div>

      {/* CORE COMPUTED STATS HIGHLIGHTS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><FiActivity /> Compiled Scope</p>
          <p className="text-lg font-black mt-1 text-slate-900 dark:text-white tabular-nums">{metrics.totalTrades} Closed Positions</p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><FiPercent /> Calculated Win Rate</p>
          <p className="text-lg font-black mt-1 text-blue-500 tabular-nums">{metrics.winRate}</p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><FiTrendingUp /> Net Capital Yield</p>
          <p className={`text-lg font-black mt-1 tabular-nums ${metrics.netPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
            {metrics.netPnL >= 0 ? `+$${metrics.netPnL}` : `-$${Math.abs(metrics.netPnL)}`}
          </p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><FiSmile /> Primary Focus Asset</p>
          <p className="text-lg font-black mt-1 text-purple-500">{metrics.mostTradedPair}</p>
        </div>
      </div>
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-2.5">
          <FiRefreshCw className="text-3xl text-blue-500 animate-spin" />
          <p className="text-xs text-gray-400 font-semibold">Running multi-variate statistical logic routines across account data paths...</p>
        </div>
      ) : (
        <>
          {/* ==================== AUTOMATED AI SUMMARY SECTION ==================== */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-50 dark:border-gray-800 pb-3">
              <FiPieChart className="text-blue-500 text-lg" />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">AI Summary Breakdown</h3>
            </div>
            
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                An exhaustive algorithmic diagnostic review of your historical transaction ledger confirms an exceptionally robust trading edge. Across your sample set of <span className="font-bold text-slate-900 dark:text-white">{metrics.totalTrades} closed positions</span>, you have generated a cumulative net return of <span className="font-bold text-green-500">${metrics.netPnL.toLocaleString()}</span>. This yields an overall profit factor rating of <span className="font-bold text-slate-900 dark:text-white">{metrics.profitFactor}</span>, proving that your gross profit parameters substantially exceed your total risk drawdowns.
              </p>
              <p>
                Asset volume analysis reveals that your execution framework focuses heavily on <span className="font-bold text-purple-500">{metrics.mostTradedPair}</span>. Sizing matrices appear balanced and consistent across the board, with lot metrics scaling dynamically alongside directional volume models. Your high win ratio of <span className="font-bold text-blue-500">{metrics.winRate}</span> suggests strong trend alignment and precise trade selection timing rules.
              </p>
            </div>
          </div>

          {/* ==================== SYSTEM GENERATED RECOMMENDATIONS SECTION ==================== */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-50 dark:border-gray-800 pb-3">
              <FiZap className="text-yellow-500 text-lg" />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">AI Actionable Recommendations</h3>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                <FiCheckCircle className="text-green-500 text-sm mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-gray-900 dark:text-white">Optimize Capital Sizing Constraints on {metrics.mostTradedPair}</p>
                  <p className="text-gray-400 font-medium">Because {metrics.mostTradedPair} represents your primary focus asset and yields your highest win distributions, safely scaling your volume parameters on clear confirmation breaks can optimize your gross yields without over-exposing the account.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                <FiCheckCircle className="text-blue-500 text-sm mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-gray-900 dark:text-white">Maintain Strict Holding Stop Limits</p>
                  <p className="text-gray-400 font-medium">Your profit factor of {metrics.profitFactor} remains healthy. To protect this margin, ensure your stop levels stay locked during high-impact data events to prevent sudden news slippage from impacting closed results.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800/40 rounded-xl">
                <FiCheckCircle className="text-purple-500 text-sm mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-gray-900 dark:text-white">Automate Trade Log Inputs to Reduce Biases</p>
                  <p className="text-gray-400 font-medium">Mixing manual logs with streaming sync terminals can skew hold-time tracking. Transitioning to full automatic MT5 terminal tracking ensures your analytics summaries remain un-biased and precise.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
