"use client";

import { useState } from "react";
import { FiAward, FiTrendingUp, FiLayers, FiCalendar } from "react-icons/fi";

export default function LeaderboardPage() {
  // Live filter state engine
  const [timeframe, setTimeframe] = useState("This Week");

  // 1. TOP 3 PODIUM MASTER DATA STRUCTURE
  const [topThree] = useState([
    {
      rank: "2nd",
      badgeStyle: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
      name: "RJ Pindoria",
      handle: "@rjpindoria5859",
      account: "ROHIN",
      trades: 160,
      winRate: "84%",
      pnl: 10700.18,
      avatar: "https://unsplash.com"
    },
    {
      rank: "1st",
      badgeStyle: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
      name: "RJ Pindoria",
      handle: "@rjpindoria5859",
      account: "SAL ACC",
      trades: 23,
      winRate: "48%",
      pnl: 13135.80,
      avatar: "https://unsplash.com"
    },
    {
      rank: "3rd",
      badgeStyle: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/60",
      name: "RJ Pindoria",
      handle: "@rjpindoria5859",
      account: "NSL NN",
      trades: 112,
      winRate: "67%",
      pnl: 7493.60,
      avatar: "https://unsplash.com"
    }
  ]);

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12">
      
      {/* ==================== 1. TOP HEADER NAVIGATION STRIP ==================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Leaderboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Top performing traders ranked by profitability, consistency, and risk models</p>
        </div>

        {/* Timeframe selector row buttons exactly matching the snapshot blueprint */}
        <div className="flex bg-gray-100 dark:bg-[#1e293b] p-0.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-bold text-gray-400">
          {["Today", "This Week", "This Month", "This Year"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                timeframe === t 
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" 
                  : "hover:text-gray-600"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== 2. THE THREE HIGHEST RANKED PODIUM CONTAINER ==================== */}
      <div className="bg-amber-50/20 dark:bg-slate-900/20 border border-amber-100/40 dark:border-slate-800/40 rounded-2xl p-6 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
          
          {topThree.map((trader) => {
            const isFirst = trader.rank === "1st";
            return (
              <div 
                key={trader.rank}
                className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 text-center flex flex-col justify-between shadow-xs transition-transform duration-200 relative ${
                  isFirst 
                    ? "md:scale-105 border-amber-400 dark:border-amber-500/60 shadow-md ring-4 ring-amber-400/5 dark:ring-amber-500/5 order-first md:order-none" 
                    : "order-last"
                }`}
              >
                {/* Ranking Tag Icon Ribbon */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider shadow-sm bg-white dark:bg-[#0f172a]">
                  <span>{isFirst ? "👑" : "🥈"}</span>
                  <span className="text-gray-900 dark:text-white">{trader.rank} Place</span>
                </div>

                <div className="space-y-3 mt-2">
                  {/* Avatar Profile Frame */}
                  <div className="relative w-14 h-14 mx-auto">
                    <img src={trader.avatar} alt={trader.name} className="w-full h-full rounded-full object-cover border-2 border-blue-500" />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-[#0f172a]"></span>
                  </div>

                  {/* Metadata Summary Details */}
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{trader.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{trader.handle}</p>
                    <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-1 font-bold">{trader.account}</p>
                  </div>
                </div>

                {/* Performance split parameters row */}
                <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 dark:border-gray-800 py-2.5 my-4 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                  <div className="border-r pr-2">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Trades</p>
                    <p className="font-black text-gray-900 dark:text-white mt-0.5">{trader.trades}</p>
                  </div>
                  <div className="pl-1">
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Win Rate</p>
                    <p className="font-black text-gray-900 dark:text-white mt-0.5">{trader.winRate}</p>
                  </div>
                </div>

                {/* Profit Figures Element */}
                <div className="text-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Net Yield</span>
                  <span className="text-lg font-black text-green-500 mt-0.5 block tabular-nums">
                    +${trader.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </div>
      {/* ==================== 3. UNIFIED CHRONOLOGICAL RANKINGS DATA GRID ==================== */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] text-xs">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 uppercase font-black text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="pb-3 pl-4 font-bold w-20">Rank</th>
                <th className="pb-3 font-bold">Trader Profile Details</th>
                <th className="pb-3 font-bold text-center w-28">Trades Logged</th>
                <th className="pb-3 font-bold text-center w-28">Win Rate Ratio</th>
                <th className="pb-3 font-bold text-right pr-4 w-36">Total Profit Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/40 font-semibold text-gray-700 dark:text-gray-300">
              {[
                { rank: "#4", name: "yash bhalla", handle: "@yashbhalla9230", account: "Exness 213600406", trades: 9, winRate: "67%", pnl: 6059.32, avatar: "Y" },
                { rank: "#5", name: "Parth Zalavadiya", handle: "@parthzalavadiya", account: "FPTradingLLC 82368066", trades: 12, winRate: "50%", pnl: 1947.26, avatar: "P" },
                { rank: "#6", name: "Dhruv Patel", handle: "@dhruvpatel6671", account: "GTCGlobalSA 52098622", trades: 12, winRate: "92%", pnl: 1466.00, avatar: "D" },
                { rank: "#7", name: "Falcon faiz", handle: "@falconfaiz911", account: "Exness 213239133", trades: 14, winRate: "50%", pnl: 1153.53, avatar: "F" },
                { rank: "#8", name: "Keyur Bhalala", handle: "@keyurbhalala6711", account: "FortressFX 70138026", trades: 36, winRate: "33%", pnl: 808.49, avatar: "K" },
                { rank: "#9", name: "ParidaFX", handle: "@paridafx", account: "FortressFX Dubai Maxxing", trades: 3, winRate: "100%", pnl: 666.70, avatar: "P" },
                { rank: "#10", name: "Saikrishna", handle: "@saikrishna9036", account: "Exness 257465839", trades: 12, winRate: "67%", pnl: 560.40, avatar: "S" }
              ].map((row) => (
                <tr key={row.rank} className="hover:bg-gray-50/50 dark:hover:bg-[#1e293b]/10 transition-colors">
                  {/* Rank identifier */}
                  <td className="py-4 pl-4 font-black text-gray-400 dark:text-gray-500 tabular-nums">{row.rank}</td>
                  
                  {/* Trader identity metrics row */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shadow-2xs">
                        {row.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-gray-900 dark:text-white leading-none">{row.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{row.handle}</p>
                        <p className="text-[9px] text-gray-400 font-normal uppercase tracking-wide">{row.account}</p>
                      </div>
                    </div>
                  </td>

                  {/* Operational statistical columns parameters map layout */}
                  <td className="py-4 text-center text-gray-600 dark:text-gray-400 font-bold tabular-nums">{row.trades}</td>
                  <td className="py-4 text-center text-gray-600 dark:text-gray-400 font-bold tabular-nums">{row.winRate}</td>
                  
                  {/* Profit Result Display column */}
                  <td className="py-4 text-right pr-4 font-black text-green-500 tabular-nums">
                    +${row.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
