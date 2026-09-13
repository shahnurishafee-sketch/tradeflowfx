export default function PerformanceHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <p className="text-gray-500 text-sm">
          Track your trading performance with detailed insights.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center border border-gray-200">
          <p className="text-3xl font-bold text-cyan-500">0</p>
          <p className="text-gray-500 text-sm">Trades</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center border border-gray-200">
          <p className="text-3xl font-bold text-gray-400">0%</p>
          <p className="text-gray-500 text-sm">Win Rate</p>
        </div>
      </div>
    </div>
  );
}
