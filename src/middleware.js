// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl } = request;

  // Redirect ke /login jika URL root
  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Lanjutkan request jika bukan root
}
