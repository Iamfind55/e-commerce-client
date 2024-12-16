import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// Protected paths for which authentication is required
const protectedPaths = ["/client"];
const intlMiddleware = createMiddleware({
  locales: ["en", "th", "vi", "zh", "ms"],
  defaultLocale: "en",
});

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get("auth_token");
  const getLocale = cookies.get("NEXT_LOCALE");
  const { pathname } = req.nextUrl;
  const locale = getLocale?.value;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const normalizedPathname = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;

  if (protectedPaths.some((path) => normalizedPathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/:locale(en|th|vi|zh|ms)?/:path*", "/doctor/:path*"],
};
