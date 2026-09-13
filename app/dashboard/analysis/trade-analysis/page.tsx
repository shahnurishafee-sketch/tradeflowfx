"use client";

import TradeAnalysisPanel from "@/components/TradeAnalysisPanel";

export default function TradeAnalysisPage() {
  return (
    <main className="flex bg-[#f9fafb] text-gray-900 min-h-screen">
      <section className="flex-1 flex flex-col">
        <div className="p-6">
          <TradeAnalysisPanel />
        </div>
      </section>
    </main>
  );
}
