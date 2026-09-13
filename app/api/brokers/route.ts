// app/api/brokers/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  const platform = searchParams.get("platform") || "mt5"; // mt4 or mt5

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }
  try {
    const metaApiToken = process.env.METAAPI_TOKEN;

    if (!metaApiToken) {
      console.error("Broker Search Failure: METAAPI_TOKEN environment variable is not defined on server configuration.");
      return NextResponse.json({ error: "Server authentication misconfigured" }, { status: 500 });
    }
    // 🚀 DYNAMIC FIX: Corrected template syntax and mapped MetaAPI's official provision server directory path
    const metaApiUrl = `https://metaapi.cloud{encodeURIComponent(query)}&platform=${platform}`;
    
    const response = await fetch(metaApiUrl, {
      headers: {
        "auth-token": metaApiToken
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("MetaAPI Broker Lookup Server Error Response:", errorText);
      return NextResponse.json({ error: "Failed to pull matching broker arrays from cloud router" }, { status: response.status });
    }

    const data = await response.json();
    // Extract name string parameters out of matching broker server metadata arrays cleanly
    const servers = Array.isArray(data) 
      ? data.map((server: any) => server.name || server) 
      : [];

    return NextResponse.json(servers);

  } catch (error) {
    console.error("Broker server search pipeline failure:", error);
    return NextResponse.json({ error: "Outbound network parsing timeout" }, { status: 500 });
  }
}
