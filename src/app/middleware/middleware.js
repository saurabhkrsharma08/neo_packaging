import { NextResponse } from "next/server";

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = req.cookies.get("token"); 

    const protectedRoutes = ["/dashboard", "/admin"];

    if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); 
}

export const config = {
    matcher: ["/admin/:path*"],
};
