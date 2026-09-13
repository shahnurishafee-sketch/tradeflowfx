export default function SummaryCards() {
  const cards = [
    { label: "Total Trades", value: "0", color: "text-cyan-500" },
    { label: "Win Rate", value: "0%", color: "text-green-500" },
    { label: "Profit Factor", value: "0.00", color: "text-purple-500" },
    { label: "Net P/L", value: "$0.00", color: "text-gray-700" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow border border-gray-200 p-6 text-center"
        >
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          <p className="text-gray-500 text-sm">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
