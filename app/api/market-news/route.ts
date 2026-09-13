import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_MARKETAUX_KEY;

    const res = await fetch(
      `https://api.marketaux.com/v1/news/all?api_token=${apiKey}&limit=20`,
      { cache: "no-store" }
    );

    const json = await res.json();
    return NextResponse.json(json.data || []);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
