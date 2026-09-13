import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database setup failure." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();
    const { strategyName, assetPair, initialBalance, trades } = body;

    // Calculate metrics locally on the fly
    const totalTrades = trades.length;
    const winningTrades = trades.filter((t: any) => t.pnl > 0).length;
    const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
    
    const totalPnl = trades.reduce((sum: number, t: any) => sum + t.pnl, 0);
    const finalBalance = Number(initialBalance) + totalPnl;

    const { data, error } = await supabase
      .from("backtest_sessions")
      .insert({
        strategy_name: strategyName,
        asset_pair: assetPair,
        initial_balance: Number(initialBalance),
        final_balance: finalBalance,
        total_trades: totalTrades,
        win_rate: winRate,
        trades_log: trades
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, session: data });

  } catch (error: any) {
    console.error("Backtest engine failure:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
