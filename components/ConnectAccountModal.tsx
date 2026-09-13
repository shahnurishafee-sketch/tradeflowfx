"use client";

import { useState, useEffect } from "react";
import { FiX, FiLock, FiServer, FiUser, FiInfo } from "react-icons/fi";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConnectAccountModal({ isOpen, onClose, onSuccess }: ConnectModalProps) {
  const [platform, setPlatform] = useState<"MT4" | "MT5">("MT5");
  const [brokerServer, setBrokerServer] = useState("");
  const [loginId, setLoginId] = useState("");
  const [investorPassword, setInvestorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- AUTOMATIC SERVER DISCOVERY STATES ---
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // Automated live server searching loop as the developer types
  useEffect(() => {
    if (brokerServer.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Debounce input to prevent API rate-limiting blocks
    const delayTimer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/brokers?search=${encodeURIComponent(brokerServer)}&platform=${platform.toLowerCase()}`);
        const servers = await res.json();
        if (Array.isArray(servers)) {
          setSuggestions(servers);
          setShowDropdown(servers.length > 0);
        }
      } catch (err) {
        console.error("Broker search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [brokerServer, platform]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      console.log("🔒 Routing credentials payload safely to secure server route...");
      
      const payload = { platform, brokerServer, loginId, investorPassword };
      const response = await fetch("/api/trading-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to establish secure cloud bridge linking.");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "An unhandled execution error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#111724] border border-slate-800 w-full max-w-md p-6 rounded-2xl shadow-2xl relative text-slate-200">
        
        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Connect Real Account</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Link your MetaTrader credentials securely</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Read-Only Safety Banner */}
        <div className="flex gap-2.5 bg-blue-950/40 border border-blue-900/40 p-3.5 rounded-xl mb-5 text-[11px] text-blue-300 leading-relaxed">
          <FiInfo className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
          <p>
            <span className="font-bold text-blue-200">Read-Only Access Required:</span> Only use your <span className="font-semibold underline">Investor Password</span>. This guarantees TradeFlowFX can never open, edit, or close trades on your behalf.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Platform Segment Toggle Switch */}
          <div className="grid grid-cols-2 bg-[#090d14] p-1 rounded-xl border border-slate-800">
            {(["MT4", "MT5"] as const).map((t) => (
              <button
                key={t} type="button" onClick={() => { setPlatform(t); setBrokerServer(""); }}
                className={`py-2 text-xs font-bold rounded-lg transition ${platform === t ? "bg-slate-800 text-white border border-slate-700 shadow-md" : "text-slate-400 hover:text-slate-200"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Broker Server Dynamic Field */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
              <FiServer /> Broker Server
            </label>
            <div className="relative">
              <input
                type="text" required value={brokerServer}
                onChange={(e) => setBrokerServer(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                placeholder="e.g. Exness-MT5Real51"
                className="w-full bg-[#090d14] border border-slate-700 text-xs rounded-xl p-3 outline-none text-slate-200 focus:border-blue-500 transition font-mono pr-20"
              />
              {isSearching && (
                <span className="absolute right-3 top-3 text-[10px] text-slate-500 font-mono animate-pulse">Searching...</span>
              )}
            </div>

            {/* FLOATING SUGGESTIONS DROPDOWN STACK */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-[62px] max-h-[160px] overflow-y-auto bg-[#090d14] border border-slate-700 rounded-xl shadow-2xl z-50 divide-y divide-slate-800 custom-scrollbar animate-slideUp">
                {suggestions.map((server, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setBrokerServer(server);
                      setShowDropdown(false);
                    }}
                    className="p-3 text-[11px] font-mono text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                  >
                    🏢 {server}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Account Login ID Node */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
              <FiUser /> Account Login ID
            </label>
            <input
              type="text" required value={loginId} onChange={(e) => setLoginId(e.target.value)}
              placeholder="e.g. 460014305" className="w-full bg-[#090d14] border border-slate-700 text-xs rounded-xl p-3 outline-none text-slate-200 font-mono focus:border-blue-500 transition"
            />
          </div>

          {/* Secure Investor Password Node */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
              <FiLock /> Investor Password
            </label>
            <input
              type="password" required value={investorPassword} onChange={(e) => setInvestorPassword(e.target.value)}
              placeholder="••••••••" className="w-full bg-[#090d14] border border-slate-700 text-xs rounded-xl p-3 outline-none text-slate-200 focus:border-blue-500 transition"
            />
          </div>

          {errorMsg && (
            <p className="text-[11px] text-red-400 font-semibold bg-red-950/20 border border-red-900/40 px-3 py-2 rounded-lg animate-shake">
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Connect Action Trigger */}
          <button
            type="submit" disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none mt-2 shadow-lg shadow-blue-600/10 flex items-center justify-center gap-1.5"
          >
            <FiLock /> {isLoading ? "Securely Connecting..." : "Securely Link Account 🔒"}
          </button>
        </form>

      </div>
    </div>
  );
}
