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

    // Grab the MetaApi account instance configuration map from your user database table
    const { data: account, error: accountError } = await supabase
      .from("broker_accounts")
      .select("meta_api_id")
      .eq("login_id", loginId)
      .single();

    if (accountError || !account?.meta_api_id) {
      return NextResponse.json({ points: [] }, { status: 200 });
    }

    // Request full account history metrics matrices directly from MetaStats REST servers
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
    const historicalPoints = statsData.historyPoints || [];

    // Map your broker's raw closed timeline arrays into sequential data coordinates
    const formattedPoints = historicalPoints.map((point: any) => ({
      timestamp: new Date(point.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      equity: point.equity || point.balance || 0
    }));

    return NextResponse.json({ points: formattedPoints }, { status: 200 });

  } catch (error) {
    console.error("❌ Isolated equity curve route crash caught:", error);
    return NextResponse.json({ points: [] }, { status: 200 });
  }
}
