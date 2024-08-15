import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET });

  if (!token)
    return NextResponse.redirect(new URL("/auth/user/signin", request.url));

  switch (token.role) {
    case "USER":
      if (
        request.nextUrl.pathname !== "/" &&
        !request.nextUrl.pathname.startsWith("/user") &&
        !request.nextUrl.pathname.startsWith("/product") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/change-password") &&
        !request.nextUrl.pathname.startsWith("/auth/signout")
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
    case "UMKM":
      if (
        !request.nextUrl.pathname.startsWith("/umkm") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/change-password") &&
        !request.nextUrl.pathname.startsWith("/auth/signout")
      ) {
        return NextResponse.redirect(new URL("/umkm/product", request.url));
      }
      break;
    case "ADMIN":
      // Add the paths that the nurse can access here
      if (
        !request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/change-password") &&
        !request.nextUrl.pathname.startsWith("/auth/signout")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    case "SUPERADMIN":
      // Add the paths that the pathologist can access here
      if (
        !request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/change-password") &&
        !request.nextUrl.pathname.startsWith("/auth/signout")
      ) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/auth/user/signin", request.url));
  }
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|auth/signin|auth/user/signin|auth/umkm/signin|auth/admin/signin|register|images|logo|banner).*)",
  ],
};
