"use client";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function BarReplay({ data }) {
  const chartContainer = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainer.current, { width: 800, height: 400 });
    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(data);
  }, [data]);

  return <div ref={chartContainer} />;
}
