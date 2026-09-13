export default function FAQSection() {
  const faqs = [
    { tag: "Getting Started", question: "How do I connect my MT5 account?" },
    { tag: "Troubleshooting", question: "Why are my trades not syncing?" },
    { tag: "Security", question: "How is my data protected?" },
    { tag: "Features", question: "Can I export my journal entries?" },
    { tag: "Billing", question: "What’s included in the Pro plan?" },
    { tag: "Billing", question: "How do I cancel my subscription?" },
    { tag: "Getting Started", question: "What brokers are supported?" },
    { tag: "Account", question: "How do I reset my password?" },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
      <p className="text-gray-500 text-sm mb-4">Quick answers to common questions.</p>

      <div className="grid grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
            <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded font-semibold">
              {f.tag}
            </span>
            <p className="mt-2 font-medium text-gray-700">{f.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
