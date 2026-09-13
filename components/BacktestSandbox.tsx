// components/BacktestSandbox.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { generateMockHistory, Candle } from "@/lib/mockData";

export default function BacktestSandbox() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [masterData] = useState<Candle[]>(() => generateMockHistory());
  const [currentBarIndex, setCurrentBarIndex] = useState(60); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); 

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 480,
      layout: {
        background: { color: "#0c1017" }, 
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#10b981",    
      downColor: "#ef4444",  
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    const initialTimeline = masterData.slice(0, currentBarIndex);
    candlestickSeries.setData(initialTimeline);

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 480);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentBarIndex((prevIndex) => {
          if (prevIndex >= masterData.length) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            return prevIndex;
          }

          const nextCandle = masterData[prevIndex];
          if (seriesRef.current) {
            seriesRef.current.update(nextCandle);
          }
          return prevIndex + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, masterData]);

  const handleStepForward = () => {
    if (currentBarIndex >= masterData.length || !seriesRef.current) return;
    const nextCandle = masterData[currentBarIndex];
    seriesRef.current.update(nextCandle);
    setCurrentBarIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-[#090d14] border border-slate-800 p-4 rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111724] p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded">
            🟢 Replay System Ready
          </span>
          <span className="text-sm font-medium text-slate-300">
            Bars Visible: {currentBarIndex} / {masterData.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-5 py-2 font-semibold text-sm rounded transition-all ${
              isPlaying ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>

          <button 
            onClick={handleStepForward} 
            disabled={isPlaying} 
            className="px-4 py-2 bg-slate-700 text-slate-200 text-sm font-medium rounded hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 transition"
          >
            ⏭️ +1 Bar
          </button>

          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))} 
            className="bg-slate-800 text-slate-200 text-sm p-2 rounded border border-slate-700 outline-none"
          >
            <option value={1500}>0.5x Speed</option>
            <option value={1000}>1.0x Speed</option>
            <option value={400}>2.5x Speed</option>
          </select>
        </div>
      </div>

      <div ref={chartContainerRef} className="w-full h-[480px] rounded-lg overflow-hidden" />
    </div>
  );
}
