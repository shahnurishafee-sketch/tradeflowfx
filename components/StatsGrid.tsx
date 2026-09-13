"use client";

import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";

export default function StatsGrid({ accountId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("stats")
        .select("*")
        .eq("account_id", accountId)
        .single();

      setStats(data);
    }

    load();
  }, [accountId]);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#161b22] p-5 rounded-xl shadow border border-[#1f2937]">
        <p className="text-sm text-gray-400">Win Rate</p>
        <h3 className="text-2xl font-bold text-green-400">{stats.win_rate}%</h3>
      </div>

      <div className="bg-[#161b22] p-5 rounded-xl shadow border border-[#1f2937]">
        <p className="text-sm text-gray-400">Total Profit</p>
        <h3 className="text-2xl font-bold text-green-400">${stats.total_profit}</h3>
      </div>

      <div className="bg-[#161b22] p-5 rounded-xl shadow border border-[#1f2937]">
        <p className="text-sm text-gray-400">Trades</p>
        <h3 className="text-2xl font-bold text-blue-400">{stats.trade_count}</h3>
      </div>
    </div>
  );
}
