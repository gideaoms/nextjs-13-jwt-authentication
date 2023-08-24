import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicUrls = ["/sign-in"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("@my-app/token")?.value;
  const isPublicUrl = publicUrls.includes(pathname);
  if (token && isPublicUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !isPublicUrl) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
