"use client";

import { Doughnut } from "react-chartjs-2";

export default function RiskMeter() {
  const data = {
    labels: ["Risk"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#facc15", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Risk Meter</h3>
      <Doughnut data={data} />
      <p className="text-center mt-4 text-gray-600 font-semibold">Moderate Risk</p>
    </div>
  );
}
