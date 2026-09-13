// app/api/account-metrics/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const loginId = searchParams.get("loginId");

  if (!loginId) {
    return NextResponse.json({ error: "Missing login tracking index ID" }, { status: 400 });
  }
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const metaApiToken = process.env.METAAPI_TOKEN;

    if (!supabaseUrl || !supabaseKey || !metaApiToken) {
      return NextResponse.json({ error: "Server system variables misconfigured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // 1. Pull the active connection record out of Supabase
    const { data: accountRow, error: dbError } = await supabase
      .from("broker_accounts")
      .select("id")
      .single(); 

    if (dbError || !accountRow?.id) {
      return NextResponse.json({ error: "No synchronized connection profile found in database" }, { status: 404 });
    }

    const metaApiId = accountRow.id;
    // 2. Query MetaApi's official user gateway endpoint using the correct literal syntax
    const metaApiUrl = `https://metaapi.cloud{metaApiId}/account-information`;
    
    const metaApiRes = await fetch(metaApiUrl, {
      headers: { "auth-token": metaApiToken }
    });

    if (!metaApiRes.ok) {
      const errorText = await metaApiRes.text();
      console.error("MetaAPI Connection Error Response:", errorText);
      return NextResponse.json({ error: `MetaAPI Server Error: ${metaApiRes.statusText}` }, { status: metaApiRes.status });
    }

    const metrics = await metaApiRes.json();
    // 3. Extract the exact running numbers matching MetaTrader specifications
    return NextResponse.json({
      balance: parseFloat(metrics.balance || 0),
      equity: parseFloat(metrics.equity || 0),
      margin: parseFloat(metrics.margin || 0),
      freeMargin: parseFloat(metrics.freeMargin || 0),
      leverage: metrics.leverage || 100,
      currency: metrics.currency || "USD"
    });

  } catch (err: any) {
    console.error("Failed to query live metrics tracking arrays:", err);
    return NextResponse.json({ error: "Outbound server parsing timeout" }, { status: 500 });
  }
}
