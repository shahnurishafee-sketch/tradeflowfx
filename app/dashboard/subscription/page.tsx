"use client";
import SubscriptionHeader from "@/components/SubscriptionHeader";
import PricingCards from "@/components/PricingCards";
import FeatureComparison from "@/components/FeatureComparison";

export default function SubscriptionPage() {
  return (
    <main className="flex bg-[#f9fafb] text-gray-900 min-h-screen">
      <section className="flex-1 flex flex-col">
        <div className="p-6 space-y-6">
          <SubscriptionHeader />
          <PricingCards />
          <FeatureComparison />
        </div>
      </section>
    </main>
  );
}
