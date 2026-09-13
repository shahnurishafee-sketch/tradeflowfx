"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface DrawdownChartProps {
  accountId: string; // This maps directly to your account's loginId string variable
}

interface DrawdownPoint {
  timestamp: string;
  dd: number;
}

export default function DrawdownChart({ accountId }: DrawdownChartProps) {
  const [rows, setRows] = useState<DrawdownPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDrawdownTimeline() {
      if (!accountId) return;
      setIsLoading(true);
      
      try {
        const res = await fetch(`/api/dashboard/drawdown?loginId=${accountId}`);
        const contentType = res.headers.get("content-type") || "";
        
        if (contentType.includes("application/json")) {
          const data = await res.json();
          setRows(data.points || []);
        }
      } catch (err) {
        console.error("Failed loading drawdown timeline data values:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDrawdownTimeline();
  }, [accountId]);

  const data = {
    labels: rows.map((r) => r.timestamp),
    datasets: [
      {
        label: "Drawdown %",
        data: rows.map((r) => r.dd),
        borderColor: "#f97316",
        backgroundColor: "rgba(249,115,22,0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: rows.length > 20 ? 0 : 2, // Cleans line visuals on extensive trade loops
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { 
        ticks: { 
          color: "#9ca3af",
          callback: (value: any) => `${value}%` // Appends percent indicator to the Y-axis ticks
        }, 
        grid: { color: "rgba(255,255,255,0.05)" } 
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-[#0d1117] h-64 rounded-lg flex items-center justify-center text-xs text-slate-500 font-bold">
        Synchronizing Drawdown Matrix Timelines...
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] p-4 rounded-lg h-64">
      {rows.length === 0 ? (
        <div className="h-full flex items-center justify-center text-xs text-slate-500 font-bold">
          No trading statistics history recorded on this server cluster yet.
        </div>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}
