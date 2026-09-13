"use client";

import { useState } from "react";

export default function Trades() {
  const initialTrades = [
    { id: 1, pair: "XAUUSD", type: "Buy", entry: 2430.5, exit: 2450.2, pnl: 195, date: "2024-06-01" },
    { id: 2, pair: "NAS100", type: "Sell", entry: 18900, exit: 18840, pnl: 120, date: "2024-06-02" },
    { id: 3, pair: "BTCUSD", type: "Buy", entry: 61000, exit: 61200, pnl: 200, date: "2024-06-03" },
    { id: 4, pair: "XAUUSD", type: "Sell", entry: 2440, exit: 2430, pnl: -100, date: "2024-06-04" },
  ];

  const [trades, setTrades] = useState(initialTrades);
  const [search, setSearch] = useState("");
  const [pairFilter, setPairFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [pnlFilter, setPnlFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTrades = trades.filter((t) => {
    const matchesSearch =
      t.pair.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase());

    const matchesPair = pairFilter ? t.pair === pairFilter : true;
    const matchesType = typeFilter ? t.type === typeFilter : true;

    const matchesPnL =
      pnlFilter === "profit"
        ? t.pnl > 0
        : pnlFilter === "loss"
        ? t.pnl < 0
        : true;

    const matchesDateFrom = dateFrom ? t.date >= dateFrom : true;
    const matchesDateTo = dateTo ? t.date <= dateTo : true;

    return (
      matchesSearch &&
      matchesPair &&
      matchesType &&
      matchesPnL &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const exportCSV = () => {
    const header = "ID,Pair,Type,Entry,Exit,PnL,Date\n";
    const rows = filteredTrades
      .map((t) => `${t.id},${t.pair},${t.type},${t.entry},${t.exit},${t.pnl},${t.date}`)
      .join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "trades.csv";
    a.click();
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-6">Trades</h3>

      {/* Filters */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search pair or type..."
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={pairFilter}
          onChange={(e) => setPairFilter(e.target.value)}
        >
          <option value="">All Pairs</option>
          <option value="XAUUSD">XAUUSD</option>
          <option value="NAS100">NAS100</option>
          <option value="BTCUSD">BTCUSD</option>
        </select>

        <select
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>

        <select
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={pnlFilter}
          onChange={(e) => setPnlFilter(e.target.value)}
        >
          <option value="">PnL</option>
          <option value="profit">Profit</option>
          <option value="loss">Loss</option>
        </select>

        <input
          type="date"
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />

        <input
          type="date"
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      {/* Export Button */}
      <button
        onClick={exportCSV}
        className="mb-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
      >
        Export CSV
      </button>

      {/* Table */}
      <table className="w-full text-left text-slate-300">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            <th className="py-2">Pair</th>
            <th className="py-2">Type</th>
            <th className="py-2">Entry</th>
            <th className="py-2">Exit</th>
            <th className="py-2">PnL</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.map((t) => (
            <tr key={t.id} className="hover:bg-slate-800 transition">
              <td className="py-2 font-semibold text-slate-100">{t.pair}</td>
              <td className="py-2">{t.type}</td>
              <td className="py-2">{t.entry}</td>
              <td className="py-2">{t.exit}</td>
              <td
                className={`py-2 font-bold ${
                  t.pnl > 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {t.pnl}
              </td>
              <td className="py-2 text-slate-400">{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTrades.length === 0 && (
        <p className="text-slate-500 text-center py-6">No trades found.</p>
      )}
    </div>
  );
}
