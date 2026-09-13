"use client";

import React, { useState } from "react";

// Example static trades — replace with your real data later
const trades = [
  { closeTime: "2026-09-03T10:00:00", profit: 120 },
  { closeTime: "2026-09-03T14:00:00", profit: -20 },
];

// Group trades by day
function groupTradesByDay(trades) {
  const grouped = {};
  trades.forEach((t) => {
    const date = new Date(t.closeTime);
    const key = date.toISOString().split("T")[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  });
  return grouped;
}

// Group trades by week
function groupTradesByWeek(trades) {
  const grouped = {};
  trades.forEach((t) => {
    const date = new Date(t.closeTime);
    const week = getWeekNumber(date);
    if (!grouped[week]) grouped[week] = [];
    grouped[week].push(t);
  });
  return grouped;
}

function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}

export default function MonthlyPL() {
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();
  const currentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );

  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyGrouped = groupTradesByDay(trades);
  const weeklyGrouped = groupTradesByWeek(trades);
  const monthlyTotal = trades.reduce((sum, t) => sum + t.profit, 0);

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-sm border border-gray-200 dark:border-[#1e293b] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Monthly P&L
        </h3>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Monthly: ${monthlyTotal.toFixed(2)}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMonthOffset((prev) => prev - 1)}
              className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#1e293b]"
            >
              ←
            </button>

            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {monthName} {year}
            </span>

            <button
              onClick={() => setMonthOffset((prev) => prev + 1)}
              className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#1e293b]"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-8 gap-2 text-center mb-2">
        {["M", "T", "W", "T", "F", "S", "S", "Weekly"].map((d, i) => (
          <div
            key={`weekday-${i}`}
            className="font-semibold text-gray-500 dark:text-gray-400"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-2 text-center">
        {Array.from({ length: 5 }).map((_, weekIndex) => (
          <React.Fragment key={`week-${weekIndex}`}>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const date = new Date(
                year,
                month,
                weekIndex * 7 + dayIndex + 1
              );

              if (date.getMonth() !== month) {
                return (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="p-3"
                  ></div>
                );
              }

              const key = date.toISOString().split("T")[0];
              const tradesForDay = dailyGrouped[key] || [];

              const isProfit = tradesForDay.some((t) => t.profit > 0);
              const isLoss = tradesForDay.some((t) => t.profit < 0);

              return (
                <div
                  key={key}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-[#1e293b] hover:bg-gray-100 dark:hover:bg-[#334155] transition"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {date.getDate()}
                  </div>

                  {isProfit && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                  )}
                  {isLoss && (
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                  )}
                </div>
              );
            })}

            {/* Weekly Summary */}
            <div
              key={`summary-${weekIndex}`}
              className="p-3 rounded-lg bg-gray-50 dark:bg-[#1e293b] text-right text-sm text-gray-600 dark:text-gray-300"
            >
              WEEKLY $0
              <br />
              Traded Days 0
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>Profit</span>
        </div>

        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span>Loss</span>
        </div>
      </div>
    </div>
  );
}
