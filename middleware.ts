import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

const publicRoutes = [
  "/",
  "/signin",
  "/legal/terms-and-conditions",
  "/legal/privacy-policy",
];
export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req, evt) {
    const pathname = req.nextUrl.pathname;
    const userId = auth.userId;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!userId && !isPublicRoute) {
      // If not logged in and trying to access a non-public route, redirect to /signin
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (pathname === "/hub") {
      if (!userId) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (
        ![
          "user_2iMy3ihejgSkgc5SxdW9RjoLsC2",
          "user_2iMJrsiGrb5eKSI43KWz5OAvZoA",
        ].includes(userId)
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.

    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
