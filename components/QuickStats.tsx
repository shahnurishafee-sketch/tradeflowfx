export default function QuickStats() {
  const stats = [
    { label: "Avg Trade Duration", value: "2h 14m" },
    { label: "Best Trade", value: "$920" },
    { label: "Worst Trade", value: "-$310" },
    { label: "Sharpe Ratio", value: "1.42" },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                    border border-gray-200 dark:border-[#1e293b] p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Quick Stats
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-[#1e293b] rounded-lg">
            <div className="text-gray-500 dark:text-gray-400 text-sm">{s.label}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
