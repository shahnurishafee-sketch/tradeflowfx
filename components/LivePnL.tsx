"use client";

import { useEffect, useState } from "react";

export default function LivePnL() {
  const [pnl, setPnl] = useState(4820);

  useEffect(() => {
    const interval = setInterval(() => {
      setPnl((p) => p + (Math.random() * 20 - 10));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold">Live PnL</h3>
      <div className="text-4xl font-extrabold mt-4 text-green-600">
        ${pnl.toFixed(2)}
      </div>
      <p className="text-gray-500 text-sm mt-2">Auto‑updated every few seconds</p>
    </div>
  );
}
