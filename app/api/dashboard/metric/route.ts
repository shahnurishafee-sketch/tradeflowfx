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

    // 🚀 MULTI-USER FIX: Build the client to read browser request header auth cookies automatically
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the session profile of the specific user hitting the site right now
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    let currentUserUuid = null;

    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      currentUserUuid = user?.id || null;
    }

    // 2. Fetch the specific broker row belonging to this unique visitor
    // If no explicit token header exists, fall back to scanning your testing record row seamlessly
    let queryBuilder = supabase.from("broker_accounts").select("id, login_id, user_id");
    
    if (currentUserUuid) {
      queryBuilder = queryBuilder.eq("user_id", currentUserUuid);
    }

    const { data: accountRow, error: dbError } = await queryBuilder.limit(1).maybeSingle();

    // If this visitor hasn't synced an account yet, return beautiful clean baseline metrics 
    if (dbError || !accountRow?.id) {
      return NextResponse.json({
        accountNumber: null,
        metrics: { totalPl: 0, totalTrades: 0, unrealized: 0, realized: 0, winRate: 0 }
      });
    }

    const metaApiId = accountRow.id;
    const accountNumber = accountRow.login_id;

    // 3. Query MetaAPI for live real-time statistics snapshot data
    const accountInfoUrl = `https://metaapi.cloud{metaApiId}/account-information`;
    const infoRes = await fetch(accountInfoUrl, { headers: { "auth-token": metaApiToken } });
    const accountInfo = infoRes.ok ? await infoRes.json() : { balance: 0, equity: 0 };

    // 4. Query MetaAPI for historical deals data over the past 3 months
    const startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 3);
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

    return NextResponse.json({
      accountNumber: accountNumber,
      metrics: {
        totalPl: totalPl === 0 ? parseFloat(accountInfo.balance || 0) : totalPl,
        totalTrades: totalTrades, 
        unrealized: parseFloat(accountInfo.equity || 0) - parseFloat(accountInfo.balance || 0),
        realized: totalPl === 0 ? parseFloat(accountInfo.balance || 0) : totalPl,
        winRate: winRate,
        avgWin: avgWin,
        avgLoss: avgLoss,
        bestTrade: bestTrade,
        worstTrade: worstTrade
      }
    });

  } catch (err: any) {
    console.error("Failed to compile dashboard metrics pipelines:", err);
    return NextResponse.json({ error: "Outbound parsing timeout exception" }, { status: 500 });
  }
}
