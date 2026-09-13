"use client";

import PerformanceHeader from "@/components/PerformanceHeader";
import SummaryCards from "@/components/SummaryCards";
import EquityCurve from "@/components/EquityCurve";
import WinLossDistribution from "@/components/WinLossDistribution";

export default function PerformancePage() {
  return (
    <div className="flex">
      <aside className="w-64">
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <PerformanceHeader />
        <SummaryCards />
        <EquityCurve />
        <WinLossDistribution />
      </main>
    </div>
  );
}
