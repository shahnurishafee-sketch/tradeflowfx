"use client";

export default function RecentActivity() {
  const activity = [
    {
      pair: "XAUUSD",
      action: "Closed Trade",
      result: "+$420",
      time: "2 hours ago",
    },
    {
      pair: "EURUSD",
      action: "Opened Trade",
      result: "-$50",
      time: "5 hours ago",
    },
    {
      pair: "GBPJPY",
      action: "Closed Trade",
      result: "+$310",
      time: "Yesterday",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                    border border-gray-200 dark:border-[#1e293b] p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activity.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 
                       bg-gray-50 dark:bg-[#1e293b] rounded-lg"
          >
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {item.pair}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.action}
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-lg font-bold ${
                  item.result.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.result}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
