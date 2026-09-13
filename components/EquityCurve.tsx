"use client";

import { useEffect, useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface EquityCurveProps {
  accountId: string; // The active MetaTrader/Exness Account login string reference
}

interface EquityPoint {
  timestamp: string;
  equity: number;
}

export default function EquityCurve({ accountId }: EquityCurveProps) {
  const [rows, setRows] = useState<EquityPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEquityHistory() {
      if (!accountId) return;
      setIsLoading(true);

      try {
        const res = await fetch(`/api/dashboard/equity?loginId=${accountId}`);
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const data = await res.json();
          setRows(data.points || []);
        }
      } catch (err) {
        console.error("Failed loading equity curve timeline data values:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadEquityHistory();
  }, [accountId]);

  const data = {
    labels: rows.map((r) => r.timestamp),
    datasets: [
      {
        label: "Account Equity ($)",
        data: rows.map((r) => r.equity),
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.1)",
        tension: 0.4,
        borderWidth: 3,
        fill: true,
        pointRadius: rows.length > 30 ? 0 : 2, // Smooths out line rendering for thick trading records
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { labels: { color: "#94a3b8" } } 
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } },
      y: { 
        ticks: { 
          color: "#94a3b8",
          callback: (value: any) => `$${value.toLocaleString()}` // Prefixes dollar signs to currency metrics
        }, 
        grid: { color: "#1e293b" } 
      },
    },
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6 h-96 flex flex-col">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Equity Curve</h3>
      
      <div className="flex-1 relative min-h-0">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-bold">
            Synchronizing Broker Equity Balances...
          </div>
        ) : rows.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-bold">
            No live equity balance movements indexed on this terminal channel yet.
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}
