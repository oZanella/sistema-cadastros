import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Atualiza a sessão (mantém login persistente)
  const response = await updateSession(request)

  // Cria um client Supabase no contexto do middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
      },
    }
  )

  // Verifica se há uma sessão ativa
  const { data } = await supabase.auth.getSession()
  const isAuth = !!data.session

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/" || pathname === "/login"

  // 🔒 1. Se não estiver logado e tentar acessar outra página → redireciona para login
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // 🔁 2. Se já estiver logado e tentar acessar a página de login → vai para /home
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // Retorna a resposta normal (com sessão atualizada)
  return response
}

// Aplica o middleware a todas as rotas, exceto assets e imagens
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
