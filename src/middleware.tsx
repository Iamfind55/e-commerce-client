import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { jwtDecode } from "jwt-decode";

// Protected paths for which authentication is required
const protectedPaths = ["/customer"];
const protectedClient = ["/client"];
const protectedCart = ["/cart"];
const intlMiddleware = createMiddleware({
  locales: ["en", "th", "vi", "zh", "ms", "fr"],
  defaultLocale: "en",
});

interface CustomJwtPayload {
  id: string;
  status: string;
  type: string;
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get("auth_token");
  const getLocale = cookies.get("NEXT_LOCALE");
  const { pathname } = req.nextUrl;
  const locale = getLocale?.value;

  let decodedToken: CustomJwtPayload | null = null;
  let type = null;

  if (token) {
    try {
      decodedToken = jwtDecode<CustomJwtPayload>(token.value); // Specify the type
      type = decodedToken?.type;
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/${locale}/customer-signin`, req.url)
      );
    }
  }

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const normalizedPathname = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;

  if (protectedPaths.some((path) => normalizedPathname.startsWith(path))) {
    if (token) {
      if (type !== "CUSTOMER") {
        return NextResponse.redirect(new URL(`/${locale}/cus-signin`, req.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/${locale}/`, req.url));
    }
  }

  if (protectedCart.some((path) => normalizedPathname.startsWith(path))) {
    if (token) {
      if (type !== "CUSTOMER") {
        return NextResponse.redirect(new URL(`/${locale}/cus-signin`, req.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/${locale}/cus-signin`, req.url));
    }
  }

  if (protectedClient.some((path) => normalizedPathname.startsWith(path))) {
    if (token) {
      if (type !== "SHOP") {
        return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/${locale}/`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/:locale(en|th|vi|zh|ms|fr)?/:path*", "/doctor/:path*"],
};
