"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch, FiSun, FiMoon, FiBell, FiPlus } from "react-icons/fi";

// Dictionary mapping out all the structural project pages and visual components
const PROJECT_COMPONENTS = [
  { name: "Dashboard Overview", type: "Component", path: "/dashboard", description: "Main system metrics and equity charts" },
  { name: "Trades Grid Log", type: "Component", path: "/dashboard/trades", description: "History table tracking entry details and executions" },
  { name: "Trading Journal Logs", type: "Component", path: "/dashboard/journal", description: "Daily notes, text reviews, and performance breakdowns" },
  { name: "Performance Analytics", type: "Component", path: "/dashboard/analytics/performance", description: "Win rates, distribution plots, metrics analysis" },
  { name: "Trade Analytics", type: "Component", path: "/dashboard/analytics/trade-analytics", description: "Deep dive statistics for trading behaviors" },
  { name: "Market Overview Feed", type: "Component", path: "/dashboard/market", description: "Live symbol tick feeds and economic data calendars" },
  { name: "AI Reports Hub", type: "Component", path: "/dashboard/ai-report", description: "Automated sentiment summaries and algorithmic trade logs" },
  { name: "Traders Lounge", type: "Component", path: "/dashboard/lounge", description: "Social community discussions and chat rooms" },
  { name: "Leaderboards Rank", type: "Component", path: "/dashboard/leaderboard", description: "Top global trader stats and platform performance listings" },
  { name: "Tools System Dashboard", type: "Component", path: "/dashboard/tools", description: "Risk sizing meters and margin calculations tools" },
  { name: "System Settings Menu", type: "Component", path: "/dashboard/settings", description: "User configuration parameters and dark mode options" },
];

