import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("owner_authToken");

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/partner-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/account",
    "/dashboard/orders",
    "/dashboard/foodmenu",
  ],
};
