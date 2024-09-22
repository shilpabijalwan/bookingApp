import { NextResponse } from "next/server";

export default function middlewareW(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/signup";

  const token = request.cookies.get("accessToken")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/classes", "/schedules", "/signup"],
};