export default function DashboardTopBar() {
  const router = useRouter();

  // SEARCH HOOKS
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    // Filter project components using case-insensitive partial matches
    const filtered = PROJECT_COMPONENTS.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  // EXISTING HOOKS
  const [time, setTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal, setActiveModal] = useState<null | string>(null);

  // QUICK ACTIONS LOCAL FORM STATES (Editable States)
  const [tradeForm, setTradeForm] = useState({ symbol: "EURUSD", type: "BUY", size: "0.10", entry: "" });
  const [journalForm, setJournalForm] = useState({ title: "", notes: "" });
  const [mt5Form, setMt5Form] = useState({ login: "", password: "", server: "" });

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // TIME
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

   // CLOSE DROPDOWNS & KEY LISTENERS + TRADES PAGE PORTAL COUPLING
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowSearchResults(true);
      }
    };

    // Custom window listener that catches clicks from the Trades page buttons
    const handleOpenModalFromExternalPage = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveModal(customEvent.detail); // Automatically pops open 'addTrade' or 'syncMT5'
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("openModalChannel", handleOpenModalFromExternalPage);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openModalChannel", handleOpenModalFromExternalPage);
    };
  }, []);

  // THEME INVERTER
  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Read persistence value on system initialization load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between bg-white dark:bg-[#0f172a]
                      border-b border-gray-200 dark:border-[#1e293b] px-6 py-3 rounded-t-xl">

        {/* SEARCH BAR */}
        <div ref={searchRef} className="relative flex items-center gap-2 bg-gray-100 dark:bg-[#1e293b]
                        px-3 py-2 rounded-lg w-1/3">
          <FiSearch className="text-gray-500 dark:text-gray-400" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setShowSearchResults(true)}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search platform components..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-300"
          />

          <span className="text-xs text-gray-400 whitespace-nowrap">Ctrl+K</span>

          {/* SEARCH DROPDOWN */}
          {showSearchResults && query.trim() !== "" && (
            <div className="absolute top-11 left-0 w-full bg-white dark:bg-[#0f172a]
                            border border-gray-200 dark:border-[#1e293b]
                            rounded-xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
              
              {results.length === 0 ? (
                <div className="p-3 text-center text-sm text-gray-400">
                  No matching components found
                </div>
              ) : (
                results.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      router.push(item.path);
                      setShowSearchResults(false);
                      setQuery("");
                    }}
                    className="p-2.5 rounded-lg cursor-pointer transition-colors
                               hover:bg-gray-100 dark:hover:bg-[#1e293b] flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                      <span className="text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-4">

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1e293b]"
            title="Toggle Theme"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* QUICK ACTIONS */}
          <div className="relative" ref={quickRef}>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1e293b]"
              title="Quick Actions"
            >
              <FiPlus className="text-gray-600 dark:text-gray-300" />
            </button>

            {showQuickActions && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0f172a]
                              border border-gray-200 dark:border-[#1e293b]
                              rounded-xl shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-[#1e293b]
                                font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </div>

                <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                  <li 
                    onClick={() => { setActiveModal("addTrade"); setShowQuickActions(false); }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1e293b] cursor-pointer"
                  >
                    Add Manual Trade
                  </li>

                  <li 
                    onClick={() => { setActiveModal("newJournal"); setShowQuickActions(false); }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1e293b] cursor-pointer"
                  >
                    New Journal Entry
                  </li>

                  <li
                    onClick={() => { setActiveModal("syncMT5"); setShowQuickActions(false); }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1e293b] cursor-pointer"
                  >
                    Sync MT5 Account
                  </li>

                  <li 
                    onClick={() => { router.push("/dashboard/analytics"); setShowQuickActions(false); }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1e293b] cursor-pointer"
                  >
                    View Analytics
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* TIME */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {time}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1e293b]"
              title="Notifications"
            >
              <FiBell className="text-gray-600 dark:text-gray-300" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0f172a]
                              border border-gray-200 dark:border-[#1e293b]
                              rounded-xl shadow-lg p-4 z-50">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Notifications
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>No new notifications</li>
                </ul>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-8 h-8 rounded-full bg-[#0f172a] dark:bg-[#1e293b]
                         flex items-center justify-center text-white font-bold"
            >
              M
            </button>

{showProfile && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl
                              bg-[#0f172a] border border-[#1e293b]
                              shadow-xl shadow-black/30 z-50 animate-fadeIn">
                <div className="px-4 py-4 border-b border-[#1e293b]">
                  <p className="font-semibold text-white text-base">Mohammadshafee Wasta</p>
                  <p className="text-xs text-gray-400">wmohammadshafee@gmail.com</p>
                </div>

                <ul className="py-2 text-sm text-gray-300">
                  <li
                    onClick={() => { setActiveModal("profile"); setShowProfile(false); }}
                    className="px-4 py-2 hover:bg-[#1e293b] cursor-pointer"
                  >
                    My Profile
                  </li>
                  <li
                    onClick={() => { setActiveModal("settings"); setShowProfile(false); }}
                    className="px-4 py-2 hover:bg-[#1e293b] cursor-pointer"
                  >
                    Settings
                  </li>
                  <li
                    onClick={() => { setActiveModal("subscription"); setShowProfile(false); }}
                    className="px-4 py-2 hover:bg-[#1e293b] cursor-pointer"
                  >
                    Subscription
                  </li>
                  <li
                    onClick={() => { setActiveModal("support"); setShowProfile(false); }}
                    className="px-4 py-2 hover:bg-[#1e293b] cursor-pointer"
                  >
                    Help & Support
                  </li>
                  <li className="px-4 py-2 hover:bg-[#1e293b] text-red-400 cursor-pointer">
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <Modal 
          title={
            activeModal === "addTrade" ? "Add Manual Trade" : 
            activeModal === "newJournal" ? "New Journal Entry" : 
            activeModal === "syncMT5" ? "Sync MT5 Account" : 
            activeModal === "profile" ? "My Profile" :
            activeModal === "settings" ? "Settings" :
            activeModal === "subscription" ? "Subscription" :
            activeModal === "support" ? "Help & Support" :
            activeModal
          } 
          onClose={() => setActiveModal(null)}
        >
          {activeModal === "addTrade" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Asset Pair</label>
                <input type="text" value={tradeForm.symbol} onChange={(e) => setTradeForm({...tradeForm, symbol: e.target.value.toUpperCase()})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" placeholder="e.g., XAUUSD" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Position Type</label>
                <select value={tradeForm.type} onChange={(e) => setTradeForm({...tradeForm, type: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700">
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Lot Size</label>
                <input type="number" step="0.01" value={tradeForm.size} onChange={(e) => setTradeForm({...tradeForm, size: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <button 
                onClick={async () => {
                  try {
                    // Push the logged trade straight to your Supabase table
                    const { error } = await supabase
                      .from("trades") // Make sure this matches your exact table name in Supabase
                      .insert([
                        { 
                          pair: tradeForm.symbol, 
                          type: tradeForm.type, 
                          size: parseFloat(tradeForm.size),
                          date: new Date().toISOString().split('T')[0],
                          source: "Manual"
                        }
                      ]);
                    
                    if (error) throw error;
                    
                    setActiveModal(null);
                    router.refresh(); // Refresh page data grid views automatically
                  } catch (err) {
                    console.error("Failed logging trade to Supabase:", err);
                    alert("Error saving trade record. Verify your table definitions.");
                  }
                }} 
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded font-medium mt-2 cursor-pointer"
              >
                Log Trade Position
              </button>
            </div>
          )}

          {activeModal === "syncMT5" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">MT5 Account Number</label>
                <input type="text" placeholder="Account login string" value={mt5Form.login} onChange={(e) => setMt5Form({...mt5Form, login: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Broker Server Name</label>
                <input type="text" placeholder="e.g., ICMarkets-Demo" value={mt5Form.server} onChange={(e) => setMt5Form({...mt5Form, server: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <button 
                onClick={async () => {
                  try {
                    // Store credentials in an accounts table or invoke an edge function pipeline
                    const { error } = await supabase
                      .from("broker_connections")
                      .insert([
                        { account_number: mt5Form.login, server_name: mt5Form.server, status: "Pending" }
                      ]);
                    
                    if (error) throw error;
                    
                    alert(`MetaTrader account terminal payload deployed successfully! Checking connection status...`);
                    setActiveModal(null);
                    router.refresh();
                  } catch (err) {
                    console.error("Failed saving broker information connection token:", err);
                    alert("Submission rejected. Confirm database keys config layout.");
                  }
                }} 
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded font-medium mt-2 cursor-pointer"
              >
                Connect Terminal
              </button>
            </div>
          )}


          {activeModal === "newJournal" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Log Heading Title</label>
                <input type="text" placeholder="e.g., Morning NY Session Review" value={journalForm.title} onChange={(e) => setJournalForm({...journalForm, title: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Trading Notes & Observation</label>
                <textarea rows={4} placeholder="Note down your trading psychology or market setup notes..." value={journalForm.notes} onChange={(e) => setJournalForm({...journalForm, notes: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700 resize-none" />
              </div>
              <button onClick={() => { console.log("Saving Journal:", journalForm); setActiveModal(null); }} className="bg-blue-500 text-white px-4 py-2 rounded font-medium mt-2 hover:bg-blue-600 transition-colors">Save Journal Entry</button>
            </div>
          )}
          {activeModal === "syncMT5" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">MT5 Account Number</label>
                <input type="text" placeholder="Account login string" value={mt5Form.login} onChange={(e) => setMt5Form({...mt5Form, login: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Broker Server Name</label>
                <input type="text" placeholder="e.g., ICMarkets-Demo" value={mt5Form.server} onChange={(e) => setMt5Form({...mt5Form, server: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <button onClick={() => { alert(`Initiating MetaTrader sync for user ${mt5Form.login}...`); setActiveModal(null); }} className="bg-blue-500 text-white px-4 py-2 rounded font-medium mt-2 hover:bg-blue-600 transition-colors">Connect Terminal</button>
            </div>
          )}

          {activeModal === "profile" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" defaultValue="Mohammadshafee Wasta" className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" defaultValue="wmohammadshafee@gmail.com" className="w-full p-2 border rounded bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white dark:border-gray-700" />
              </div>
              <button onClick={() => setActiveModal(null)} className="bg-blue-500 text-white px-4 py-2 rounded font-medium mt-2 hover:bg-blue-600 transition-colors">Save Changes</button>
            </div>
          )}

          {activeModal === "settings" && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between cursor-pointer group" onClick={() => toggleTheme()}>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                  Dark Mode
                </span>
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={(e) => {
                    e.stopPropagation(); 
                    toggleTheme();
                  }}
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 cursor-pointer accent-blue-500" 
                />
              </div>
              
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => {
                  const savedNotifs = localStorage.getItem("emailNotifications") === "true";
                  localStorage.setItem("emailNotifications", (!savedNotifs).toString());
                  router.refresh(); 
                }}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                  Email Notifications
                </span>
                <input 
                  type="checkbox" 
                  checked={typeof window !== "undefined" ? localStorage.getItem("emailNotifications") !== "false" : true}
                  onChange={(e) => e.stopPropagation()} 
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 cursor-pointer accent-blue-500" 
                />
              </div>
              
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => {
                  const savedSounds = localStorage.getItem("soundAlerts") === "true";
                  localStorage.setItem("soundAlerts", (!savedSounds).toString());
                  router.refresh();
                }}
              >
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:text-blue-500 transition-colors">
                  Sound Alerts
                </span>
                <input 
                  type="checkbox" 
                  checked={typeof window !== "undefined" ? localStorage.getItem("soundAlerts") === "true" : false}
                  onChange={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 cursor-pointer accent-blue-500" 
                />
              </div>
            </div>
          )}

          {activeModal === "subscription" && (
            <div className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto px-1 py-2 text-slate-900 dark:text-white">
              {/* Header Title Section */}
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">Pricing Packages</p>
                <h4 className="text-xl font-bold mt-0.5">Choose Your Trading Edge</h4>
              </div>

              {/* 3-Tier Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                
               {/* 1. FREE TIER CARD */}
                <div className="bg-slate-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between relative shadow-xs">
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-base text-slate-900 dark:text-white">Free</h5>
                      <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-sm">Your Plan</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">Perfect for getting started with trading journaling</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">$0</span>
                      <span className="text-xs text-gray-400 ml-1">/month</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">billed monthly</p>
                    <ul className="mt-4 space-y-2 text-xs border-t border-gray-200 dark:border-gray-700 pt-3 text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Up to 15 trades / mo</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> 1 month chart data</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> News data (today only)</li>
                    </ul>
                  </div>
                  <button disabled className="w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-1.5 rounded-lg text-xs font-semibold mt-6 cursor-not-allowed">Current Plan</button>
                </div>

                {/* 2. PRO TIER CARD (MOST POPULAR) */}
                <div className="bg-white dark:bg-[#1e293b] border-2 border-blue-500 rounded-xl p-4 flex flex-col justify-between relative shadow-md scale-[1.02] md:scale-100">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">Most Popular</div>
                  <div className="mt-1">
                    <h5 className="font-bold text-base text-slate-900 dark:text-white">Pro</h5>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">For serious traders who want deeper analytical insights</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">$12.99</span>
                      <span className="text-xs text-gray-400 ml-1">/month</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">billed monthly</p>
                    <ul className="mt-4 space-y-2 text-xs border-t border-gray-200 dark:border-gray-700 pt-3 text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Unlimited trade entries</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> AI Trade insights</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Full trading reports</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> 3 MT4/MT5 auto-journals</li>
                    </ul>
                  </div>
                  <button onClick={() => alert("Redirecting to Pro checkout tier...")} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-xs font-bold mt-6 shadow-xs transition-colors">Upgrade to Pro</button>
                </div>

                {/* 3. ELITE TIER CARD */}
                <div className="bg-slate-50 dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between relative shadow-xs">
                  <div>
                    <h5 className="font-bold text-base text-slate-900 dark:text-white">Elite</h5>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">Maximum trading edge with exclusive premium tools</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">$22.99</span>
                      <span className="text-xs text-gray-400 ml-1">/month</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">billed monthly</p>
                    <ul className="mt-4 space-y-2 text-xs border-t border-gray-200 dark:border-gray-700 pt-3 text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Everything in Pro tier</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Unlimited MT4/MT5 sync</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> Backtesting metrics engine</li>
                      <li className="flex items-center gap-2"><span className="text-blue-500 font-bold">✓</span> VIP Community support</li>
                    </ul>
                  </div>
                  <button onClick={() => alert("Redirecting to Elite checkout tier...")} className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white py-1.5 rounded-lg text-xs font-bold mt-6 shadow-xs transition-colors">Upgrade to Elite</button>
                </div>

              </div>
              {/* Detailed Feature Comparison Table Grid */}
              <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                <h5 className="text-center font-bold text-sm mb-4">Compare All Platform Features</h5>
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 text-[11px]">
                  <table className="w-full text-left border-collapse bg-white dark:bg-[#0f172a]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-800 font-bold">
                        <th className="p-2.5 text-gray-500 dark:text-gray-400">Features</th>
                        <th className="p-2.5 text-center">Free</th>
                        <th className="p-2.5 text-center text-blue-500">Pro</th>
                        <th className="p-2.5 text-center">Elite</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {/* TRADING MODULE ROW */}
                      <tr className="bg-gray-100/50 dark:bg-slate-900/40 font-bold"><td colSpan={4} className="p-2 text-blue-500 uppercase tracking-wider text-[9px]">Trading Accounts</td></tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Connected Accounts</td>
                        <td className="p-2.5 text-center text-gray-400">Manual Only</td>
                        <td className="p-2.5 text-center font-semibold">3 Accounts</td>
                        <td className="p-2.5 text-center font-semibold">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Trades per Month</td>
                        <td className="p-2.5 text-center text-gray-400">15 Max</td>
                        <td className="p-2.5 text-center text-green-500 font-bold">Unlimited</td>
                        <td className="p-2.5 text-center text-green-500 font-bold">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">MT4/MT5 Auto-Sync</td>
                        <td className="p-2.5 text-center text-gray-300 dark:text-gray-700">—</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">✓</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">✓</td>
                      </tr>
                      {/* ANALYTICS MODULE ROW */}
                      <tr className="bg-gray-100/50 dark:bg-slate-900/40 font-bold"><td colSpan={4} className="p-2 text-blue-500 uppercase tracking-wider text-[9px]">Analytics & Reports</td></tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Performance Charts</td>
                        <td className="p-2.5 text-center text-gray-400">Basic Grid</td>
                        <td className="p-2.5 text-center font-semibold">Advanced</td>
                        <td className="p-2.5 text-center font-semibold">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">AI Analytics Insights</td>
                        <td className="p-2.5 text-center text-gray-300 dark:text-gray-700">—</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">✓</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">✓</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Backtesting Tools</td>
                        <td className="p-2.5 text-center text-gray-300 dark:text-gray-700">—</td>
                        <td className="p-2.5 text-center text-gray-300 dark:text-gray-700">—</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">✓</td>
                      </tr>

                      {/* SUPPORT MODULE ROW */}
                      <tr className="bg-gray-100/50 dark:bg-slate-900/40 font-bold"><td colSpan={4} className="p-2 text-blue-500 uppercase tracking-wider text-[9px]">Help Desk Support</td></tr>
                      <tr>
                        <td className="p-2.5 font-medium text-gray-700 dark:text-gray-300">Live Support Channel</td>
                        <td className="p-2.5 text-center text-gray-400">Email</td>
                        <td className="p-2.5 text-center font-semibold">24/7 Chat</td>
                        <td className="p-2.5 text-center text-blue-500 font-bold">VIP Priority</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-3">
                  By subscribing, you agree to our Terms of Conditions and Privacy Policy.
                </p>
              </div>
            </div>
          )}

          {activeModal === "support" && (
            <div className="py-2 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                Need help? Contact our support team below.
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors text-sm">
                Open Support Chat
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

// SINGLE VERIFIED CUSTOM OVERLAY MODAL WINDOW COMPONENT DEFINITION
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn p-4">
      <div className="bg-white dark:bg-[#0f172a] p-5 rounded-xl w-full max-w-3xl border border-gray-200 dark:border-[#1e293b] shadow-2xl relative">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-sm font-bold p-1">✕</button>
        </div>
        <div className="text-slate-900 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
