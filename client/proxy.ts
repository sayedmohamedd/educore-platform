import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  console.log("PROXY:", req.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
// import { NextRequest, NextResponse } from "next/server";

// export function proxy(req: NextRequest) {
//   const token = req.cookies.get("accessToken")?.value;
//   const { pathname } = req.nextUrl;

//   const isAuthPage = pathname === "/login" || pathname === "/signup";

//   // User is already logged in
//   if (isAuthPage && token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Auth pages are public
//   if (isAuthPage) {
//     return NextResponse.next();
//   }

//   // Everything else requires authentication
//   if (!token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"],
// };
