"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// REGISTER REQUIRED CHART.JS COMPONENTS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function PerformanceChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Equity Curve",
        data: [1000, 1800, 2400, 2100, 3200, 4800],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm 
                    border border-gray-200 dark:border-[#1e293b] p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Performance Overview
      </h3>
      <Line data={data} />
    </div>
  );
}
