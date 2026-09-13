export default function RecentTrades() {
  const trades = [
    { pair: "XAUUSD", result: "+$120", type: "Buy" },
    { pair: "NAS100", result: "-$40", type: "Sell" },
    { pair: "BTCUSD", result: "+$310", type: "Buy" },
  ];

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Recent Trades</h3>

      <div className="space-y-3">
        {trades.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-slate-800 p-3 rounded-lg"
          >
            <span className="font-semibold text-slate-100">{t.pair}</span>
            <span
              className={`font-bold ${
                t.result.startsWith("+") ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {t.result}
            </span>
            <span className="text-slate-400">{t.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
