export default function TopAssets() {
  const assets = [
    { name: "XAUUSD", gain: "+4.2%" },
    { name: "BTCUSD", gain: "+7.8%" },
    { name: "NAS100", gain: "+2.1%" },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Top Performing Assets</h3>

      <div className="space-y-3">
        {assets.map((a, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="font-semibold">{a.name}</span>
            <span className="text-green-600 font-bold">{a.gain}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
