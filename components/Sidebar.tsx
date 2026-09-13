"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Trades", href: "/dashboard/trades", icon: "💼" },
  { label: "Journal", href: "/dashboard/journal", icon: "📝" },
  { label: "Performance", href: "/dashboard/analytics", icon: "📈" }, 
  { label: "Trade Analysis", href: "/dashboard/analytics/trade-analysis", icon: "📉" }, 
  { label: "Market", href: "/dashboard/market", icon: "🌍" },
  { label: "AI Report", href: "/dashboard/ai-report", icon: "🤖", badge: "PRO", badgeColor: "bg-blue-500/10 text-blue-500 border border-blue-500/20" },
  // 🟢 NEW BACKTESTING NODE LINK INSERTED RIGHT HERE WITH ELITE STATUS BADGE
  { label: "Backtesting", href: "/dashboard/backtesting", icon: "🧪", badge: "ELITE", badgeColor: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  { label: "Traders Lounge", href: "/dashboard/lounge", icon: "💬" },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: "🏆" },
  { label: "Tools", href: "/dashboard/tools", icon: "🧰" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { label: "Help & Support", href: "/dashboard/help-support", icon: "❓" },
  { label: "Subscription", href: "/dashboard/subscription", icon: "💳" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-[#020617]/80 backdrop-blur-xl text-slate-900 dark:text-gray-100 min-h-screen p-4 border-r border-gray-200 dark:border-white/10 transition-colors duration-200">
      <div className="text-xl font-bold mb-6 tracking-wide text-slate-900 dark:text-white px-3">
        TFF Dashboard
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          // Precise active route tracker that balances single levels and deep nested paths correctly
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all font-medium cursor-pointer
                ${active 
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20" 
                  : "text-slate-600 dark:text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg flex items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </div>

              {/* 🟢 DYNAMIC BADGE RENDER SYSTEM */}
              {item.badge && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md tracking-wider uppercase ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
