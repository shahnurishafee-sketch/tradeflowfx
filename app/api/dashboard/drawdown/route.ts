import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const loginId = searchParams.get("loginId");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const metaApiToken = process.env.METAAPI_TOKEN;

    if (!loginId || !supabaseUrl || !supabaseKey || !metaApiToken) {
      return NextResponse.json({ points: [] }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Grab the MetaApi unique registration ID linked to this specific login account number
    const { data: account, error: accountError } = await supabase
      .from("broker_accounts")
      .select("meta_api_id")
      .eq("login_id", loginId)
      .single();

    if (accountError || !account?.meta_api_id) {
      return NextResponse.json({ points: [] }, { status: 200 });
    }

    // Call MetaStats' historical metrics endpoint sequence tracking node arrays
    const statsRes = await fetch(
      `https://agiliumtrade.ai{account.meta_api_id}/metrics`,
      {
        headers: { "auth-token": metaApiToken },
        next: { revalidate: 60 } // Cache data for 60 seconds
      }
    );

    if (!statsRes.ok) {
      return NextResponse.json({ points: [] }, { status: 200 });
    }

    const statsData = await statsRes.json();
    
    // Extract and map historical data points. MetaStats provides this under their metrics structure, 
    // often grouped as trade history object loops or balance curves depending on sync length.
    // Fallback to plotting the balance curve trajectory if specific drawdown tracking timeline arrays are processing.
    const historicalPoints = statsData.historyPoints || [];
    
    const formattedPoints = historicalPoints.map((point: any) => ({
      timestamp: new Date(point.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      dd: point.drawdown || point.maxDrawdown || 0
    }));

    return NextResponse.json({ points: formattedPoints }, { status: 200 });

  } catch (error) {
    console.error("❌ Isolated drawdown api route crash caught:", error);
    return NextResponse.json({ points: [] }, { status: 200 });
  }
}
