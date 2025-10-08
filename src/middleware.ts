import { NextRequest, NextResponse } from "next/server";
import { Locales } from "./lib/dictionaries";

const locales: Locales[] = ["en", "bn"];
const defaultLocale = "en";

// Get the preferred locale, similar to the above or using a library

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  // Skip API and static files (already handled)
  if (pathname.startsWith("/api") || pathname.includes("."))
    return NextResponse.next();

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)",
  ],
};
