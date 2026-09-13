"use client";

import { useEffect, useState } from "react";

export default function MarketTickers() {
  const [prices, setPrices] = useState({
    XAUUSD: 2450.20,
    NAS100: 18920.5,
    BTCUSD: 61200.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => ({
        XAUUSD: prev.XAUUSD + (Math.random() * 2 - 1),
        NAS100: prev.NAS100 + (Math.random() * 10 - 5),
        BTCUSD: prev.BTCUSD + (Math.random() * 50 - 25),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Market Tickers</h3>

      <div className="space-y-3">
        {Object.entries(prices).map(([pair, price]) => (
          <div key={pair} className="flex justify-between items-center">
            <span className="font-semibold">{pair}</span>
            <span className="text-blue-600 font-bold">{price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
