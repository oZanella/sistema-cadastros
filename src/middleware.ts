import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
      },
    }
  );

  const { data } = await supabase.auth.getSession();
  const isAuth = !!data.session;
  const pathname = request.nextUrl.pathname;

  /** 🔓 ROTAS AUTH LIBERADAS SEM REDIRECIONAR */
  const publicAuthRoutes = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/update-password",
    "/auth/sign-up",
  ];

  // 🔁 Sempre que acessar "/" → redireciona corretamente
  if (
    isAuth &&
    pathname.startsWith("/auth") &&
    pathname !== "/auth/update-password"
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 🔒 Não logado tentando acessar rota protegida
  if (
    !isAuth &&
    !publicAuthRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 🔁 Logado tentando acessar login ou signup
  if (
    isAuth &&
    ["/auth/login", "/auth/sign-up"].some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
