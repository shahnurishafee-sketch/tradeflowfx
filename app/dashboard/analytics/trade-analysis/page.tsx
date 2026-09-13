"use client";

import { useState } from "react";
import { FiTrendingUp, FiSearch, FiCalendar, FiSliders, FiActivity, FiTag, FiBarChart2 } from "react-icons/fi";

export default function TradeAnalysisPage() {
  // Filtering & Selection Engine States
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, WINNERS, LOSERS, BE
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("This Month");
  const [sortOrder, setSortOrder] = useState("Date");
  const [selectedTrade, setSelectedTrade] = useState<any | null>(null);

  // Mock array parameters matching the Trade Analysis list rows
  const [trades] = useState([
    { id: "T201", pair: "XAUUSD", type: "BUY", size: "0.10", pnl: 145.20, date: "2026-09-04", entry: "2440.50", exit: "2455.00", duration: "2h 15m" },
    { id: "T202", pair: "NAS100", type: "SELL", size: "1.00", pnl: -320.00, date: "2026-09-03", entry: "18900.00", exit: "18932.00", duration: "45m" },
    { id: "T203", pair: "EURUSD", type: "BUY", size: "0.50", pnl: 0.00, date: "2026-09-02", entry: "1.08520", exit: "1.08520", duration: "1h 10m" },
  ]);

  // Slicing filters computation loops matching left view selectors
  const filteredTrades = trades.filter((t) => {
    const matchesSearch = t.pair.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === "WINNERS") matchesTab = t.pnl > 0;
    if (activeTab === "LOSERS") matchesTab = t.pnl < 0;
    if (activeTab === "BE") matchesTab = t.pnl === 0;

    return matchesSearch && matchesTab;
  });

  const winnersCount = trades.filter((t) => t.pnl > 0).length;
  const losersCount = trades.filter((t) => t.pnl < 0).length;
  const beCount = trades.filter((t) => t.pnl === 0).length;

  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100 min-h-[80vh]">
      
      {/* 1. TOP TITLE HEADER HEADER SUB-STRIP */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trade Analysis</h1>
        <p className="text-xs text-gray-400 mt-0.5">Sat, Sep 5</p>
      </div>

      {/* 2. MAIN WORKSPACE CONTAINER SIDE SPLIT CARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full">
        
        {/* ==================== LEFT SIDEBAR GRID: TICKETS SELECTOR ==================== */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-4 space-y-4 shadow-xs">
          
          {/* Header Title inside list panel */}
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Trade Analysis</h3>
          </div>

          {/* Outcome Toggle Selector Tabs precisely matching the blueprint */}
          <div className="flex flex-wrap gap-1 bg-gray-50 dark:bg-[#1e293b] p-0.5 rounded-lg border border-gray-100 dark:border-gray-800 text-[10px] font-bold">
            <button onClick={() => setActiveTab("ALL")} className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${activeTab === "ALL" ? "bg-blue-600 text-white shadow-xs" : "text-gray-400"}`}>
              All <span className="opacity-70 ml-0.5">{trades.length}</span>
            </button>
            <button onClick={() => setActiveTab("WINNERS")} className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${activeTab === "WINNERS" ? "bg-white dark:bg-slate-800 text-green-500 shadow-xs" : "text-gray-400"}`}>
              Winners <span className="opacity-70 ml-0.5">{winnersCount}</span>
            </button>
            <button onClick={() => setActiveTab("LOSERS")} className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${activeTab === "LOSERS" ? "bg-white dark:bg-slate-800 text-red-500 shadow-xs" : "text-gray-400"}`}>
              Losers <span className="opacity-70 ml-0.5">{losersCount}</span>
            </button>
            <button onClick={() => setActiveTab("BE")} className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${activeTab === "BE" ? "bg-white dark:bg-slate-800 text-gray-500 shadow-xs" : "text-gray-400"}`}>
              BE <span className="opacity-70 ml-0.5">{beCount}</span>
            </button>
          </div>

          {/* Search symbol lookup input */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-2.5 text-gray-400 text-xs" />
            <input 
              type="text" 
              placeholder="Search symbol..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/40 text-gray-900 dark:text-white outline-none"
            />
          </div>

          {/* Dynamic Selection Sub-Dropdowns Filter Blocks */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-400">
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] outline-none">
              <option value="This Month">This Month</option> <option value="Last 30 Days">Last 30 Days</option> <option value="All Time">All Time</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b] outline-none">
              <option value="Date">Order: Date</option> <option value="PnL">Order: P&L</option> <option value="Volume">Order: Size</option>
            </select>
          </div>

          {/* List Entries Display Rendering Layout Block */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {filteredTrades.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <FiActivity className="text-xl opacity-40 mb-1" />
                <p className="text-[11px] font-medium">No trades found</p>
              </div>
            ) : (
              filteredTrades.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTrade(t)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                    selectedTrade?.id === t.id 
                      ? "border-blue-500 bg-blue-50/30 dark:bg-blue-950/20" 
                      : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1e293b]/40"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{t.pair}</span>
                      <span className={`text-[9px] font-black px-1 rounded ${t.type === "BUY" ? "bg-green-100 text-green-600 dark:bg-green-950/40" : "bg-red-100 text-red-600 dark:bg-red-950/40"}`}>{t.type}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1"><FiCalendar /> {t.date} • {t.size} Lots</p>
                  </div>
                  <p className={`text-xs font-bold ${t.pnl > 0 ? "text-green-500" : t.pnl < 0 ? "text-red-500" : "text-gray-400"}`}>
                    {t.pnl > 0 ? `+$${t.pnl}` : t.pnl < 0 ? `-$${Math.abs(t.pnl)}` : "$0.00"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        {/* ==================== RIGHT PANEL: DETAILED METRICS METRICS VIEW ==================== */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 min-h-[60vh] flex flex-col shadow-xs">
          {!selectedTrade ? (
            /* EMPTY LAYOUT VIEW PATTERN FROM SNAPSHOT */
            <div className="flex flex-col items-center justify-center m-auto text-center space-y-4 py-12">
              <div className="w-14 h-12 bg-blue-50 dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-blue-500 shadow-xs">
                <FiBarChart2 className="text-2xl" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Select a trade to analyze</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Choose a trade from the list to view detailed analysis, performance metrics, and insights.
                </p>
              </div>
            </div>
          ) : (
            /* DYNAMIC ACTIVE TRADING ANALYTICS EVALUATION METRIC VIEW */
            <div className="space-y-6 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{selectedTrade.pair} Analytics</h4>
                    <span className="text-[10px] text-gray-400 font-bold">Ticket Ref: {selectedTrade.id}</span>
                  </div>
                  <button onClick={() => setSelectedTrade(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-xs">✕ Close View</button>
                </div>

                {/* Parameters matrix cards layout row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-gray-50/50 dark:bg-[#1e293b]/40 rounded-xl border">
                    <p className="text-gray-400 font-medium">Net P&L Result</p>
                    <p className={`text-base font-black mt-1 ${selectedTrade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>{selectedTrade.pnl >= 0 ? `+$${selectedTrade.pnl}` : `-$${Math.abs(selectedTrade.pnl)}`}</p>
                  </div>
                  <div className="p-3 bg-gray-50/50 dark:bg-[#1e293b]/40 rounded-xl border">
                    <p className="text-gray-400 font-medium">Entry Execution</p>
                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">{selectedTrade.entry}</p>
                  </div>
                  <div className="p-3 bg-gray-50/50 dark:bg-[#1e293b]/40 rounded-xl border">
                    <p className="text-gray-400 font-medium">Exit Value Target</p>
                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">{selectedTrade.exit}</p>
                  </div>
                  <div className="p-3 bg-gray-50/50 dark:bg-[#1e293b]/40 rounded-xl border">
                    <p className="text-gray-400 font-medium">Position Duration</p>
                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">{selectedTrade.duration}</p>
                  </div>
                </div>

                {/* Insight Analytics placeholder panel */}
                <div className="space-y-2 border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50/30 dark:bg-transparent">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5"><FiSliders className="text-blue-500" /> Advanced Execution Metrics</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-medium text-gray-500 dark:text-gray-400 pt-1">
                    <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60"><span>Slippage Deductions</span><span className="font-bold text-slate-900 dark:text-white">0.0 pips</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60"><span>Max Favorable Excursion (MAE)</span><span className="font-bold text-green-500">+$240.00</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60"><span>Commissions Allocation</span><span className="font-bold text-slate-900 dark:text-white">-$2.50</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60"><span>Max Adverse Excursion (MFE)</span><span className="font-bold text-red-500">-$45.00</span></div>
                  </div>
                </div>

                {/* Algorithmic Trade Rating Review */}
                <div className="space-y-2 border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50/30 dark:bg-transparent">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5"><FiTag className="text-purple-500" /> Platform Behavioral Rules Assessment</h5>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    This order was executed in compliance with your standard risk management profiles. Sizing fits underneath your 1% ceiling parameter limit, and terminal execution timestamps show no high-impact economic calendar macro conflicts.
                  </p>
                </div>
              </div>

              {/* Back to index trigger action button */}
              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <button onClick={() => setSelectedTrade(null)} className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-gray-800 font-bold rounded-lg transition-colors cursor-pointer">
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
