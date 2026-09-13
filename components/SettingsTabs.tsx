"use client";

import { useState } from "react";

export default function SettingsTabs() {
  const tabs = ["Profile", "Privacy", "Notifications", "Security"];
  const [active, setActive] = useState("Profile");

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mb-6">
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              active === tab
                ? "bg-cyan-500 text-black font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 text-gray-500 text-sm">
        Selected tab: <span className="font-semibold">{active}</span>
      </div>
    </div>
  );
}
