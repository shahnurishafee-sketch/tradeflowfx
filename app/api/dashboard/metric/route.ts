import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const metaApiToken = process.env.METAAPI_TOKEN;

    if (!supabaseUrl || !supabaseKey || !metaApiToken) {
      return NextResponse.json({ error: "Server system variables misconfigured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Pull the active connection record dynamically out of your broker table
    const { data: accountRow, error: dbError } = await supabase
      .from("broker_accounts")
      .select("id, login_id") 
      .single(); 

    if (dbError || !accountRow?.id) {
      return NextResponse.json({
        accountNumber: null,
        metrics: { totalPl: 0, totalTrades: 0, unrealized: 0, realized: 0, winRate: 0 }
      });
    }

    const metaApiId = accountRow.id;
    const accountNumber = accountRow.login_id;

    // 2. Query MetaAPI's account snap-shot info
    const accountInfoUrl = `https://metaapi.cloud{metaApiId}/account-information`;
    const infoRes = await fetch(accountInfoUrl, { headers: { "auth-token": metaApiToken } });
    const accountInfo = infoRes.ok ? await infoRes.json() : { balance: 0, equity: 0 };

    // 3. 🚀 FETCH HISTORY LOGS: Query MetaAPI for historical deals (closed trades)
    // We pull the past 3 months of history to calculate your true statistics
    const startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 3); // 3 months ago
    const endTime = new Date();

    const historyUrl = `https://metaapi.cloud{metaApiId}/historical-deals/by-time-range?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`;
    const historyRes = await fetch(historyUrl, { headers: { "auth-token": metaApiToken } });
    
    let totalPl = 0;
    let totalTrades = 0;
    let winCount = 0;
    let totalWinsValue = 0;
    let totalLossesValue = 0;
    let bestTrade = 0;
    let worstTrade = 0;

    if (historyRes.ok) {
      const deals = await historyRes.json();
      
      // Filter out deposit/withdrawal records and loop strictly over execution positions
      const tradingDeals = Array.isArray(deals) ? deals.filter((deal: any) => deal.entryType === "DEAL_ENTRY_OUT" && deal.profit !== undefined) : [];
      
      totalTrades = tradingDeals.length;

      tradingDeals.forEach((deal: any) => {
        const profit = parseFloat(deal.profit || 0);
        totalPl += profit;

        if (profit > 0) {
          winCount++;
          totalWinsValue += profit;
          if (profit > bestTrade) bestTrade = profit;
        } else if (profit < 0) {
          totalLossesValue += Math.abs(profit);
          if (profit < worstTrade) worstTrade = profit;
        }
      });
    }

    const winRate = totalTrades > 0 ? Math.round((winCount / totalTrades) * 100) : 0;
    const avgWin = winCount > 0 ? totalWinsValue / winCount : 0;
    const avgLoss = (totalTrades - winCount) > 0 ? totalLossesValue / (totalTrades - winCount) : 0;

    // 4. Assemble and return true performance values matching your real historical track records
    return NextResponse.json({
      accountNumber: accountNumber,
      metrics: {
        totalPl: totalPl, // 🚀 Displays your cumulative history metrics instead of live balance
        totalTrades: totalTrades, 
        unrealized: parseFloat(accountInfo.equity || 0) - parseFloat(accountInfo.balance || 0),
        realized: totalPl,
        winRate: winRate,
        avgWin: avgWin,
        avgLoss: avgLoss,
        bestTrade: bestTrade,
        worstTrade: worstTrade
      }
    });

  } catch (err: any) {
    console.error("Failed to compile dashboard historical metrics:", err);
    return NextResponse.json({ error: "Outbound parsing timeout exception" }, { status: 500 });
  }
}
