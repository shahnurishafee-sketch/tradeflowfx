export default function StatsTable() {
  const stats = [
    { label: "Total Trades", value: "0" },
    { label: "Win Rate", value: "0%" },
    { label: "Profit Factor", value: "0.00" },
    { label: "Average Win", value: "$0.00" },
    { label: "Average Loss", value: "$0.00" },
    { label: "Largest Win", value: "$0.00" },
    { label: "Largest Loss", value: "$0.00" },
    { label: "Expectancy", value: "$0.00" },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>

      <table className="w-full text-sm">
        <tbody>
          {stats.map((s, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-2 font-medium text-gray-700">{s.label}</td>
              <td className="py-2 text-gray-500 text-right">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
