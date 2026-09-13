"use client";

import { Bar } from "react-chartjs-2";

export default function TradeHeatmap() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Trades",
        data: [12, 18, 9, 14, 22],
        backgroundColor: ["#06b6d4", "#06b6d4", "#06b6d4", "#06b6d4", "#06b6d4"],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Trade Distribution</h3>
      <Bar data={data} />
    </div>
  );
}
