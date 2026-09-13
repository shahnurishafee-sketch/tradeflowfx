"use client";
import { useEffect, useState } from "react";
import { fetchEconomicNews } from "@/lib/news/economicNews";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchEconomicNews().then(setNews);
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded">
      <h2 className="text-xl mb-2">Economic Calendar</h2>
      {news.map((n) => (
        <div key={n.id} className="border-b border-gray-700 py-2">
          <strong>{n.title}</strong> ({n.country}) — {n.impact}
        </div>
      ))}
    </div>
  );
}
