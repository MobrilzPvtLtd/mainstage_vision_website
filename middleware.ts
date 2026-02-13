import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  // TODO: Temporarily disabled for development
  // Uncomment when login page is implemented

  // const token = await getToken({ req })

  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   if (!token)
  //     return NextResponse.redirect(new URL("/login", req.url))
  // }

  return NextResponse.next()
}
