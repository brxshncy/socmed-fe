import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
    const authtoken = false;
    const { pathname } = request.nextUrl;

    // Skip middleware for auth routes to prevent redirect loops
    if (pathname.startsWith("/auth/")) {
        return NextResponse.next();
    }

    if (!authtoken) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
};
