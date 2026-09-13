"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function AISentiment() {
  const data = {
    labels: ["Bullish", "Bearish"],
    datasets: [
      {
        data: [68, 32],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">AI Market Sentiment</h3>
      <Doughnut data={data} />
    </div>
  );
}
