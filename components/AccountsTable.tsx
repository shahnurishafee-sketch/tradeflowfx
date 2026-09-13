"use client";

import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";

export default function AccountsTable() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("accounts").select("*");
      setAccounts(data || []);
    }
    load();
  }, []);

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 border-b border-[#1f2937]">
          <th className="py-2 text-left">Name</th>
          <th className="py-2 text-left">Balance</th>
          <th className="py-2 text-left">Equity</th>
          <th className="py-2 text-left">Broker</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((a) => (
          <tr key={a.id} className="border-b border-[#1f2937]">
            <td className="py-2">{a.name}</td>
            <td className="py-2">${a.balance}</td>
            <td className="py-2">${a.equity}</td>
            <td className="py-2">{a.broker}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
