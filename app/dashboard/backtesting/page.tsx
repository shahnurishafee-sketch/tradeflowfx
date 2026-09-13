"use client";

import React, { useState, useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

interface ActiveTrade {
  type: "BUY" | "SELL";
  entry: number;
  time: string | any;
  lotSize: number;
}

interface ClosedTradeLog {
  type: "BUY" | "SELL";
  entry: number;
  exit: number;
  time: string | any;
  profit: number;
  lotSize: number;
}

interface DrawingObject {
  id: string;
  type: "trendline" | "horizontal" | "rectangle" | "fibonacci";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface BacktestSession {
  id: string;
  name: string;
  symbol: string;
  timeframe: string;
  savedIndex: number;
  balance: number;
}

// Multi-Asset Catalog map aligning with accurate market valuations
const ASSET_CATALOG: Record<string, { price: number; variance: number; contractMultiplier: number }> = {
  "XAUUSD (Gold Spot)": { price: 4470.00, variance: 28, contractMultiplier: 100 },
  "EURUSD (Euro / Dollar)": { price: 1.1620, variance: 0.0045, contractMultiplier: 100000 },
  "BTCUSD (Bitcoin / Dollar)": { price: 77000.00, variance: 650, contractMultiplier: 1 }
};

const generateAssetHistory = (assetName: string): Candle[] => {
  const data: Candle[] = [];
  const meta = ASSET_CATALOG[assetName] || ASSET_CATALOG["XAUUSD (Gold Spot)"];
  let basePrice = meta.price;
  let currentDate = new Date(2026, 0, 1);
  const precision = assetName.includes("EURUSD") ? 4 : 2;

  for (let i = 0; i < 300; i++) {
    const change = (Math.random() - 0.495) * meta.variance;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + (Math.random() * (meta.variance / 2));
    const low = Math.min(open, close) - (Math.random() * (meta.variance / 2));
    const timeString = currentDate.toISOString().split('T')[0];

    data.push({
      time: timeString,
      open: parseFloat(open.toFixed(precision)),
      high: parseFloat(high.toFixed(precision)),
      low: parseFloat(low.toFixed(precision)),
      close: parseFloat(close.toFixed(precision))
    });

    basePrice = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

export default function AdvancedBacktestingReplayPage() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<any>(null);
  const candleSeriesRef = useRef<any>(null);
  const replayInterval = useRef<NodeJS.Timeout | null>(null);

  // --- INITIAL WORKFLOW CONFIG STATES ---
  const [isConfigured, setIsConfigured] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const [symbol, setSymbol] = useState("XAUUSD (Gold Spot)");
  const [timeframe, setTimeframe] = useState("1D");
  const [initialBalance, setInitialBalance] = useState(10000);
  const [runningBalance, setRunningBalance] = useState(10000);
  const [unrealizedPnL, setUnrealizedPnL] = useState(0);

  // --- RISK INPUT HOOK STATES ---
  const [lotSize, setLotSize] = useState<number>(1.0); 

  // --- REPLAY SYSTEM ENGINE CONTROLS ---
  const [masterData, setMasterData] = useState<Candle[]>(() => generateAssetHistory("XAUUSD (Gold Spot)"));
  const [currentBarIndex, setCurrentBarIndex] = useState(60); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); 

  // --- TRANSACTION BALANCES REGISTRIES ---
  const [activeTrade, setActiveTrade] = useState<ActiveTrade | null>(null);
  const [tradeLogs, setTradeLogs] = useState<ClosedTradeLog[]>([]);

  // --- DRAWING CANVAS ENGINE MATRICES ---
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [drawings, setDrawings] = useState<DrawingObject[]>([]);
  const [isDrawingNow, setIsDrawingNow] = useState(false);
  const [currentDrawing, setCurrentDrawing] = useState<DrawingObject | null>(null);

  const [savedSessions, setSavedSessions] = useState<BacktestSession[]>([
    { id: "1", name: "Gold Scalping Run 1", symbol: "XAUUSD (Gold Spot)", timeframe: "15m", savedIndex: 85, balance: 10450 },
    { id: "2", name: "FIBNYC Swing Core Layout", symbol: "EURUSD (Euro / Dollar)", timeframe: "1D", savedIndex: 120, balance: 9800 }
  ]);
  // 1. Initialize Lightweight-Charts Engine Canvas Wrapper Layout
  useEffect(() => {
    if (!isConfigured || !chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 480,
      layout: { background: { color: "#090d14" }, textColor: "#94a3b8" },
      grid: { vertLines: { color: "#161b26" }, horzLines: { color: "#161b26" } },
      timeScale: { borderVisible: false, timeVisible: true },
      rightPriceScale: { borderVisible: false },
    });

    const precision = symbol.includes("EURUSD") ? 4 : 2;
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981", downColor: "#ef4444", borderVisible: false,
      wickUpColor: "#10b981", wickDownColor: "#ef4444",
      priceFormat: { type: 'price', precision: precision },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candlestickSeries;

    const initialTimelineData = masterData.slice(0, currentBarIndex);
    candlestickSeries.setData(initialTimelineData);

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
  }, [isConfigured, masterData]);

  // --- SVG INTERCEPT DRAWING MOUSE TRIGGERS ---
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!activeTool || !svgOverlayRef.current) return;
    const rect = svgOverlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawingNow(true);
    setCurrentDrawing({
      id: Date.now().toString(),
      type: activeTool as any,
      startX: x, startY: y, endX: x, endY: y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawingNow || !currentDrawing || !svgOverlayRef.current) return;
    const rect = svgOverlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentDrawing((prev: any) => ({
      ...prev,
      endX: x,
      endY: prev.type === "horizontal" ? prev.startY : y,
    }));
  };

  const handleMouseUp = () => {
    if (!isDrawingNow || !currentDrawing) return;
    setDrawings((prev) => [...prev, currentDrawing]);
    setIsDrawingNow(false);
    setCurrentDrawing(null);
  };

  const selectDrawingTool = (toolName: string) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };

  const clearAllDrawings = () => {
    setDrawings([]);
    setCurrentDrawing(null);
  };

  const handleAssetSymbolChange = (nextAsset: string) => {
    setSymbol(nextAsset);
    setIsPlaying(false);
    if (activeTrade) handleClosePosition(); 
    
    const freshDataset = generateAssetHistory(nextAsset);
    setMasterData(freshDataset);
    setCurrentBarIndex(60);
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    setIsPlaying(false);
    setMasterData(generateAssetHistory(symbol)); 
    setCurrentBarIndex(60); 
  };
  // --- saved profile session persistence framework ---
  const handleSaveCurrentSession = () => {
    const newSession: BacktestSession = {
      id: Date.now().toString(),
      name: strategyName || `Session Run ${savedSessions.length + 1}`,
      symbol, timeframe, savedIndex: currentBarIndex, balance: runningBalance
    };
    setSavedSessions((prev) => [newSession, ...prev]);
    alert("Session checkpoint backed up safely! 💾");
  };

  const handleLoadSessionProfile = (session: BacktestSession) => {
    setStrategyName(session.name);
    setSymbol(session.symbol);
    setTimeframe(session.timeframe);
    setRunningBalance(session.balance);
    setMasterData(generateAssetHistory(session.symbol)); 
    setCurrentBarIndex(session.savedIndex);
    setIsConfigured(true);
    setIsPlaying(false);
  };

  // 2. Playback Clock Loop with Contract Multiplier Configurations
  useEffect(() => {
    if (isPlaying && isConfigured) {
      replayInterval.current = setInterval(() => {
        setCurrentBarIndex((prevIndex) => {
          if (prevIndex >= masterData.length) {
            clearInterval(replayInterval.current!);
            setIsPlaying(false);
            return prevIndex;
          }

          const nextCandle = masterData[prevIndex];
          if (candleSeriesRef.current) {
            candleSeriesRef.current.update(nextCandle);
          }

          if (activeTrade) {
            const multiplier = activeTrade.type === "BUY" ? 1 : -1;
            const assetConfig = ASSET_CATALOG[symbol] || ASSET_CATALOG["XAUUSD (Gold Spot)"];
            const floatingPnL = (nextCandle.close - activeTrade.entry) * multiplier * assetConfig.contractMultiplier * activeTrade.lotSize;
            setUnrealizedPnL(parseFloat(floatingPnL.toFixed(2)));
          }

          return prevIndex + 1;
        });
      }, speed);
    } else {
      if (replayInterval.current) clearInterval(replayInterval.current);
    }

    return () => {
      if (replayInterval.current) clearInterval(replayInterval.current);
    };
  }, [isPlaying, speed, isConfigured, activeTrade, masterData, symbol]);

  const handleStepForward = () => {
    if (currentBarIndex >= masterData.length || !candleSeriesRef.current) return;
    const nextCandle = masterData[currentBarIndex];
    candleSeriesRef.current.update(nextCandle);

    if (activeTrade) {
      const multiplier = activeTrade.type === "BUY" ? 1 : -1;
      const assetConfig = ASSET_CATALOG[symbol] || ASSET_CATALOG["XAUUSD (Gold Spot)"];
      const floatingPnL = (nextCandle.close - activeTrade.entry) * multiplier * assetConfig.contractMultiplier * activeTrade.lotSize;
      setUnrealizedPnL(parseFloat(floatingPnL.toFixed(2)));
    }
    setCurrentBarIndex((prev) => prev + 1);
  };

  const handleMarketExecution = (orderType: "BUY" | "SELL") => {
    if (activeTrade) return; 
    setActiveTrade({ 
      type: orderType, 
      entry: masterData[currentBarIndex - 1].close, 
      time: masterData[currentBarIndex - 1].time,
      lotSize: lotSize 
    });
  };

  const handleClosePosition = () => {
    if (!activeTrade) return;
    setRunningBalance((prev) => parseFloat((prev + unrealizedPnL).toFixed(2)));
    setTradeLogs((prev) => [...prev, { ...activeTrade, exit: masterData[currentBarIndex - 1].close, profit: unrealizedPnL }]);
    setActiveTrade(null);
    setUnrealizedPnL(0);
  };

  const winRateMetric = (() => {
    if (tradeLogs.length === 0) return 0;
    const wins = tradeLogs.filter(t => t.profit > 0).length;
    return Math.round((wins / tradeLogs.length) * 100);
  })();
  // HIGH-FIDELITY TRADINGVIEW FIBONACCI RETRACEMENT PLOT ENGINE
  const renderFibonacciLevels = (drawObj: DrawingObject) => {
    const levels = [
      { ratio: 1.618, fill: "rgba(33, 150, 243, 0.08)", line: "#2196f3", label: "1.618" },
      { ratio: 1.000, fill: "rgba(156, 39, 176, 0.08)",  line: "#9c27b0", label: "1" },
      { ratio: 0.786, fill: "rgba(233, 30, 99, 0.06)",   line: "#e91e63", label: "0.786" },
      { ratio: 0.660, fill: "rgba(244, 67, 54, 0.06)",   line: "#f44336", label: "0.66" },
      { ratio: 0.618, fill: "rgba(76, 175, 80, 0.06)",   line: "#4caf50", label: "0.618" },
      { ratio: 0.500, fill: "rgba(255, 152, 0, 0.06)",   line: "#ff9800", label: "0.5" },
      { ratio: 0.382, fill: "rgba(33, 150, 243, 0.06)",  line: "#2196f3", label: "0.382" },
      { ratio: 0.236, fill: "rgba(158, 158, 158, 0.06)", line: "#9e9e9e", label: "0.236" },
      { ratio: 0.000, fill: "rgba(158, 158, 158, 0.02)", line: "#9e9e9e", label: "0" }
    ];

    const totalHeight = drawObj.endY - drawObj.startY;
    const minX = 0;
    const maxX = chartContainerRef.current ? chartContainerRef.current.clientWidth : 800;
    const width = maxX - minX;

    const calculatePriceAtY = (yCoord: number) => {
      if (!candleSeriesRef.current) return "";
      try {
        const price = candleSeriesRef.current.coordinateToPrice(yCoord);
        const decimals = symbol.includes("EURUSD") ? 4 : 2;
        return price ? `(${price.toFixed(decimals)})` : "";
      } catch (e) { return ""; }
    };

    return (
      <g key={drawObj.id}>
        {levels.map((lvl, index) => {
          if (index === levels.length - 1) return null;
          const topY = drawObj.endY - (totalHeight * lvl.ratio);
          const nextY = drawObj.endY - (totalHeight * levels[index + 1].ratio);
          return (
            <rect key={`fib-band-${index}`} x={minX} y={Math.min(topY, nextY)} width={width} height={Math.abs(nextY - topY)} fill={lvl.fill} className="pointer-events-none" />
          );
        })}
        <line x1={drawObj.startX} y1={drawObj.startY} x2={drawObj.endX} y2={drawObj.endY} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.5} />
        {levels.map((lvl, index) => {
          const currentY = drawObj.endY - (totalHeight * lvl.ratio);
          const computedPriceString = calculatePriceAtY(currentY);
          return (
            <g key={`fib-lvl-${index}`}>
              <line x1={minX} y1={currentY} x2={maxX} y2={currentY} stroke={lvl.line} strokeWidth={1} opacity={0.6} />
              <text x={drawObj.startX + 15} y={currentY - 6} fill={lvl.line} fontSize={11} className="font-mono font-medium select-none" opacity={0.85}>
                {`${lvl.label} ${computedPriceString}`}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  if (!isConfigured) {
    return (
      <div className="flex flex-col xl:flex-row items-center justify-center min-h-[85vh] text-slate-200 p-6 gap-8 bg-[#05070c]">
        <div className="bg-[#111724] border border-slate-800 p-8 rounded-2xl max-w-md w-full flex flex-col gap-5 shadow-2xl">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-lg">⚙️ Setup Backtesting Session</div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">Strategy Name</label>
            <input type="text" value={strategyName} onChange={(e) => setStrategyName(e.target.value)} placeholder="e.g. FIBNYC Premium" className="bg-[#090d14] border border-slate-700 rounded-lg p-3 outline-none text-sm text-slate-200" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">Select Initial Target Asset Class</label>
            <select value={symbol} onChange={(e) => handleAssetSymbolChange(e.target.value)} className="bg-[#090d14] border border-slate-700 rounded-lg p-3 text-sm text-slate-300 outline-none">
              <option value="XAUUSD (Gold Spot)">XAUUSD (Metals: Gold Spot)</option>
              <option value="EURUSD (Euro / Dollar)">EURUSD (Forex: Euro / US Dollar)</option>
              <option value="BTCUSD (Bitcoin / Dollar)">BTCUSD (Crypto: Bitcoin / US Dollar)</option>
            </select>
          </div>
          <button onClick={() => { if (strategyName.trim()) setIsConfigured(true); }} className="w-full bg-blue-600 hover:bg-blue-700 py-3.5 rounded-xl text-sm font-bold transition">Launch Simulator 🚀</button>
        </div>

        <div className="bg-[#111724] border border-slate-800 p-8 rounded-2xl max-w-md w-full flex flex-col gap-4 shadow-2xl">
          <div className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2"><span>📂</span> Restore Saved Session</div>
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
            {savedSessions.map((session) => (
              <div key={session.id} className="flex justify-between items-center bg-[#090d14] border border-slate-800 p-3 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{session.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">{session.symbol} • {session.timeframe}</p>
                </div>
                <button onClick={() => handleLoadSessionProfile(session)} className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 text-xs font-bold rounded-lg transition">Load</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 p-6 bg-[#05070c] min-h-screen text-slate-200">
      <div className="flex flex-wrap items-center justify-between bg-[#111724] border border-slate-800 px-4 py-3 rounded-xl shadow-xl gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Asset:</span>
            <select value={symbol} onChange={(e) => handleAssetSymbolChange(e.target.value)} className="bg-[#090d14] border border-slate-700 text-xs font-bold rounded p-1.5 text-slate-200 outline-none">
              <option value="XAUUSD (Gold Spot)">XAUUSD (Gold Metal)</option>
              <option value="EURUSD (Euro / Dollar)">EURUSD (Forex Currency)</option>
              <option value="BTCUSD (Bitcoin / Dollar)">BTCUSD (Crypto Asset)</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Timeframe:</span>
            {["1m", "5m", "15m", "1h", "4h", "1D"].map((tf) => (
              <button key={tf} onClick={() => handleTimeframeChange(tf)} className={`px-2.5 py-1 text-xs font-bold rounded transition ${timeframe === tf ? "bg-blue-600 text-white" : "bg-[#090d14] border border-slate-700 text-slate-400 hover:bg-slate-800"}`}>{tf}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSaveCurrentSession} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs rounded-lg transition mr-2">💾 Backup Checkpoint</button>
          <div className="flex items-center gap-1 bg-[#090d14] border border-slate-800 p-1 rounded-lg">
            <button onClick={() => setIsPlaying(!isPlaying)} className={`px-3 py-1 font-bold text-xs rounded ${isPlaying ? "bg-amber-600" : "bg-blue-600"}`}>{isPlaying ? "⏸️ Pause" : "▶️ Play"}</button>
            <button onClick={handleStepForward} disabled={isPlaying} className="px-3 py-1 text-xs font-semibold rounded disabled:opacity-40">⏭️ +1 Bar</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3 flex gap-4 items-start">
          <div className="flex flex-col gap-2 bg-[#111724] border border-slate-800 p-2 rounded-xl shadow-xl select-none">
            <button onClick={() => selectDrawingTool("trendline")} className={`p-2.5 rounded-lg text-xs font-bold border transition ${activeTool === "trendline" ? "bg-blue-600 text-white border-blue-500" : "bg-[#090d14] border-slate-700 text-slate-300"}`}>📈 Line</button>
            <button onClick={() => selectDrawingTool("horizontal")} className={`p-2.5 rounded-lg text-xs font-bold border transition ${activeTool === "horizontal" ? "bg-blue-600 text-white border-blue-500" : "bg-[#090d14] border-slate-700 text-slate-300"}`}>➖ Horiz</button>
            <button onClick={() => selectDrawingTool("rectangle")} className={`p-2.5 rounded-lg text-xs font-bold border transition ${activeTool === "rectangle" ? "bg-blue-600 text-white border-blue-500" : "bg-[#090d14] border-slate-700 text-slate-300"}`}>█ Box</button>
            <button onClick={() => selectDrawingTool("fibonacci")} className={`p-2.5 rounded-lg text-xs font-bold border transition ${activeTool === "fibonacci" ? "bg-blue-600 text-white border-blue-500" : "bg-[#090d14] border-slate-700 text-slate-300"}`}>🔱 Fib</button>
            <hr className="border-slate-800 my-1" />
            <button onClick={clearAllDrawings} className="p-2.5 rounded-lg text-xs font-bold bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900 transition">🗑️ Clear</button>
          </div>

          <div className="flex-1 relative bg-[#111724] border border-slate-800 p-4 rounded-2xl shadow-xl overflow-hidden">
            <svg ref={svgOverlayRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className={`absolute top-4 left-4 z-20 w-[calc(100%-32px)] h-[480px] ${activeTool ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"}`}>
              {drawings.map((draw) => (
              draw.type === "fibonacci" ? renderFibonacciLevels(draw) :
              React.createElement(draw.type === "rectangle" ? "rect" : "line", draw.type === "rectangle" ? {
                key: draw.id, x: Math.min(draw.startX, draw.endX), y: Math.min(draw.startY, draw.endY), width: Math.abs(draw.endX - draw.startX), height: Math.abs(draw.endY - draw.startY), fill: "rgba(59, 130, 246, 0.12)", stroke: "#3b82f6", strokeWidth: 2
              } : {
                key: draw.id, x1: draw.startX, y1: draw.startY, x2: draw.endX, y2: draw.endY, stroke: draw.type === "horizontal" ? "#f59e0b" : "#3b82f6", strokeWidth: 2, strokeDasharray: draw.type === "horizontal" ? "4 4" : "0"
              })
            ))}
            {currentDrawing && (
              currentDrawing.type === "fibonacci" ? renderFibonacciLevels(currentDrawing) :
              React.createElement(currentDrawing.type === "rectangle" ? "rect" : "line", currentDrawing.type === "rectangle" ? {
                x: Math.min(currentDrawing.startX, currentDrawing.endX), y: Math.min(currentDrawing.startY, currentDrawing.endY), width: Math.abs(currentDrawing.endX - currentDrawing.startX), height: Math.abs(currentDrawing.endY - currentDrawing.startY), fill: "rgba(59, 130, 246, 0.12)", stroke: "#3b82f6", strokeWidth: 2
              } : {
                x1: currentDrawing.startX, y1: currentDrawing.startY, x2: currentDrawing.endX, y2: currentDrawing.endY, stroke: currentDrawing.type === "horizontal" ? "#f59e0b" : "#3b82f6", strokeWidth: 2, strokeDasharray: currentDrawing.type === "horizontal" ? "4 4" : "0"
              })
            )}
          </svg>
          <div ref={chartContainerRef} className="w-full relative h-[480px] rounded-xl overflow-hidden" />
        </div>
      </div>

      <div className="xl:col-span-1 bg-[#111724] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/60 pb-2">🕹️ Simulated Order Desk</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#090d14] p-2.5 rounded-xl border border-slate-800/60"><span className="block text-[10px] text-slate-400">Account Equity</span><span className="font-bold text-emerald-400 font-mono">${(runningBalance + unrealizedPnL).toFixed(2)}</span></div>
          <div className="bg-[#090d14] p-2.5 rounded-xl border border-slate-800/60"><span className="block text-[10px] text-slate-400">Floating PnL</span><span className={`font-bold font-mono ${unrealizedPnL >= 0 ? "text-emerald-400" : "text-red-400"}`}>{unrealizedPnL >= 0 ? `+$${unrealizedPnL}` : `-$${Math.abs(unrealizedPnL)}`}</span></div>
        </div>
        <div className="flex flex-col gap-1.5 bg-[#090d14] border border-slate-800/80 p-3 rounded-xl">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Select Order Lot Size</label>
          <div className="flex items-center gap-2 mt-1">
            <input type="number" step="0.01" min="0.01" max="100.0" value={lotSize} onChange={(e) => setLotSize(parseFloat(e.target.value) || 0.01)} className="bg-[#111724] border border-slate-700 text-sm rounded-lg p-2 flex-1 outline-none text-slate-200 font-mono font-bold" />
            <div className="flex gap-1">
              {[0.1, 1.0, 5.0].map((val) => (
                <button key={val} onClick={() => setLotSize(val)} className="text-[10px] px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded">+{val}</button>
              ))}
            </div>
          </div>
        </div>
        {!activeTrade ? (
          <div className="flex gap-2.5">
            <button onClick={() => handleMarketExecution("BUY")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold py-2.5 rounded-xl text-xs text-white transition active:scale-95">🏹 Buy Long</button>
            <button onClick={() => handleMarketExecution("SELL")} className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2.5 rounded-xl text-xs text-white transition active:scale-95">🎯 Sell Short</button>
          </div>
        ) : (
          <div className="bg-[#1b2336] border border-blue-900/40 p-3.5 rounded-xl flex flex-col gap-2">
            <div className="flex justify-between text-[11px] text-slate-400"><span>Active Volume:</span><span className="font-bold text-white font-mono">{activeTrade.lotSize} Lots</span></div>
            <button onClick={handleClosePosition} className="w-full bg-amber-600 hover:bg-amber-700 font-bold py-2.5 rounded-xl text-xs text-white transition">✖️ Close Position</button>
          </div>
        )}
        <div className="bg-[#111724] border-t border-slate-800 pt-2 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Session Trade Logs</span>
          <div className="max-h-[120px] overflow-y-auto flex flex-col gap-1.5 text-xs font-mono">
            {tradeLogs.length === 0 ? <span className="text-slate-500 italic text-[11px]">No logged transactions.</span> : 
              tradeLogs.map((log, i) => (
                <div key={i} className="flex justify-between bg-[#090d14] p-2 rounded border border-slate-800">
                  <span>{log.type} ({log.lotSize} Lots)</span>
                  <span className={log.profit >= 0 ? "text-emerald-400" : "text-red-400"}>${log.profit.toFixed(2)}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
