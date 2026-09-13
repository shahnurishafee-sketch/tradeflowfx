export default function DashboardStats() {
  const stats = [
    { label: "Total Trades", value: 128 },
    { label: "Win Rate", value: "62%" },
    { label: "Monthly Profit", value: "$4,820" },
    { label: "Risk Score", value: "Moderate" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                     border border-gray-200 dark:border-[#1e293b] p-4"
        >
          <div className="text-gray-500 dark:text-gray-400 text-sm">{s.label}</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
