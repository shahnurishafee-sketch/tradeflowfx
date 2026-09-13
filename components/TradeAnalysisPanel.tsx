export default function TradeAnalysisPanel() {
  const filters = ["All", "Winners", "Losers", "BE"];

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-bold">Trade Analysis</h2>

        <div className="flex gap-2">
          {filters.map((f, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-lg text-sm ${
                f === "All"
                  ? "bg-cyan-400 text-black"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {f} (0)
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="Search symbol..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
          />
          <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
            <option>This Month</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
            <option>Date</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <div className="text-3xl mb-2">📈</div>
          <p className="font-medium">No trades found</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
        <div className="text-3xl mb-2">📊</div>
        <h3 className="font-semibold text-lg">Select a trade to analyze</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          Choose a trade from the list to view detailed analysis, performance
          metrics, and insights.
        </p>
      </div>
    </div>
  );
}
