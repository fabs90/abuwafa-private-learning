import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token"); // Mendapatkan token dari cookies
  const { nextUrl } = request;

  // Jika URL root, redirect ke /login
  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect to login with a query parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  // Validasi token untuk halaman yang membutuhkan autentikasi
  const protectedRoutes = [
    "/dashboard/admin",
    "/dashboard/tutor",
    "/dashboard/student",
  ];
  if (protectedRoutes.includes(nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect jika token tidak ada
    }
  }

  return NextResponse.next(); // Lanjutkan ke halaman yang diminta jika valid
}

export const config = {
  matcher: ["/", "/dashboard/:path*"], // Terapkan middleware ke root dan semua route dashboard
};
