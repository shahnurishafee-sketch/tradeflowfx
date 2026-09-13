"use client";

export default function TopPerformers() {
  const performers = [
    {
      name: "Trader Alpha",
      profit: "$12,400",
      winRate: "78%",
    },
    {
      name: "Trader Beta",
      profit: "$9,850",
      winRate: "71%",
    },
    {
      name: "Trader Gamma",
      profit: "$7,420",
      winRate: "69%",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                    border border-gray-200 dark:border-[#1e293b] p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Top Performers
      </h3>

      <div className="space-y-4">
        {performers.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 
                       bg-gray-50 dark:bg-[#1e293b] rounded-lg"
          >
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {p.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Win Rate: {p.winRate}
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-green-500">
                {p.profit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
