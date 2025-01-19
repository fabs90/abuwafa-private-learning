import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { nextUrl } = request;

  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  const role = request.cookies.get("role")?.value?.toLowerCase();

  if (nextUrl.pathname.startsWith("/dashboard/admin")) {
    // Restrict to admin role
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  } else if (nextUrl.pathname.startsWith("/dashboard/tutor")) {
    // Restrict to tutor role
    if (role !== "tutor") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  } else if (nextUrl.pathname.startsWith("/dashboard/student")) {
    // Restrict to student role
    if (role !== "student") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
