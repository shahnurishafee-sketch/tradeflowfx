import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_KEY;

    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business,world&q=GDP OR CPI OR inflation OR interest%20rate OR unemployment OR central%20bank OR monetary%20policy`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return NextResponse.json(data.results || []);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch economic news", details: err.message },
      { status: 500 }
    );
  }
}
