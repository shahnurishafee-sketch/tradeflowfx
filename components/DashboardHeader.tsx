"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow border border-gray-200 dark:border-[#1e293b] p-4 flex items-center justify-between relative">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Your trading performance summary and recent activity.
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-full 
                     bg-[#0f172a] hover:bg-[#1e293b] border border-[#1e293b] 
                     transition shadow-sm"
        >
          <Image
            src="/default-avatar.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-white">Profile</span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-3 w-64 rounded-xl 
                       bg-[#0f172a] border border-[#1e293b] 
                       shadow-xl shadow-black/30 z-50 animate-fadeIn"
          >
            <div className="px-4 py-4 border-b border-[#1e293b]">
              <p className="font-semibold text-white text-base">Mohammadshafee Wasta</p>
              <p className="text-xs text-gray-400">wmohammadshafee@gmail.com</p>
            </div>

            <ul className="py-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e293b] hover:text-white transition"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e293b] hover:text-white transition"
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/subscription")}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e293b] hover:text-white transition"
                >
                  Subscription
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/support")}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e293b] hover:text-white transition"
                >
                  Help & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/logout")}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e293b] text-red-400 hover:text-red-300 transition"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
