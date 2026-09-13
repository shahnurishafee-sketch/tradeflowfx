export default function FeatureComparison() {
  const features = [
    { feature: "Daily AI Market Summary", free: true, pro: true, elite: true },
    { feature: "Advanced Trade Analytics", free: false, pro: true, elite: true },
    { feature: "Smart Journal Insights", free: false, pro: true, elite: true },
    { feature: "AI Trade Recommendations", free: false, pro: false, elite: true },
    { feature: "Priority Support", free: false, pro: false, elite: true },
    { feature: "Exclusive Lounge Access", free: false, pro: true, elite: true },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Compare Features</h3>

      <div className="grid grid-cols-4 gap-4 text-center font-semibold text-gray-700 mb-4">
        <div>Feature</div>
        <div>Free</div>
        <div>Pro</div>
        <div>Elite</div>
      </div>

      <div className="space-y-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 items-center text-center bg-gray-50 p-3 rounded-lg border border-gray-200"
          >
            <div className="text-gray-700 font-medium">{f.feature}</div>
            <div>{f.free ? "✔️" : "—"}</div>
            <div>{f.pro ? "✔️" : "—"}</div>
            <div>{f.elite ? "✔️" : "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
