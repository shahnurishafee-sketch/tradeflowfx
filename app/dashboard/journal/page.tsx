"use client";

import { useState } from "react";
import { FiBookOpen, FiSearch, FiCalendar, FiTrendingUp, FiTag, FiEdit3, FiImage } from "react-icons/fi";

export default function JournalPage() {
  // Local state layout configuration simulating trade log entries
  const [activeTab, setActiveTypeTab] = useState("ALL"); // ALL, JOURNALED, PENDING
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<any | null>(null);

  // Mock static entry items mapping out positions available for journaling
  const [trades, setTrades] = useState([
    { id: "T104", pair: "XAUUSD", type: "BUY", date: "2026-09-04", status: "Pending", size: "0.10", entry: "2440.5", exit: "2455.2", pnl: 147, notes: "", tags: "" },
    { id: "T103", pair: "NAS100", type: "SELL", date: "2026-09-03", status: "Journaled", size: "1.00", entry: "18900", exit: "18820", pnl: 800, notes: "Followed daily supply zone breakout criteria perfectly.", tags: "Breakout, Trend" },
    { id: "T102", pair: "BTCUSD", type: "BUY", date: "2026-09-01", status: "Pending", size: "0.05", entry: "61000", exit: "60850", pnl: -75, notes: "", tags: "" },
  ]);

  // Temporary editable state forms for the right panel editor workspace
  const [editingNotes, setEditingNotes] = useState("");
  const [editingTags, setEditingTags] = useState("");

  const handleSelectTrade = (trade: any) => {
    setSelectedTrade(trade);
    setEditingNotes(trade.notes);
    setEditingTags(trade.tags);
  };

  const handleSaveJournalEntry = () => {
    if (!selectedTrade) return;
    setTrades(prev => prev.map(t => t.id === selectedTrade.id ? { ...t, notes: editingNotes, tags: editingTags, status: "Journaled" } : t));
    setSelectedTrade(prev => ({ ...prev, notes: editingNotes, tags: editingTags, status: "Journaled" }));
    alert("Journal details updated successfully!");
  };

  // Internal search and filter array slicing computations
  const filteredTrades = trades.filter(t => {
    const matchesSearch = t.pair.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "ALL" || t.status.toUpperCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const journaledCount = trades.filter(t => t.status === "Journaled").length;
  const pendingCount = trades.filter(t => t.status === "Pending").length;

  return (
    <div className="flex flex-col gap-4 text-slate-900 dark:text-slate-100 min-h-[80vh]">
      
      {/* PAGE BANNER HEADER SUB-STRIP */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Journal</h1>
        <p className="text-xs text-gray-400 mt-0.5">Sat, Sep 5</p>
      </div>

      {/* TWO-COLUMN SIDE-BY-SIDE SPLIT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full">
        
        {/* ==================== LEFT SIDEBAR PANEL: TRADE LIST ==================== */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-4 space-y-4 shadow-xs">
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Trade Journal</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">{journaledCount} journaled in selection window</p>
          </div>

          {/* Sub-tab selection row mapping numbers */}
          <div className="flex gap-1 bg-gray-50 dark:bg-[#1e293b] p-0.5 rounded-lg border border-gray-100 dark:border-gray-800 text-[10px] font-bold">
            <button onClick={() => setActiveTypeTab("ALL")} className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${activeTab === "ALL" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "text-gray-400"}`}>
              All <span className="ml-0.5 opacity-60">({trades.length})</span>
            </button>
            <button onClick={() => setActiveTypeTab("JOURNALED")} className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${activeTab === "JOURNALED" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "text-gray-400"}`}>
              Journaled <span className="ml-0.5 opacity-60">({journaledCount})</span>
            </button>
            <button onClick={() => setActiveTypeTab("PENDING")} className={`flex-1 py-1.5 rounded transition-all cursor-pointer ${activeTab === "PENDING" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "text-gray-400"}`}>
              Pending <span className="ml-0.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 px-1 rounded-xs">({pendingCount})</span>
            </button>
          </div>

          {/* Search bar inside list box */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-2.5 text-gray-400 text-xs" />
            <input 
              type="text" 
              placeholder="Search symbol..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1e293b] bg-gray-50 dark:bg-[#1e293b]/40 text-gray-900 dark:text-white outline-none"
            />
          </div>

          {/* Render List Array Loop */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {filteredTrades.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-8">No trades match this period</p>
            ) : (
              filteredTrades.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => handleSelectTrade(t)}
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
                    <p className="text-[10px] text-gray-400 flex items-center gap-1"><FiCalendar /> {t.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className={`text-xs font-bold ${t.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>{t.pnl >= 0 ? `+$${t.pnl}` : `-$${Math.abs(t.pnl)}`}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${t.status === "Journaled" ? "bg-gray-100 dark:bg-gray-800 text-gray-400" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"}`}>{t.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* ==================== RIGHT PANEL: DETAILED JOURNAL EDITOR ==================== */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 min-h-[60vh] flex flex-col shadow-xs">
          {!selectedTrade ? (
            /* EMPTY VIEW STATE PLACEHOLDER */
            <div className="flex flex-col items-center justify-center m-auto text-center space-y-4 py-12">
              <div className="w-14 h-12 bg-blue-50 dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-blue-500">
                <FiBookOpen className="text-2xl" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Select a trade to journal</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Click on any trade from the list to view and edit your detailed notes, screenshots, and trading insights.
                </p>
              </div>
            </div>
          ) : (
            /* ACTIVE JOURNALING EDITOR INTERFACE WORKSPACE */
            <div className="space-y-6 flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-5">
                {/* Active Selection Banner strip metadata summary */}
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{selectedTrade.pair} Execution Log</h4>
                    <span className="text-[10px] text-gray-400 font-semibold">ID: {selectedTrade.id}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedTrade.pnl >= 0 ? "bg-green-100 text-green-600 dark:bg-green-950/40" : "bg-red-100 text-red-600 dark:bg-red-950/40"}`}>
                    {selectedTrade.pnl >= 0 ? `Net Profit: +$${selectedTrade.pnl}` : `Net Loss: -$${Math.abs(selectedTrade.pnl)}`}
                  </span>
                </div>

                {/* Technical data indicators parameters map layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 dark:bg-[#1e293b]/30 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div><p className="text-gray-400 font-medium">Position Size</p><p className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedTrade.size} Lots</p></div>
                  <div><p className="text-gray-400 font-medium">Position Direction</p><p className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedTrade.type}</p></div>
                  <div><p className="text-gray-400 font-medium">Entry Target</p><p className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedTrade.entry}</p></div>
                  <div><p className="text-gray-400 font-medium">Exit Value</p><p className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedTrade.exit}</p></div>
                </div>

                {/* Text Notes Rich Editor Segment */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><FiEdit3 /> Trading Notes & Psychology Observation</label>
                  <textarea 
                    rows={6}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Describe your market analysis context, psychological state, setup triggers, or errors..."
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b]/40 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none font-medium leading-relaxed"
                  />
                </div>

                {/* Classification Tags Separator Field Input */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><FiTag /> Strategy Classification Tags</label>
                  <input 
                    type="text"
                    value={editingTags}
                    onChange={(e) => setEditingTags(e.target.value)}
                    placeholder="e.g., SupportBounce, Breakout, FVG_Mitigation (comma separated)"
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b]/40 text-gray-900 dark:text-white outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                {/* Screenshot Attachment placeholder card frame mockup */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><FiImage /> Setup Screenshot Capture</label>
                  <div className="border border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-transparent">
                    <p className="text-gray-400 font-semibold">Drop charts image files here or click to browse files</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPG (Max 5MB sizing constraints)</p>
                  </div>
                </div>
              </div>

              {/* Submission Save Operations Button element row */}
              <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                <button 
                  onClick={() => setSelectedTrade(null)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveJournalEntry}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Journal Entry
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
