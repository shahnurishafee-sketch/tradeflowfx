"use client";

import ConnectAccountModal from "@/components/ConnectAccountModal";
import { useState, useEffect } from "react";
import { 
  FiActivity, FiPieChart, FiFolder, FiCheckCircle, FiClock, 
  FiCalendar, FiChevronLeft, FiChevronRight, FiUser, FiArrowRight 
} from "react-icons/fi";

export default function MainDashboardPage() {
  // Functional states for filtering timelines and changing calendar views
  const [chartPeriod, setChartPeriod] = useState("1M");
  const [currentDate, setCurrentDate] = useState(new Date()); 
  
  // DYNAMIC STATES TO LOAD LIVE DATABASE PERFORMANCE DATA
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  // --- 🟢 LIVE ACCOUNT STREAM POLLING MACHINE HOOKS ---
  const [liveBalance, setLiveBalance] = useState<number>(0);
  const [liveEquity, setLiveEquity] = useState<number>(0);
  
  // DYNAMIC: Dynamically tracks the active user's broker ID automatically
  const [activeLoginId, setActiveLoginId] = useState<string | null>(null);

  // Fetch performance data from your metrics API route handler
  const loadPortfolioData = async () => {
    try {
      // 1. Pull core analytics dashboard summary blocks
      const res = await fetch("/api/dashboard/metric");
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
        
        // DYNAMIC FIX: Instantly captures the logged-in user's account number from your API
        if (data?.accountNumber || data?.metrics?.accountNumber) {
          setActiveLoginId(String(data.accountNumber || data.metrics.accountNumber));
        }
      }

      // 2. Fetch live balance parameters directly from the container bridge
      if (activeLoginId) {
        const metricsRes = await fetch(`/api/account-metrics?loginId=${activeLoginId}`);
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          if (metricsData && !metricsData.error) {
            setLiveBalance(metricsData.balance || 0);
            setLiveEquity(metricsData.equity || 0);
          }
        }
      }
    } catch (err) {
      console.error("Failed to stream live account metrics data layers:", err);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  // Run the data stream fetch call instantly on load, then poll every 5 seconds
  useEffect(() => {
    loadPortfolioData();
    const metricsPollingLoop = setInterval(loadPortfolioData, 5000);
    return () => clearInterval(metricsPollingLoop);
  }, [activeLoginId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Logic to transition months backward and forward smoothly
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  // Automatically calculates total days in selected month to resize calendar layout
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Helper logic to switch timeline axis text fluidly
  const getTimelineLabels = () => {
    switch (chartPeriod) {
      case "1D":
        return ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "11 PM"];
      case "1W":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "3M":
        return ["Jun", "Jul", "Aug", "Sep"];
      case "ALL":
        return [
          String(currentDate.getFullYear() - 2),
          String(currentDate.getFullYear() - 1),
          String(currentDate.getFullYear())
        ];
      case "1M":
      default:
        return ["Day 1", "Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30"];
    }
  };

  return (
    <div className="space-y-5 text-slate-900 dark:text-slate-100 min-h-screen pb-12 text-xs font-semibold">
      
      {/* HEADER BAR TRACKER */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Real-time overview of your portfolio metrics</p>
        </div>
        
        {/* THE ACTION TRIGGER BUTTON */}
        <button 
          type="button" 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shrink-0 self-start sm:self-auto"
        >
          + Connect Real Account
        </button>
      </div>

      {/* ==================== 1. FOUR METRICS CARDS ROW GRID ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL P&L CARD */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-base shrink-0">
            <FiPieChart />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Total P&L</p>
            <p className={`text-lg font-black tabular-nums ${dashboardData?.metrics?.totalPl < 0 ? "text-red-500" : "text-emerald-500"}`}>
              {isLoadingMetrics ? "..." : dashboardData?.metrics?.totalPl !== undefined 
                ? `$${dashboardData.metrics.totalPl.toFixed(2)}`
                : "$0.00"}
            </p>
            <p className="text-[10px] text-gray-400 font-normal">
              → {isLoadingMetrics ? "..." : dashboardData?.metrics?.totalTrades || 0} historical trades logged
            </p>
          </div>
        </div>

        {/* UNREALIZED P&L CARD */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-base shrink-0">
            <FiActivity />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Unrealized (Floating)</p>
            <p className="text-lg font-black text-gray-900 dark:text-white tabular-nums">
              {isLoadingMetrics ? "..." : liveBalance !== 0 
                ? `$${(liveEquity - liveBalance).toFixed(2)}` 
                : `$${dashboardData?.metrics?.unrealized?.toFixed(2) || "0.00"}`}
            </p>
            <p className="text-[10px] text-gray-400 font-normal">
              Active Positions: {isLoadingMetrics ? "..." : liveBalance !== 0 && (liveEquity - liveBalance !== 0) ? 1 : 0}
            </p>
          </div>
        </div>
        {/* REALIZED P&L CARD */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-base shrink-0">
            <FiFolder />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Realized Net</p>
            <p className={`text-lg font-black tabular-nums ${dashboardData?.metrics?.realized < 0 ? "text-red-500" : "text-emerald-500"}`}>
              {isLoadingMetrics ? "..." : liveBalance !== 0 
                ? `$${liveBalance.toFixed(2)}` 
                : dashboardData?.metrics?.realized !== undefined
                  ? `$${dashboardData.metrics.realized.toFixed(2)}`
                  : "$0.00"}
            </p>
            <p className="text-[10px] text-gray-400 font-normal">Linked Account Metrics</p>
          </div>
        </div>

        {/* WIN RATE CARD */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] p-4 rounded-xl shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-base shrink-0">
            <FiCheckCircle />
          </div>
          <div className="space-y-0.5 flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Win Rate</p>
            <p className="text-lg font-black text-gray-900 dark:text-white tabular-nums">
              {isLoadingMetrics ? "..." : `${dashboardData?.metrics?.winRate || 0}%`}
            </p>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded-full mt-1 overflow-hidden">
              <div 
                className="bg-purple-500 h-full transition-all duration-500" 
                style={{ width: `${dashboardData?.metrics?.winRate || 0}%` }}
              />
            </div>
          </div>
        </div>

      </div>
      {/* ==================== 2. MAIN WIDE PERFORMANCE GRAPH AREA ==================== */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block flex items-center gap-1">
              <FiActivity className="text-blue-500" /> PERFORMANCE ({chartPeriod})
            </span>
            <h2 className={`text-3xl font-black tracking-tight tabular-nums ${dashboardData?.metrics?.totalPl < 0 ? "text-red-500" : "text-emerald-500"}`}>
              {isLoadingMetrics ? "..." : liveBalance !== 0 
                ? `$${liveBalance.toFixed(2)}` 
                : dashboardData?.metrics?.totalPl !== undefined 
                  ? `$${dashboardData.metrics.totalPl.toFixed(2)}`
                  : "$0.00"}
            </h2>
          </div>

          <div className="flex bg-gray-100 dark:bg-[#1e293b] p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-400 w-max self-end sm:self-auto">
            {["1D", "1W", "1M", "3M", "ALL"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setChartPeriod(period)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${chartPeriod === period ? "bg-blue-500 text-white font-black shadow-2xs" : "hover:text-gray-600 dark:hover:text-gray-200"}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Plot Grid Background Wireframe mockup layout */}
        <div className="relative border border-gray-100 dark:border-gray-800/80 rounded-2xl bg-gray-50/20 dark:bg-transparent min-h-[35vh] flex flex-col justify-between p-4 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-40 dark:opacity-20">
            {Array.from({ length: 24 }).map((_, idx) => (
              <div key={idx} className="border-t border-r border-gray-200 dark:border-gray-700 border-dashed first:border-t-0 last:border-r-0" />
            ))}
          </div>

          <div className="m-auto text-center space-y-1 z-10 relative">
            <p className="text-sm font-black text-gray-400 dark:text-gray-500">
              {isLoadingMetrics ? "Loading analysis..." : `No trades taken for ${chartPeriod} timeline`}
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wide pt-4 border-t border-gray-50 dark:border-gray-800/40 z-10 relative tabular-nums px-2">
            {getTimelineLabels().map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== 3. MONTHLY CALENDAR P&L GRID HEATMAP ==================== */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-3">
          <h3 className="font-black text-sm text-gray-900 dark:text-white">Monthly P&L</h3>
          
          <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold">
            <span className="font-semibold text-gray-400">
              Monthly Equity: <strong className="text-emerald-500 dark:text-emerald-400 font-black">${liveEquity.toFixed(2)}</strong>
            </span>
            <div className="flex items-center bg-gray-50 dark:bg-[#1e293b] border rounded-lg p-0.5 gap-1">
              <button 
                type="button" 
                onClick={handlePrevMonth} 
                className="p-1 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <FiChevronLeft />
              </button>
              <span className="text-gray-900 dark:text-white font-black px-1 select-none whitespace-nowrap">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button 
                type="button" 
                onClick={handleNextMonth} 
                className="p-1 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Days of Week Header Indicators row mapping */}
        <div className="grid grid-cols-8 gap-2 text-center text-gray-400 font-bold tracking-wider text-[10px]">
          {["M", "T", "W", "T", "F", "S", "S", "Weekly"].map((day, i) => (
            <div key={i} className="pb-1 text-gray-400 font-bold uppercase tracking-wider">{day}</div>
          ))}

          {/* Calendar cell boxes rendering stack dynamically mapped from daysInMonth */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const today = new Date();
            const isToday = dayNum === today.getDate() && 
                            currentDate.getMonth() === today.getMonth() && 
                            currentDate.getFullYear() === today.getFullYear();

            return (
              <div key={idx} className="aspect-[2.3/1] bg-gray-50/70 dark:bg-[#1e293b]/40 border border-gray-100 dark:border-gray-800/60 rounded-xl p-2 relative flex flex-col justify-between font-bold text-gray-500 dark:text-gray-400 text-[11px] hover:border-blue-500/50 cursor-pointer transition-colors">
                <span>{dayNum}</span>
                {isToday && (
                  <span className="absolute bottom-2 right-3 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                )}
              </div>
            );
          })}

          {/* Right vertical trailing column tracking weekly metrics card frames */}
          <div className="space-y-2 col-start-8 row-start-2 row-span-4 flex flex-col justify-between h-full pt-1.5">
            {Array.from({ length: 5 }).map((_, wIdx) => (
              <div key={wIdx} className="bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800/40 rounded-xl p-1.5 text-center flex flex-col justify-center min-h-[46px]">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">WEEKLY</p>
                <p className="text-[11px] font-black text-gray-900 dark:text-white mt-1 leading-none">$0</p>
                <p className="text-[8px] text-gray-400 font-normal mt-0.5 leading-none">Traded Days 0</p>
              </div>
            ))}
          </div>
        </div>

        {/* Color Key Legend map footer row */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-2 border-t border-gray-50 dark:border-gray-800/40 font-semibold">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Profit</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> Loss</div>
        </div>
      </div>
      {/* ==================== 4. SPLIT DUAL PANELS: OPEN POSITIONS & RECENT ACTIVITY ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* OPEN POSITIONS DESK PANEL */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[25vh]">
          <h4 className="font-black text-sm text-gray-900 dark:text-white">Open Positions</h4>
          
          <div className="flex flex-col items-center justify-center text-center my-auto space-y-2 text-gray-400">
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#1e293b] border flex items-center justify-center text-gray-400">
              <span className="text-base">📁</span>
            </div>
            <p className="text-xs font-semibold text-gray-400">
              {isLoadingMetrics ? "Syncing positions..." : liveEquity - liveBalance !== 0 ? "Live position running on server" : "No open positions"}
            </p>
          </div>

          <div className="border-t border-gray-50 dark:border-gray-800/60 pt-3 text-center">
            <button type="button" onClick={() => {}} className="text-blue-500 hover:text-blue-600 transition-colors font-bold flex items-center gap-1.5 mx-auto bg-transparent border-none cursor-pointer outline-none">
              View All Positions <FiArrowRight />
            </button>
          </div>
        </div>

        {/* RECENT ACTIVITY LOG PANEL */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[25vh]">
          <div className="flex justify-between items-baseline">
            <h4 className="font-black text-sm text-gray-900 dark:text-white">Recent Activity</h4>
            <span className="text-[10px] text-gray-400 font-bold">
              {isLoadingMetrics ? "..." : `${dashboardData?.metrics?.totalTrades || 0} trades`}
            </span>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center my-auto space-y-2 text-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#1e293b] border flex items-center justify-center text-gray-400"><FiClock /></div>
            <p className="text-xs font-semibold text-gray-400">
              {isLoadingMetrics ? "Loading database..." : dashboardData?.metrics?.totalTrades > 0 ? "Activity synced successfully" : "No recent activity"}
            </p>
          </div>

          <div className="border-t border-gray-50 dark:border-gray-800/60 pt-3 text-center">
            <button type="button" onClick={() => {}} className="text-blue-500 hover:text-blue-600 transition-colors font-bold flex items-center gap-1.5 mx-auto bg-transparent border-none cursor-pointer outline-none">
              View All Activity <FiArrowRight />
            </button>
          </div>
        </div>

      </div>

      {/* ==================== 5. TOP PERFORMERS & QUICK STATS FOOTERS ==================== */}
      <div className="space-y-4">
        
        {/* TOP PERFORMERS WIDGET FRAME */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs text-center space-y-4 min-h-[14vh] flex flex-col justify-center">
          <h4 className="font-black text-sm text-gray-900 dark:text-white text-left border-b pb-2">Top Performers</h4>
          <p className="text-gray-400 font-semibold my-auto">
            {isLoadingMetrics ? "Syncing index..." : dashboardData?.metrics?.totalTrades > 0 ? "Data indexed matching session logs" : "No trading data yet"}
          </p>
        </div>

        {/* QUICK STATS BOTTOM CARD OVERLAY MATRIX */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="font-black text-sm text-gray-900 dark:text-white border-b pb-2">Quick Stats</h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {[
              { label: "Avg Win", value: isLoadingMetrics ? "..." : `$${dashboardData?.metrics?.avgWin?.toFixed(2) || "0.00"}`, style: "text-green-500" },
              { label: "Avg Loss", value: isLoadingMetrics ? "..." : `$${dashboardData?.metrics?.avgLoss?.toFixed(2) || "0.00"}`, style: "text-slate-900 dark:text-white" },
              { label: "Best Trade", value: isLoadingMetrics ? "..." : `$${dashboardData?.metrics?.bestTrade?.toFixed(2) || "0.00"}`, style: "text-slate-900 dark:text-white" },
              { label: "Worst Trade", value: isLoadingMetrics ? "..." : `$${dashboardData?.metrics?.worstTrade?.toFixed(2) || "0.00"}`, style: "text-slate-900 dark:text-white" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-100 dark:border-gray-800/40 p-3 rounded-xl">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className={`text-sm font-black mt-1 tabular-nums ${stat.style}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ==================== MODAL SYSTEM OVERLAY POPUP ==================== */}
      <ConnectAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadPortfolioData} 
      />

    </div>
  );
}
