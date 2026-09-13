"use client";

import { useState } from "react";
import { 
  FiUser, FiActivity, FiSettings, FiCreditCard, FiShield, FiEdit2, 
  FiSliders, FiCheckCircle, FiUnlock, FiInfo, FiSmartphone, FiTrash2, FiDownload, FiMapPin, FiCpu
} from "react-icons/fi";

export default function SettingsSuitePage() {
  // SETTINGS SUITE STATE TAB NAVIGATION
  const [activeTab, setActiveTab] = useState("Profile"); // Profile, MT5/MT4, Settings, Billing, Security

  // PROFILE STATE INPUTS
  const [fullName, setFullName] = useState("Mohammadshafee Wasta");
  const [userHandle, setUserHandle] = useState("@mohammadshafee");

  // PRIVACY CONTROL TOGGLES (Settings Tab)
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [showTradesPublicly, setShowTradesPublicly] = useState(true);

  // SECURITY SETTINGS
  const [sessionAlerts, setSessionAlerts] = useState(false);

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12 text-xs font-semibold">
      
      {/* PAGE BANNER HEADER */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage your professional credentials, trading rules, brokerage sync paths and security policies</p>
      </div>

      {/* ==================== GLOBAL PROFILE TOP BANNER HEADER ==================== */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative w-16 h-16 shrink-0">
            <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-md">
              M
            </div>
            <button type="button" onClick={() => alert("Avatar sync initiated...")} className="absolute bottom-0 right-0 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full border-2 border-white dark:border-[#0f172a] shadow-xs cursor-pointer outline-none">
              <FiEdit2 className="text-[10px]" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              {fullName}
              <span className="text-[10px] font-bold bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 px-2 py-0.5 rounded border border-green-200 dark:border-green-900/40 tracking-wide uppercase scale-90">Full Access</span>
            </h2>
            <p className="text-gray-400 font-medium mt-0.5">{userHandle} • Joined 2026</p>
          </div>
        </div>

        <button 
          type="button" 
          onClick={() => setActiveTab("Profile")}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-[#1e293b] hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors font-bold text-gray-600 dark:text-gray-300 cursor-pointer outline-none shrink-0"
        >
          <FiUser className="text-xs" />
          View Profile Panel
        </button>
      </div>

      {/* ==================== GLOBAL SUB-TAB MENU BAR HORIZONTAL TABS ==================== */}
      <div className="flex flex-wrap bg-gray-100 dark:bg-[#1e293b]/40 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 w-full sm:w-max text-[11px] font-bold text-gray-400">
        {[
          { id: "Profile", icon: <FiUser /> },
          { id: "MT5/MT4", icon: <FiActivity /> },
          { id: "Settings", icon: <FiSettings /> },
          { id: "Billing", icon: <FiCreditCard /> },
          { id: "Security", icon: <FiShield /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            type="button" 
            onClick={() => setActiveTab(tab.id)} 
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === tab.id ? "bg-blue-500 text-white shadow-xs font-bold" : "hover:text-gray-600"}`}
          >
            {tab.icon} {tab.id}
          </button>
        ))}
      </div>
      {/* ==================== SUB-PANEL A: PROFILE TAB VIEW ==================== */}
      {activeTab === "Profile" && (
        <div className="space-y-4">
          {/* AI Banner Advertisement Block Strip */}
          <div className="bg-blue-500/10 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 p-4 rounded-xl flex items-center justify-between gap-4 text-blue-800 dark:text-blue-300 shadow-3xs">
            <div className="flex items-center gap-3">
              <FiCpu className="text-blue-500 text-lg animate-pulse" />
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">AI-Powered Trading Reports Unlocked</h4>
                <p className="text-[11px] text-gray-400 font-medium">Personalized diagnostic summaries are actively evaluating your database transaction histories.</p>
              </div>
            </div>
            <button onClick={() => alert("Redirecting to AI engine console...")} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold text-[11px]">View AI Logs</button>
          </div>

          {/* Trading Rules Risk Matrix Card setup */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FiSliders className="text-blue-500" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Trading Rules</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Your customized systemic risk ceiling matrix parameters</p>
                </div>
              </div>
              <button onClick={() => alert("Trading ceiling modifier templates activated.")} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold transition-all">Edit Rules</button>
            </div>

            {/* Individual Rule Metrics Widgets Row Mapping */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
              {[
                { label: "Max Risk / Trade", value: "5%" },
                { label: "Max Trades / Day", value: "10" },
                { label: "Max Daily Loss", value: "10%" },
                { label: "Losing Streak Limit", value: "5 in a row" },
                { label: "Risk / Reward Minimum", value: "1:4" }
              ].map((rule, idx) => (
                <div key={idx} className="bg-gray-50/50 dark:bg-[#1e293b]/30 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{rule.label}</p>
                  <p className="text-base font-black text-gray-900 dark:text-white mt-1 tabular-nums">{rule.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-PANEL B: MT5 / MT4 ACCOUNT SYNC VIEW ==================== */}
      {activeTab === "MT5/MT4" && (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b pb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Connected Trading Accounts</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Manage your server credentials or synchronize broker terminal logs automatically</p>
          </div>

          {/* Connected account empty data block precisely matching your snapshot mockup */}
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-3 min-h-[25vh]">
            <div className="w-12 h-12 bg-blue-50 dark:bg-[#1e293b] rounded-2xl flex items-center justify-center text-blue-500 border shadow-3xs">
              <FiActivity className="text-xl animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="font-black text-sm text-gray-900 dark:text-white">MT4/MT5 Connection Hub Unlocked</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto font-normal leading-relaxed">Your account has full sync rights. Click the primary top quick action menu bar to connect a live MetaTrader execution environment terminal.</p>
            </div>
          </div>
        </div>
      )}
      {/* ==================== SUB-PANEL C: PRIVACY SETTINGS VIEW ==================== */}
      {activeTab === "Settings" && (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b pb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Privacy Control Settings</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Control what other traders and system allocators can see on your public tracking profile</p>
          </div>

          <div className="space-y-1 divide-y divide-gray-50 dark:divide-gray-800/40">
            {/* Row 1: Profile Visibility */}
            <div className="flex items-center justify-between py-4 first:pt-1">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-gray-900 dark:text-white font-bold text-xs">Profile Visibility</p>
                <p className="text-gray-400 font-normal leading-relaxed">Your personal dashboard, connection metrics and data sets are discoverable to other network members.</p>
              </div>
              <input type="checkbox" checked={profileVisibility} onChange={() => setProfileVisibility(!profileVisibility)} className="w-9 h-5 rounded-full bg-gray-200 checked:bg-blue-500 appearance-none cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform" />
            </div>

            {/* Row 2: Leaderboard rankings opt-in */}
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-gray-900 dark:text-white font-bold text-xs">Show on Leaderboard</p>
                <p className="text-gray-400 font-normal leading-relaxed">Appear in the public platform trading leaderboards and ranking tracking indexes based on alpha generation scores.</p>
              </div>
              <input type="checkbox" checked={showOnLeaderboard} onChange={() => setShowOnLeaderboard(!showOnLeaderboard)} className="w-9 h-5 rounded-full bg-gray-200 checked:bg-blue-500 appearance-none cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform" />
            </div>

            {/* Row 3: Display individual positions lists */}
            <div className="flex items-center justify-between py-4 last:pb-1">
              <div className="space-y-0.5 max-w-[80%]">
                <p className="text-gray-900 dark:text-white font-bold text-xs">Show Trades</p>
                <p className="text-gray-400 font-normal leading-relaxed">Let others see your individual position entries, volume modifications, executions history log rows and open allocations.</p>
              </div>
              <input type="checkbox" checked={showTradesPublicly} onChange={() => setShowTradesPublicly(!showTradesPublicly)} className="w-9 h-5 rounded-full bg-gray-200 checked:bg-blue-500 appearance-none cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-transform" />
            </div>
          </div>
          
          <div className="flex justify-end border-t pt-4"><button onClick={() => alert("Privacy profiles committed.")} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-xs transition-all">Save Configuration Rules</button></div>
        </div>
      )}

      {/* ==================== SUB-PANEL D: BILLING & UPGRADE PLANS VIEW ==================== */}
      {activeTab === "Billing" && (
        <div className="space-y-6">
          {/* Active Status Display Block */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs space-y-3">
            <div><h3 className="font-bold text-sm text-gray-900 dark:text-white">Current Plan</h3><p className="text-[11px] text-gray-400 font-medium">Your current platform workspace allocation tiers</p></div>
            <div className="p-3 bg-gray-50 dark:bg-[#1e293b]/40 border rounded-xl flex items-center gap-2"><span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded">UNLOCKED</span><span className="text-gray-600 dark:text-gray-300">Enterprise Professional License Enabled</span></div>
          </div>

          {/* Pricing packages row mapping blocks exactly matching your snapshot details */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Upgrade Tiers Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-xl space-y-4 relative">
                <div><h4 className="font-black text-sm text-slate-900 dark:text-white">Pro Package</h4><p className="text-gray-400 text-[11px] mt-0.5 font-normal">For serious traders demanding metric expansions</p></div>
                <p className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">$12.99 <span className="text-xs text-gray-400 font-normal">/ month</span></p>
                <ul className="space-y-1.5 text-[11px] text-gray-400 border-t pt-3 font-medium"><li>✓ Up to 3 live terminal links</li><li>✓ Unlimited trade execution lists</li><li>✓ Advanced analytics distributions charts</li></ul>
                <button type="button" disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed">Active Through License</button>
              </div>

              <div className="border-2 border-amber-500 p-4 rounded-xl space-y-4 relative bg-amber-50/5 dark:bg-transparent">
                <div className="absolute top-2 right-3 font-black text-[9px] uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow-2xs">Elite Edge</div>
                <div><h4 className="font-black text-sm text-slate-900 dark:text-white">Elite Package</h4><p className="text-gray-400 text-[11px] mt-0.5 font-normal">Maximum validation alpha tracking layouts</p></div>
                <p className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">$22.99 <span className="text-xs text-gray-400 font-normal">/ month</span></p>
                <ul className="space-y-1.5 text-[11px] text-gray-400 border-t pt-3 font-medium"><li>✓ Everything included in Pro tier</li><li>✓ Unlimited broker connections sync</li><li>✓ Multi-account aggregated reporting models</li></ul>
                <button type="button" disabled className="w-full bg-amber-500 text-slate-950 py-1.5 rounded-lg text-xs font-black cursor-not-allowed">Active Through License</button>
              </div>
            </div>
          </div>

          {/* Dodo secure checkout placeholder layout box banner matching snapshot */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 shadow-xs space-y-2">
            <h4 className="font-bold text-gray-900 dark:text-white">Payment Information</h4>
            <p className="text-[11px] text-gray-400 font-medium">Your processing cycles are compiled securely alongside Dodo Payments ledger infrastructure protocols.</p>
            <div className="p-3 border rounded-xl bg-gray-50 dark:bg-[#1e293b]/40 text-gray-400 font-bold flex items-center gap-2"><FiCreditCard className="text-blue-500" /><span>Secure transaction routing channels configured. No actions needed.</span></div>
          </div>
        </div>
      )}
      {/* ==================== SUB-PANEL E: SECURITY SETTINGS & DEVICE HISTORY VIEW ==================== */}
      {activeTab === "Security" && (
        <div className="space-y-5">
          {/* Active Session logs mapping widgets */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Session Security</h3>
                <p className="text-[11px] text-gray-400 font-medium">Track your active access footprints and entry indicators</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[11px] font-bold">Session Alerts</span>
                <input type="checkbox" checked={sessionAlerts} onChange={() => setSessionAlerts(!sessionAlerts)} className="w-8 h-4 rounded-full bg-gray-200 checked:bg-blue-500 appearance-none cursor-pointer relative before:content-[''] before:absolute before:w-3 before:h-3 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 checked:before:translate-x-4 transition-all" />
              </div>
            </div>

            {/* Active device log bar overlay matching snapshot */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Active Sessions</h4>
              <div className="p-3 bg-gray-50 dark:bg-[#1e293b]/40 border rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm"><FiSmartphone /></div>
                  <div className="space-y-0.5">
                    <p className="text-gray-900 dark:text-white font-bold text-xs">Edge on Windows <span className="text-[9px] font-black bg-blue-100 dark:bg-blue-900/60 text-blue-600 px-1 rounded ml-1">Current</span></p>
                    <p className="text-gray-400 font-normal flex items-center gap-1.5">Just now • <FiMapPin /> Abu Dhabi, United Arab Emirates</p>
                  </div>
                </div>
                <button onClick={() => alert("Session security tokens regenerated.")} className="text-blue-500 hover:underline font-bold bg-transparent border-none outline-none cursor-pointer">Revoke</button>
              </div>
            </div>

            {/* Third-party authenticator card panel mockup descriptor row */}
            <div className="pt-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2">Password Manager Connection</h4>
              <div className="p-3 bg-gray-50 dark:bg-[#1e293b]/40 border rounded-xl flex items-center gap-3 text-gray-400 font-bold"><FiCheckCircle className="text-green-500 text-sm shrink-0" /><span>Signed in with Google. Password configurations managed securely outside local arrays.</span></div>
            </div>
          </div>

          {/* Two-Factor Authentication Setup Card */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <p className="text-gray-400 font-normal leading-relaxed max-w-2xl">Protect your trading database log channels with hardware-level or phone-based two-factor configuration validations. An SMS confirmation string layer code will deploy on sequential authorization attempts.</p>
            <button onClick={() => alert("Generating SMS/TOTP initialization matrix sheets...")} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#1e293b] font-bold text-blue-500 hover:bg-gray-50 cursor-pointer outline-none">Enable 2FA Validation</button>
          </div>

          {/* Master Admin Danger Zone Block Strip options layout */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Danger Zone</h3>
            <p className="text-gray-400 font-normal mt-0.5">Irreversible platform account actions</p>
            <div className="flex flex-wrap gap-2 pt-1 font-bold text-xs">
              <button type="button" onClick={() => confirm("Warning! Proceeding clears all manual trading rows entries permanently. Continue?")} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 bg-red-50/40 hover:bg-red-100/50 dark:bg-transparent dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 rounded-xl transition-colors cursor-pointer outline-none"><FiTrash2 /> Clear Trading Data</button>
              <button type="button" onClick={() => alert("Compiling full platform logs JSON archive download packet...")} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl transition-colors cursor-pointer outline-none"><FiDownload /> Export Account Data</button>
              <button type="button" onClick={() => confirm("Critical structural call triggered: Requesting absolute deletion of full user indices parameters. Proceed?")} className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-blue-600 transition-colors text-white rounded-xl shadow-xs cursor-pointer outline-none border-none">Delete Account Profile</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
