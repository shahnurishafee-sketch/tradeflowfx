export default function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Basic access for new traders",
      features: ["Daily Market Summary", "Basic Journal", "Limited Analytics"],
      color: "border-gray-300"
    },
    {
      name: "Pro",
      price: "$29/mo",
      desc: "Advanced tools for active traders",
      features: [
        "Advanced Analytics",
        "Smart Journal Insights",
        "Community Lounge Access",
        "AI Market Summary"
      ],
      color: "border-cyan-500"
    },
    {
      name: "Elite",
      price: "$79/mo",
      desc: "Full access + AI automation",
      features: [
        "AI Trade Recommendations",
        "Elite Lounge Access",
        "Priority Support",
        "Full Analytics Suite"
      ],
      color: "border-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow border ${plan.color} p-6`}
        >
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-gray-500 text-sm">{plan.desc}</p>

          <div className="text-3xl font-extrabold mt-4">{plan.price}</div>

          <ul className="mt-4 space-y-2 text-gray-700 text-sm">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                ✔️ {f}
              </li>
            ))}
          </ul>

          <button className="mt-6 w-full bg-cyan-500 text-black font-semibold py-2 rounded-lg hover:bg-cyan-400">
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
}
