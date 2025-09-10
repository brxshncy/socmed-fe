import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
    const authtoken = false;
    const { pathname } = request.nextUrl;

    // Skip middleware for static assets, API routes, and Next.js internals
    if (
        pathname.startsWith("/auth/") // Auth routes to prevent redirect loops
    ) {
        return NextResponse.next();
    }

    if (!authtoken) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files with extensions (e.g., .png, .jpg, .css, .js)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)",
    ],
};
