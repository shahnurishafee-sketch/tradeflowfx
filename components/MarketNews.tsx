"use client";
import { useEffect, useState } from "react";

export default function MarketNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("/api/market-news");
      const data = await res.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Market News</h3>
      {news.length === 0 ? (
        <p className="text-slate-400">No market news available yet.</p>
      ) : (
        <ul className="space-y-3">
          {news.map((n) => (
            <li key={n.uuid}>
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {n.title}
              </a>
              <p className="text-slate-400 text-sm">{n.source}</p>
              <p className="text-slate-500 text-xs">
                {new Date(n.published_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
