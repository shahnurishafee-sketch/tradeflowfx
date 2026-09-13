"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignalsPage() {
  const [signals, setSignals] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("signals")
        .select("*")
        .order("created_at", { ascending: false });

      setSignals(data || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Signals</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Dir</th>
            <th>Entry</th>
            <th>SL</th>
            <th>TP</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((s) => (
            <tr key={s.id}>
              <td>{s.symbol}</td>
              <td>{s.direction}</td>
              <td>{s.entry}</td>
              <td>{s.sl}</td>
              <td>{s.tp}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
