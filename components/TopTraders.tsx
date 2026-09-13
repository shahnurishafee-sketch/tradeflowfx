export default function TopTraders() {
  const top = [
    { name: "Trader A", pnl: "$12,400", rank: 1 },
    { name: "Trader B", pnl: "$9,800", rank: 2 },
    { name: "Trader C", pnl: "$7,300", rank: 3 }
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Top Traders</h3>

      <div className="space-y-3">
        {top.map((t) => (
          <div
            key={t.rank}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
          >
            <span className="font-semibold">{t.rank}. {t.name}</span>
            <span className="text-green-600 font-bold">{t.pnl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
