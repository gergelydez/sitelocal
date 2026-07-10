import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function middleware(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return new NextResponse(
      "Dashboard indisponibil — lipsește ADMIN_PASSWORD din variabilele de mediu (vezi README).",
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const [user, pass] = atob(auth.slice(6)).split(":");
    if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autentificare necesară.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
