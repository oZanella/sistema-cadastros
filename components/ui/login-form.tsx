"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/home");
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("invalid login credentials")) {
        setError("Credenciais incorretas");
      } else if (err?.message?.toLowerCase().includes("email not confirmed")) {
        setError("E-mail não confirmado");
      } else {
        setError("Erro ao realizar login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-linear-to-br text-grey-900",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-grey-900">
              Bem-vindo ao Zynk System
            </h1>

            <p className="text-zinc-400">
              Informe seus dados para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted px-10">
        <div className="max-w-md text-center space-y-4">
          <Image
            src="/images/logo-zynk.png"
            alt="Logo Zynk"
            width={500}
            height={500}
            className="object-contain"
          />
          <p className="text-muted-foreground text-lg">
            Gerencie seu sistema com segurança, rapidez e simplicidade.
          </p>
        </div>
      </div>
    </div>
  );
}
