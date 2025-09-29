import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the request is for admin routes
  if (pathname.startsWith("/admin")) {
    // In a real app, you would validate the JWT token here
    // For this demo, we'll let the client-side protection handle it
    return NextResponse.next()
  }

  // Check if the request is for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // In a real app, you would validate the JWT token here
    // For this demo, we'll let the client-side protection handle it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
