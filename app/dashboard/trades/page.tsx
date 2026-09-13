"use client";

import { useState, useRef, useEffect } from "react";
import { FiSliders, FiPlus, FiLink, FiDownload, FiSearch, FiCheck } from "react-icons/fi";

export default function TradesPage() {
  const [trades] = useState([
    { id: 1, pair: "XAUUSD", type: "Buy", entry: "2430.5", exit: "2450.2", size: "0.10", pnl: 195, date: "2024-06-01", source: "MT5 Sync" },
    { id: 2, pair: "NAS100", type: "Sell", entry: "18900", exit: "18840", size: "1.00", pnl: 120, date: "2024-06-02", source: "MT5 Sync" },
    { id: 3, pair: "BTCUSD", type: "Buy", entry: "61000", exit: "61200", size: "0.05", pnl: 200, date: "2024-06-03", source: "Manual" },
    { id: 4, pair: "XAUUSD", type: "Sell", entry: "2440", exit: "2430", size: "0.20", pnl: -100, date: "2024-06-04", source: "MT5 Sync" },
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL"); 
  const [selectedSort, setSelectedSort] = useState("NEWEST"); 
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => { if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilters(false); };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const filteredTrades = trades
    .filter(t => (t.pair.toLowerCase().includes(searchQuery.toLowerCase())) && (selectedType === "ALL" || t.type.toUpperCase() === selectedType))
    .sort((a, b) => {
      if (selectedSort === "NEWEST") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (selectedSort === "PNL_HIGH") return b.pnl - a.pnl;
      return 0;
    });

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trades Log</h1>
          <div className="flex items-center gap-1.5 mt-1"><span className="w-2 h-2 rounded-full bg-green-500 block"></span><span className="text-xs font-semibold text-green-500">Connected Terminal Active</span></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gray-100 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 cursor-pointer"><FiDownload /> Export Full History ({filteredTrades.length})</button>
          <button onClick={() => { const e = new CustomEvent("openModalChannel", { detail: "addTrade" }); window.dispatchEvent(e); }} className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white cursor-pointer"><FiPlus /> Add Manual Position</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-4 relative">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Complete Archive Matrix</h3>
          <div ref={filterRef} className="relative">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer"><FiSliders /> Sort & Filter</button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1e293b] border rounded-xl shadow-2xl p-4 z-40 space-y-4 text-slate-900 dark:text-white">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Search Symbol</label>
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g., XAUUSD..." className="w-full text-xs p-2 rounded-md border bg-gray-50 dark:bg-[#0f172a] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Direction</label>
                  <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-[#0f172a] p-0.5 rounded-md">
                    {["ALL", "BUY", "SELL"].map(dir => (
                      <button key={dir} onClick={() => setSelectedType(dir)} className={`text-[10px] font-bold py-1 rounded cursor-pointer ${selectedType === dir ? "bg-blue-600 text-white shadow-xs" : "text-gray-400"}`}>{dir}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] text-xs">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 uppercase font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="pb-3 pl-2">Execution Date</th><th>Symbol</th><th>Type</th><th>Entry</th><th>Exit</th><th>Lots</th><th>P&L ($)</th><th>Terminal Connection Source</th>
              </tr>
            </thead>
            <tbody className="divide-y font-semibold text-gray-700 dark:text-gray-300">
              {filteredTrades.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1e293b]/10 transition-colors">
                  <td className="py-4 pl-2 text-gray-400">{item.date}</td><td className="py-4 font-bold text-gray-900 dark:text-white">{item.pair}</td><td><span className={`px-2 py-0.5 rounded text-[10px] font-black ${item.type === "Buy" ? "bg-green-100 text-green-600 dark:bg-green-950/40" : "bg-red-100 text-red-600 dark:bg-red-950/40"}`}>{item.type.toUpperCase()}</span></td><td>{item.entry}</td><td>{item.exit}</td><td>{item.size}</td><td className={`font-bold ${item.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>{item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}</td><td className="text-gray-400">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
