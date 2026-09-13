export default function SupportExpectations() {
  const expectations = [
    { title: "Email Support", desc: "Contact support@tfftrading.com for help.", icon: "📧" },
    { title: "Response Times", desc: "Most emails are answered within 24 hours.", icon: "⏱️" },
    { title: "Secure Assistance", desc: "We only use secure support channels.", icon: "🔒" },
    { title: "FAQ First", desc: "Common questions are answered below.", icon: "📘" },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-bold">Support Expectations</h2>
      <p className="text-gray-500 text-sm">
        Need help with your account or billing? Our support team is here.
      </p>

      <div className="space-y-3 mt-4">
        {expectations.map((e, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-2">
            <div className="text-2xl">{e.icon}</div>
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-gray-500 text-sm">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-cyan-400 text-black font-semibold py-2 rounded-lg">
        Contact Support
      </button>
    </div>
  );
}
