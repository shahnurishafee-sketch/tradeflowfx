"use client";

export default function OpenPositions() {
  const positions = [
    {
      pair: "XAUUSD",
      type: "Buy",
      lots: 1.20,
      entry: 2320.50,
      current: 2334.20,
      pnl: "+$820",
    },
    {
      pair: "EURUSD",
      type: "Sell",
      lots: 0.80,
      entry: 1.0860,
      current: 1.0892,
      pnl: "-$256",
    },
    {
      pair: "GBPJPY",
      type: "Buy",
      lots: 0.50,
      entry: 182.40,
      current: 183.10,
      pnl: "+$350",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                    border border-gray-200 dark:border-[#1e293b] p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Open Positions
      </h3>

      <div className="space-y-4">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 
                       bg-gray-50 dark:bg-[#1e293b] rounded-lg"
          >
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {pos.pair}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {pos.type} • {pos.lots} lots
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Entry: {pos.entry}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Current: {pos.current}
              </div>
              <div
                className={`text-lg font-bold ${
                  pos.pnl.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {pos.pnl}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
