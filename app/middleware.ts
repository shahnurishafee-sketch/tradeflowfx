import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("sb-access-token")?.value;
  const { pathname } = req.nextUrl;

  // Check if the incoming target is a backend API route
  const isApiRoute = pathname.startsWith("/api");
  // Check if the incoming target is a frontend dashboard view page
  const isDashboardView = pathname.startsWith("/dashboard");

  // UNPROTECTED SHIELD: If a user is not logged in
  if (!session) {
    // 1. Guard API Routes: Return a clean, structured JSON format error code instead of an HTML redirect page
    if (isApiRoute) {
      return NextResponse.json(
        { message: "Authentication required: Please log in to link account credentials." },
        { status: 401 }
      );
    }

    // 2. Guard Frontend Pages: Redirect them cleanly to your visual login route interface
    if (isDashboardView) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Updated configuration matcher block to intercept both dashboard directories and API execution pipes
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/api/:path*"
  ],
};
