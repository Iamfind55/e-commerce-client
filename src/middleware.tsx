import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/client"];

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const userCookie = cookies.get("auth_token");
  console.log("userCookie:", userCookie);

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*"],
};
