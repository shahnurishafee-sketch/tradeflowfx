"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AccountSelector({
  userId,
  onChange,
}: {
  userId: string;
  onChange: (id: string) => void;
}) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", userId);

      setAccounts(data || []);
      if (data?.[0]) {
        setSelected(data[0].id);
        onChange(data[0].id);
      }
    }
    load();
  }, [userId, onChange]);

  return (
    <select
      className="bg-slate-900 border border-slate-700 p-2 rounded"
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        onChange(e.target.value);
      }}
    >
      {accounts.map((a) => (
        <option key={a.id} value={a.id}>
        {a.name} ({a.broker})
        </option>
      ))}
    </select>
  );
}
