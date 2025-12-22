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

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error) throw error;

      router.push("/auth/sign-up-success");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setError("Erro ao criar conta");
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
            <h1 className="text-3xl font-bold tracking-tight">
              Criar conta no Zynk
            </h1>
            <p className="text-zinc-400">
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
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
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repeat-password">Confirmar senha</Label>
              <Input
                id="repeat-password"
                type="password"
                placeholder="••••••••"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted dark:bg-muted/30 px-10">
        <div className="max-w-md text-center space-y-4">
          <Image
            src="/images/logo-zynk.png"
            alt="Logo Zynk"
            width={500}
            height={500}
            className="object-contain drop-shadow-md"
          />
          <p className="text-muted-foreground text-lg">
            Comece a usar o Zynk com segurança e simplicidade.
          </p>
        </div>
      </div>
    </div>
  );
}
