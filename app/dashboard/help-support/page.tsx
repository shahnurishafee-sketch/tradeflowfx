"use client";

import { useState } from "react";
import { 
  FiHelpCircle, FiMail, FiTwitter, FiMessageSquare, FiInfo, FiChevronDown, FiChevronUp 
} from "react-icons/fi";

export default function HelpSupportSuitePage() {
  // FAQ ACTIVE EXPANSION CONTROLLER STATE
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  const toggleFaqNode = (id: number) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 min-h-screen pb-12 text-xs font-semibold">
      
      {/* ==================== 1. WIDE HERO BANNER HEADERS STRIP ==================== */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#1e293b]/40 dark:to-[#0f172a]/20 border border-gray-200 dark:border-[#1e293b] p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-3xs relative overflow-hidden">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md">
          <FiHelpCircle className="animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Help & Support</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">We are here to help you maximize your systemic trading edge and manage connection nodes</p>
        </div>
      </div>

      {/* ==================== 2. CONTRASTING CONTACT CHANNELS GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
        
        {/* LEFT COLUMN: CONTACT CHANNELS LINKS */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-2xs">
          <div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></span> Contact Us
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Reach out to our global terminal operators for account diagnostics</p>
          </div>

          {/* Primary Mail Channel */}
          <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-center justify-between gap-3 group hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center text-base shadow-xs">
                <FiMail />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Support</p>
                <p className="text-xs font-black text-slate-900 dark:text-white mt-0.5 select-all">support@tradefxbook.com</p>
              </div>
            </div>
            <button type="button" onClick={() => { navigator.clipboard.writeText("support@tradefxbook.com"); alert("Support email copied to clipboard!"); }} className="text-blue-500 hover:text-blue-600 transition-colors bg-transparent border-none font-bold text-xs p-1 outline-none cursor-pointer">Copy</button>
          </div>

          {/* Secondary Social Channels Row */}
          <div className="grid grid-cols-2 gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="p-3 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1e293b]/40 transition-colors text-slate-700 dark:text-gray-300">
              <FiTwitter className="text-blue-400 text-base shrink-0" />
              <div className="min-w-0"><p className="font-bold text-[11px] leading-tight text-gray-900 dark:text-white">Twitter / X</p><p className="text-[10px] text-gray-400 font-normal truncate">@TradeFXBook</p></div>
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-3 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1e293b]/40 transition-colors text-slate-700 dark:text-gray-300">
              <FiMessageSquare className="text-indigo-500 text-base shrink-0" />
              <div className="min-w-0"><p className="font-bold text-[11px] leading-tight text-gray-900 dark:text-white">Discord</p><p className="text-[10px] text-gray-400 font-normal">Join Community</p></div>
            </a>
          </div>

          {/* Infrastructure status system line */}
          <div className="p-2.5 bg-green-500/5 border border-green-500/10 rounded-xl flex justify-between items-center text-[10px] font-bold text-green-600 dark:text-green-400">
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> All Systems Operational</div>
            <span className="opacity-60 font-medium">Updated just now</span>
          </div>
        </div>
        {/* RIGHT COLUMN: EXPECTATIONS MATRICES SUMMARY */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></span> Support Expectations
            </h3>
            <p className="text-gray-400 font-normal leading-relaxed mt-1">
              Need a hand with your account, billing, or broker terminal data sync? Reach out to our operators and we will guide you through the setup steps.
            </p>
          </div>

          {/* Expectations checklist stack layout */}
          <div className="space-y-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-50 dark:border-gray-800/40">
              <span className="text-blue-500 font-black">✓</span> <span><strong>Email Support:</strong> Contact support@tradefxbook.com for targeted account level interventions.</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-50 dark:border-gray-800/40">
              <span className="text-blue-500 font-black">✓</span> <span><strong>Response Times:</strong> Most support inquiries receive a reply dashboard solution within 24 hours.</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50/50 dark:bg-[#1e293b]/20 border border-gray-50 dark:border-gray-800/40">
              <span className="text-blue-500 font-black">✓</span> <span><strong>Secure Assistance:</strong> We exclusively operate through verified, account-linked communications channels.</span>
            </div>
          </div>

          <button onClick={() => window.location.href = "mailto:support@tradefxbook.com"} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-xs cursor-pointer border-none outline-none flex items-center justify-center gap-2 text-xs">
            <FiMail /> Contact Support Desk Channel
          </button>
        </div>

      </div>

      {/* ==================== 3. FAQ ACCORDION INTERACTIVE ELEMENT WRAPPER ==================== */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-sm shadow-3xs">
            <FiInfo />
          </div>
          <div>
            <h3 className="font-black text-sm text-gray-900 dark:text-white">Frequently Asked Questions</h3>
            <p className="text-[11px] text-gray-400 font-medium">Quick automated troubleshooting answers to common platform questions</p>
          </div>
        </div>

        {/* 2-Column Responsive FAQ Accordion Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {[
            {
              id: 1,
              category: "GETTING STARTED",
              q: "How do I connect my MT5 account?",
              a: "Navigate to Profile → Accounts tab, click 'Connect Account', and enter your MT5 credentials. We use MetaAPI for secure, read-only access to your trading data."
            },
            {
              id: 2,
              category: "TROUBLESHOOTING",
              q: "Why are my trades not syncing?",
              a: "Ensure your broker is supported by MetaAPI, your credentials are correct, and your account has active trading history logs. Try disconnecting and reconnecting your account if cache latencies continue."
            },
            {
              id: 3,
              category: "SECURITY",
              q: "How is my data protected?",
              a: "We use bank-level encryption, never store your broker passwords, and only have read-only access to your trading data. Your data is never shared with third parties."
            },
            {
              id: 4,
              category: "FEATURES",
              q: "Can I export my journal entries?",
              a: "Yes! Go to Journal → click the export button in the top right. You can export as CSV, PDF, or JSON format for your records."
            },
            {
              id: 5,
              category: "BILLING",
              q: "What's included in the Pro plan?",
              a: "Pro includes up to 3 connected MT4/MT5 accounts, unlimited trade history, advanced analytics, AI trade insights (coming soon), and priority support. Upgrade to Elite for unlimited accounts and multi-account views. Cancel anytime."
            },
            {
              id: 6,
              category: "BILLING",
              q: "How do I cancel my subscription?",
              a: "Go to Profile → Billing tab and click 'Manage Subscription'. You can cancel anytime and will retain access until the end of your billing period."
            },
            {
              id: 7,
              category: "GETTING STARTED",
              q: "What brokers are supported?",
              a: "We support all brokers compatible with MetaAPI, which includes most major MT4/MT5 brokers worldwide. Check MetaAPI's broker list for full compatibility."
            },
            {
              id: 8,
              category: "ACCOUNT",
              q: "How do I reset my password?",
              a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox. For security, links expire after 1 hour."
            }
          ].map((item) => {
            const isNodeExpanded = expandedFaqId === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => toggleFaqNode(item.id)}
                className={`border rounded-xl p-3.5 text-left transition-all cursor-pointer select-none space-y-1.5 h-max ${
                  isNodeExpanded 
                    ? "border-amber-400 bg-amber-500/5 ring-2 ring-amber-400/5" 
                    : "border-gray-100 dark:border-gray-800/80 hover:bg-gray-50/50 dark:hover:bg-[#1e293b]/30"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-sm block w-max uppercase">{item.category}</span>
                    <p className="font-bold text-gray-900 dark:text-white leading-tight text-xs pt-0.5">{item.q}</p>
                  </div>
                  <span className="text-gray-400 p-1 shrink-0 bg-gray-50 dark:bg-[#1e293b] rounded-lg text-xs flex items-center justify-center">
                    {isNodeExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>

                {isNodeExpanded && (
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] font-normal leading-relaxed pt-2 border-t border-dashed border-gray-100 dark:border-gray-800/60 animate-fadeIn">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
