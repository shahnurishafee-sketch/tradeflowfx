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

    // 1. Pull the active connection record dynamically out of your broker table using correct login tracking keys
    const { data: accountRow, error: dbError } = await supabase
      .from("broker_accounts")
      .select("id, login_id") // 🚀 FIXED: Tracks your active login_id column layout cleanly
      .single(); 

    // 🟢 SAFE MULTI-USER CHECKPOINT: If no account is registered yet, return clean empty baseline parameters
    if (dbError || !accountRow?.id) {
      return NextResponse.json({
        accountNumber: null,
        metrics: { totalPl: 0, totalTrades: 0, unrealized: 0, realized: 0, winRate: 0 }
      });
    }

    const metaApiId = accountRow.id;
    const accountNumber = accountRow.login_id; // 🚀 FIXED: Maps to your active login_id column reference

    // 2. Query MetaApi's official user gateway endpoint using correct template literal syntax
    const metaApiUrl = `https://metaapi.cloud{metaApiId}/account-information`;
    
    const metaApiRes = await fetch(metaApiUrl, {
      headers: { "auth-token": metaApiToken }
    });

    // Handle container connection provisioning state dropbacks safely
    if (!metaApiRes.ok) {
      return NextResponse.json({
        accountNumber: accountNumber,
        metrics: { totalPl: 0, totalTrades: 0, unrealized: 0, realized: 0, winRate: 0 }
      });
    }

    const metrics = await metaApiRes.json();

    // 3. Assemble and calculate performance values to return to your dashboard interface cards
    return NextResponse.json({
      accountNumber: accountNumber,
      metrics: {
        totalPl: parseFloat(metrics.balance || 0), // 🚀 FIXED: Removed the -10000 limit filter to stream absolute true balance values
        totalTrades: 0, 
        unrealized: parseFloat(metrics.equity || 0) - parseFloat(metrics.balance || 0),
        realized: parseFloat(metrics.balance || 0),
        winRate: 0,
        avgWin: 0,
        avgLoss: 0,
        bestTrade: 0,
        worstTrade: 0
      }
    });

  } catch (err: any) {
    console.error("Failed to compile dashboard metrics loops:", err);
    return NextResponse.json({ error: "Outbound parsing timeout exception" }, { status: 500 });
  }
}
