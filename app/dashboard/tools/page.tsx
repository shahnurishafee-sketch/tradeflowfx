"use client";

import { useState, useEffect } from "react";
import { FiSliders, FiClock, FiEye, FiGrid, FiCheckCircle, FiRefreshCw, FiCalendar } from "react-icons/fi";

export default function ToolsSuitePage() {
  // SUITE VIEW TAB CONTROL ENGINE
  const [activeToolTab, setActiveToolTab] = useState("CALCULATOR"); // CALCULATOR, SESSIONS, POV

  // POSITION SIZE CALCULATOR MATHEMATICAL STATE CONTAINERS
  const [accountBalance, setAccountBalance] = useState("10,000");
  const [riskPercent, setRiskPercentage] = useState(1); 
  const [stopLossPips, setStopLossPips] = useState("20");
  const [tradingPair, setTradingPair] = useState("XAUUSD");
  const [computedLotSize, setComputedLotSize] = useState<string | null>(null);
  const [computedCashRisk, setComputedCashRisk] = useState<string | null>(null);

  // FOREX SESSIONS REAL-TIME TIMER PARAMETERS
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [localizedClock, setLocalizedClock] = useState("");

  // AUTOMATED REAL-TIME CLOCK SYNC (Updates every single second)
  useEffect(() => {
    const updateSessionTimeLoop = () => {
      const now = new Date();
      setLocalizedClock(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: !is24HourFormat,
        })
      );
    };
    updateSessionTimeLoop();
    const intervalNode = setInterval(updateSessionTimeLoop, 1000);
    return () => clearInterval(intervalNode);
  }, [is24HourFormat]);

  // MATH HANDLER FOR POSITION SIZING CALCULATOR MODULE
  const handleCalculatePositionSize = () => {
    const cleanBalance = parseFloat(accountBalance.replace(/,/g, "")) || 0;
    const pips = parseFloat(stopLossPips) || 1;
    const cashRisked = cleanBalance * (riskPercent / 100);
    
    let pipValuePerLot = 10; 
    if (tradingPair === "EURUSD") pipValuePerLot = 10;
    if (tradingPair === "BTCUSD") pipValuePerLot = 1;

    const lotsResult = cashRisked / (pips * pipValuePerLot);

    setComputedCashRisk(cashRisked.toLocaleString(undefined, { minimumFractionDigits: 2 }));
    setComputedLotSize(lotsResult.toFixed(2));
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12">
      
      {/* ==================== 1. TOP SUITE NAVIGATION SELECTION BAR ==================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Trading Tools</h1>
          <p className="text-xs text-gray-400 mt-0.5">Access calculators, automation modules, and AI-powered utilities designed to improve your trading workflow</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-[#1e293b] p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[11px] font-bold text-gray-400">
          <button onClick={() => setActiveToolTab("CALCULATOR")} className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeToolTab === "CALCULATOR" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "hover:text-gray-600"}`}>
            <FiSliders /> Position Size Calculator
          </button>
          <button onClick={() => setActiveToolTab("SESSIONS")} className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeToolTab === "SESSIONS" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "hover:text-gray-600"}`}>
            <FiClock /> Forex Market Hours
          </button>
          <button onClick={() => setActiveToolTab("POV")} className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeToolTab === "POV" ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs" : "hover:text-gray-600"}`}>
            <FiEye /> Trader POV
          </button>
        </div>
      </div>
      {/* ==================== MODULE DESK VIEW A: POSITION SIZE CALCULATOR ==================== */}
      {activeToolTab === "CALCULATOR" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full text-xs font-semibold">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl space-y-2 shadow-2xs">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Account Balance</label>
              <div className="relative flex items-center bg-gray-50 dark:bg-[#1e293b]/40 rounded-xl border px-3">
                <span className="text-gray-400 font-bold text-sm">$</span>
                <input type="text" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className="w-full p-2.5 bg-transparent border-none text-sm text-gray-900 dark:text-white outline-none font-bold" />
              </div>
              <p className="text-[10px] text-gray-400 font-normal">Enter your trading account balance</p>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl space-y-4 shadow-2xs">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Risk Percentage</label>
                <span className="font-black text-slate-900 dark:text-white text-sm tabular-nums">${computedCashRisk || "0.00"}</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                <span>{riskPercent}%</span>
              </div>
              <input type="range" min="0.1" max="10" step="0.1" value={riskPercent} onChange={(e) => setRiskPercentage(parseFloat(e.target.value))} className="w-full accent-blue-500 cursor-pointer" />
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[0.5, 1, 2, 3, 5].map((pct) => (
                  <button key={pct} type="button" onClick={() => setRiskPercentage(pct)} className={`py-1.5 border rounded-lg transition-all text-[10px] font-bold cursor-pointer ${riskPercent === pct ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" : "border-gray-200 dark:border-gray-800 text-gray-400"}`}>{pct}%</button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl space-y-2 shadow-2xs">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Stop Loss Distance</label>
              <div className="relative flex items-center bg-gray-50 dark:bg-[#1e293b]/40 rounded-xl border px-3 justify-between">
                <input type="number" value={stopLossPips} onChange={(e) => setStopLossPips(e.target.value)} className="w-full p-2.5 bg-transparent border-none text-sm text-gray-900 dark:text-white outline-none font-bold" />
                <span className="text-gray-400 font-bold px-2 border-l">pips</span>
              </div>
              <p className="text-[10px] text-gray-400 font-normal">Distance from entry to stop loss in pips</p>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-5 rounded-2xl space-y-3 shadow-2xs">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Trading Instrument</label>
              <select value={tradingPair} onChange={(e) => setTradingPair(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50 dark:bg-[#1e293b] font-bold text-gray-900 dark:text-white outline-none">
                <option value="XAUUSD">XAUUSD</option> <option value="EURUSD">EURUSD</option> <option value="BTCUSD">BTCUSD</option>
              </select>
              <div className="p-2.5 bg-gray-50 dark:bg-[#1e293b]/60 border rounded-xl text-[10px] flex gap-4 font-bold text-gray-400">
                <span>Pip Value: $10/lot</span> <span>Pip Size: 0.01</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={handleCalculatePositionSize} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-xs">Calculate Position Size</button>
                <button type="button" onClick={() => { setAccountBalance("10,000"); setRiskPercentage(1); setStopLossPips("20"); setComputedLotSize(null); setComputedCashRisk(null); }} className="px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">Reset</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 h-full">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-2xs h-full flex flex-col justify-center min-h-[40vh] relative overflow-hidden">
              {computedLotSize === null ? (
                <div className="text-center space-y-4 my-auto">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-[#1e293b] border rounded-2xl flex items-center justify-center text-blue-500 mx-auto shadow-2xs"><FiSliders className="text-xl" /></div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Enter Your Parameters</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto font-normal leading-relaxed">Fill in your account balance, risk percentage, and stop loss to calculate your optimal position size.</p>
                  </div>
                  <div className="space-y-2 max-w-xs mx-auto pt-4 text-left font-normal text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex gap-2 items-center"><span className="text-blue-500 text-xs">✓</span> Most professionals risk 1-2% per trade</div>
                    <div className="flex gap-2 items-center"><span className="text-blue-500 text-xs">✓</span> Always define your stop loss before entering</div>
                    <div className="flex gap-2 items-center"><span className="text-blue-500 text-xs">✓</span> Position sizing is key to long-term survival</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 my-auto text-center">
                  <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block">Optimal Position Size</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-1 tabular-nums">{computedLotSize} <span className="text-sm font-bold text-gray-400">Lots</span></h2>
                  </div>
                  <div className="space-y-3 font-semibold text-gray-500 dark:text-gray-400 text-left">
                    <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800"><span>Instrument</span><span className="font-bold text-slate-900 dark:text-white">{tradingPair}</span></div>
                    <div className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-800"><span>Maximum Capital Loss</span><span className="font-bold text-red-500">-${computedCashRisk}</span></div>
                    <div className="flex justify-between py-1.5"><span>Risk Percentage</span><span className="font-bold text-blue-500">{riskPercent}%</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ==================== MODULE DESK VIEW B: FOREX MARKET HOURS ==================== */}
      {activeToolTab === "SESSIONS" && (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-2xs space-y-6 text-xs font-semibold">
          <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-4">
            <div>
              <h3 className="font-black text-base text-gray-900 dark:text-white">Forex Market Hours</h3>
              <p className="text-[11px] text-gray-400 font-medium">Track trading sessions across the globe in real-time</p>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1e293b] px-4 py-2 border rounded-xl">
              <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                <span>12h</span>
                <input type="checkbox" checked={is24HourFormat} onChange={() => setIs24HourFormat(!is24HourFormat)} className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer" />
                <span>24h</span>
              </div>
              <div className="flex items-center gap-2 border-l pl-4 font-black bg-blue-500 text-white text-sm p-1 px-3 rounded-lg tabular-nums shadow-xs">
                <FiClock className="animate-pulse" />
                <span>{localizedClock || "Syncing clock..."}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>
                <p className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2"><span>🇦🇺</span> Sydney</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">6:08 am • Sun Sep 6 AEDT (UTC +11)</p>
              </div>
              <div className="md:col-span-3 bg-gray-50 dark:bg-[#1e293b]/40 border h-7 rounded-xl relative overflow-hidden flex items-center">
                <span className="absolute left-4 text-[9px] uppercase tracking-wider text-red-400 dark:text-red-500 font-bold z-20 bg-white/80 dark:bg-slate-900/80 px-1 rounded">● Market Closed</span>
                <div className="absolute left-[5%] w-[35%] h-full bg-green-500/80 text-white flex items-center justify-center font-black text-[9px] uppercase tracking-widest shadow-inner">Sydney Session Open</div>
                <div className="absolute left-[70%] w-px h-full bg-green-600 z-10 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>
                <p className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2"><span>🇯🇵</span> Tokyo</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">4:08 am • Sun Sep 6 JST (UTC +9)</p>
              </div>
              <div className="md:col-span-3 bg-gray-50 dark:bg-[#1e293b]/40 border h-7 rounded-xl relative overflow-hidden flex items-center">
                <div className="absolute left-[15%] w-[35%] h-full bg-pink-500/80 text-white flex items-center justify-center font-black text-[9px] uppercase tracking-widest shadow-inner">Tokyo Session Open</div>
                <div className="absolute left-[70%] w-px h-full bg-green-600 z-10 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>
                <p className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2"><span>🇬🇧</span> London</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">7:08 pm • Sat Sep 5 GMT (UTC +0)</p>
              </div>
              <div className="md:col-span-3 bg-gray-50 dark:bg-[#1e293b]/40 border h-7 rounded-xl relative overflow-hidden flex items-center">
                <div className="absolute left-[40%] w-[35%] h-full bg-blue-500/80 text-white flex items-center justify-center font-black text-[9px] uppercase tracking-widest shadow-inner">London Session Open</div>
                <div className="absolute left-[70%] w-px h-full bg-green-600 z-10 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>
                <p className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2"><span>🇺🇸</span> New York</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">2:08 pm • Sat Sep 5 EST (UTC -5)</p>
              </div>
              <div className="md:col-span-3 bg-gray-50 dark:bg-[#1e293b]/40 border h-7 rounded-xl relative overflow-hidden flex items-center">
                <div className="absolute left-[58%] w-[35%] h-full bg-emerald-500/80 text-white flex items-center justify-center font-black text-[9px] uppercase tracking-widest shadow-inner">New York Session Open</div>
                <div className="absolute left-[70%] w-px h-full bg-green-600 z-10 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">⭐ Best Times to Trade</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-medium">
              <div className="bg-gray-50/50 dark:bg-[#1e293b]/20 p-4 border rounded-xl space-y-1">
                <span className="text-[9px] font-black uppercase text-green-500 bg-green-50 dark:bg-green-950/40 border px-1.5 py-0.5 rounded">Highest Volume</span>
                <p className="text-gray-400 text-[10px] mt-0.5">London + New York Overlap</p>
                <p className="font-black text-base text-gray-900 dark:text-white pt-1">5:00 pm - 9:00 pm</p>
                <p className="text-[11px] text-gray-400 font-normal leading-relaxed">Maximum liquidity, tightest spreads. Best for EURUSD, GBPUSD, USDJPY.</p>
              </div>
              <div className="bg-gray-50/50 dark:bg-[#1e293b]/20 p-4 border rounded-xl space-y-1">
                <span className="text-[9px] font-black uppercase text-blue-500 bg-blue-50 dark:bg-blue-950/40 border px-1.5 py-0.5 rounded">London Open</span>
                <p className="text-gray-400 text-[10px] mt-0.5">High Volatility Window</p>
                <p className="font-black text-base text-gray-900 dark:text-white pt-1">12:00 pm - 2:00 pm</p>
                <p className="text-[11px] text-gray-400 font-normal leading-relaxed">Day's first major expansion in volatility. Sets directional bias for EUR/GBP crosses.</p>
              </div>
              <div className="bg-gray-50/50 dark:bg-[#1e293b]/20 p-4 border rounded-xl space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-50 dark:bg-amber-950/40 border px-1.5 py-0.5 rounded">Tokyo Open</span>
                <p className="text-gray-400 text-[10px] mt-0.5">Best Asia Window</p>
                <p className="font-black text-base text-gray-900 dark:text-white pt-1">4:00 am - 7:00 am</p>
                <p className="text-[11px] text-gray-400 font-normal leading-relaxed">Strongest Asian session activity. Best for USD/JPY, EUR/JPY, AUD/USD, NZD/USD pairs.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ==================== MODULE DESK VIEW C: TRADER POV SHARE SYSTEM ==================== */}
      {activeToolTab === "POV" && (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-2xs space-y-6 text-xs font-semibold text-slate-900 dark:text-white">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-black text-base text-gray-900 dark:text-white">Trader POV</h3>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">Unlock live trading dashboards or share your performance with trusted peers</p>
            </div>
            <div className="flex bg-gray-100 dark:bg-[#1e293b] p-0.5 rounded-lg border text-[10px]">
              <button type="button" className="bg-white dark:bg-slate-800 px-3 py-1 rounded text-blue-500 font-bold shadow-2xs">View</button>
              <button type="button" className="px-3 py-1 text-gray-400 font-medium">Share</button>
            </div>
          </div>

          <div className="bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Shared Dashboards</label>
              <select className="w-full p-2 border rounded-xl bg-white dark:bg-[#0f172a] outline-none font-bold text-gray-700 dark:text-gray-300">
                <option value="select">Select dashboard</option> <option value="main">Main Core Matrix</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Account Scope</label>
              <select className="w-full p-2 border rounded-xl bg-white dark:bg-[#0f172a] outline-none font-bold text-gray-700 dark:text-gray-300">
                <option value="all">All accounts</option> <option value="mask">Mask Dollar Totals</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Enter Code Key</label>
              <input type="text" placeholder="VIEW-XXXXXX" className="w-full p-2 border rounded-xl bg-white dark:bg-[#0f172a] text-gray-800 dark:text-white font-bold outline-none uppercase text-center placeholder-gray-300" />
            </div>
            <button type="button" onClick={() => alert("Verification handshake deployed successfully!")} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer border-none outline-none shadow-xs">Unlock</button>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-bold text-gray-400 border-b pb-3">
            {["Overview", "Trades", "Performance", "Trade Analysis", "Journal", "AI Reports"].map((sub, i) => (
              <span key={i} className={`px-3 py-1 rounded-full border cursor-pointer ${i === 0 ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 text-blue-500" : "border-gray-100 dark:border-gray-800"}`}>{sub}</span>
            ))}
          </div>

          <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center flex flex-col justify-center items-center space-y-2.5 min-h-[30vh]">
            <div className="w-10 h-10 bg-blue-50 dark:bg-[#1e293b] border rounded-full flex items-center justify-center text-blue-500 shadow-2xs"><FiEye /></div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Select a shared dashboard</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto font-normal leading-relaxed">Choose a trader from the list above to load their live performance view.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
