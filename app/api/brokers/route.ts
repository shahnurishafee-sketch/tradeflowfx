import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  const platform = searchParams.get("platform") || "mt5"; // mt4 or mt5

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    // We call MetaApi's public cloud provision endpoint to query real MetaTrader servers
    const response = await fetch(
      `https://metaapi.cloud{encodeURIComponent(query)}&platform=${platform}`,
      {
        headers: {
          "auth-token": process.env.METAAPI_TOKEN || "" // Put your MetaApi Token in your .env file
        }
      }
    );

    const data = await response.json();
    
    // Extract only the string array names of matching servers
    const servers = data.map((server: any) => server.name);
    return NextResponse.json(servers);
  } catch (error) {
    console.error("Broker fetch failure:", error);
    return NextResponse.json({ error: "Failed to search servers" }, { status: 500 });
  }
}
