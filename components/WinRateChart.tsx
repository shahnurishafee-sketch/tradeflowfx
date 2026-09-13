"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WinRateChart() {
  const data = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        data: [62, 38],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { labels: { color: "#94a3b8" } } },
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Win Rate</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
}
