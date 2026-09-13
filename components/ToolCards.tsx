export default function ToolCards() {
  const tools = [
    { name: "Position Size Calculator", status: "Available Soon" },
    { name: "Risk Management Suite", status: "Available Soon" },
    { name: "Trade Replay Engine", status: "Available Soon" },
    { name: "Pattern Scanner", status: "Available Soon" }
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Available Tools</h3>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <h4 className="font-semibold">{tool.name}</h4>
            <p className="text-gray-500 text-sm mt-1">{tool.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
