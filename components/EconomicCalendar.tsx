"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EconomicCalendar() {
  const [events, setEvents] = useState([]);

  const fetchAndStoreEvents = async () => {
    const res = await fetch("/api/economic-events");
    const data = await res.json();

    if (!Array.isArray(data)) return;

    for (const e of data.slice(0, 10)) {
      await supabase.from("market_events").upsert({
        date: e.date,
        country: e.country,
        event: e.event,
        actual: e.actual,
        forecast: e.forecast,
        previous: e.previous,
      });
    }

    const { data: stored } = await supabase
      .from("market_events")
      .select("*")
      .order("date", { ascending: false })
      .limit(10);

    setEvents(stored || []);
  };

  useEffect(() => {
    fetchAndStoreEvents();
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Economic Calendar</h3>
      {events.length === 0 ? (
        <p className="text-slate-400">No economic events available yet.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="text-slate-300">
              <span className="font-semibold">{e.country}</span> — {e.event}
              <span className="text-slate-400 ml-2">
                ({e.date.substring(0, 10)} • {e.actual || "Pending"})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
