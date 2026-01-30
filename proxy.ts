import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Proxy for the application (formerly middleware)
 * Runs before each request - can be used for:
 * - Authentication checks
 * - Redirects
 * - Request/response modification
 * - Geolocation-based routing
 *
 * Following Next.js 16 proxy patterns (renamed from middleware)
 */
export function proxy(_request: NextRequest) {
  // Add custom headers for security and performance
  const response = NextResponse.next();

  // Add security headers (also configured in next.config.ts)
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

// Configure which routes use the proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
