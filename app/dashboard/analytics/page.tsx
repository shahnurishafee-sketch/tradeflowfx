"use client";

import { useState } from "react";
import { FiTrendingUp, FiActivity, FiPercent, FiAward, FiCalendar, FiClock } from "react-icons/fi";

export default function PerformanceAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30 Days");
  const [tradeFilter, setTradeFilter] = useState("All Trades");

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Performance Analytics</h1>
          <p className="text-sm text-green-500 font-semibold mt-0.5">✓ Full Enterprise Audit Access Unlocked</p>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Profile P&L</p>
          <h2 className="text-2xl font-black text-green-500 mt-2">+$4,821.50</h2>
          <p className="text-[11px] text-gray-400 mt-1">Calculated across 42 total executions</p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Calculated Win Rate</p>
          <h2 className="text-2xl font-black text-blue-500 mt-2">64.2%</h2>
          <p className="text-[11px] text-gray-400 mt-1">27 profitable • 15 deficit logs</p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Profit Factor Matrix</p>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-2">2.14</h2>
          <p className="text-[11px] text-green-500 font-semibold mt-1">✓ Excellent alpha generation metrics</p>
        </div>
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Expectancy</p>
          <h2 className="text-2xl font-black text-purple-500 mt-2">+$114.80</h2>
          <p className="text-[11px] text-gray-400 mt-1">Expected return index score per position</p>
        </div>
      </div>

      {/* Metrics Row List */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs text-xs">
        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Complete Audit Metrics Parameters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 font-semibold">
          <div className="space-y-2.5">
            {[
              { l: "Total Net Profit Margin", v: "$4,821.50" }, { l: "Average Daily Yield Volume", v: "1.24 Lots" },
              { l: "Average Winning Position Return", v: "+$340.00" }, { l: "Average Losing Position Deficit", v: "-$182.00" },
              { l: "Total Commissions Paid out", v: "-$105.00" }, { l: "Total Swap Financing Fees", v: "-$32.50" }
            ].map((el, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-gray-800/40">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{el.l}</span><span className="font-bold text-gray-900 dark:text-white">{el.v}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            {[
              { l: "Total Active Connected Trading Days", v: "18 Days" }, { l: "Profitable Closed Days Count", v: "12 Days" },
              { l: "Max Consecutive Profit Cycles", v: "5 Days" }, { l: "Max Consecutive Deficit Cycles", v: "2 Days" },
              { l: "Max Peak-to-Trough Drawdown Depth", v: "-$420.00" }, { l: "Max Drawdown Percentage Ratio", v: "3.24%" }
            ].map((el, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-gray-800/40">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{el.l}</span><span className="font-bold text-gray-900 dark:text-white">{el.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
