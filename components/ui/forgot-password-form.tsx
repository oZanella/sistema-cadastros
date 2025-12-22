"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;
      setSuccess(true); // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setError("Erro ao enviar e-mail de redefinição");
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
        <div className="w-full max-w-md space-y-10">
          {success ? (
            <>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Verifique seu e-mail
                </h1>
                <p className="text-muted-foreground">
                  Enviamos um link para redefinir sua senha.
                </p>
              </div>

              <div className="rounded-lg border border-muted bg-muted/40 px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  Caso exista uma conta associada a este e-mail, você receberá
                  as instruções para redefinir sua senha.
                </p>
              </div>

              <Button
                asChild
                className="w-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
              >
                <Link href="/auth/login">Voltar para o login</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Recuperar senha
                </h1>
                <p className="text-muted-foreground">
                  Informe seu e-mail para receber o link de redefinição
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-6">
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

                {error && (
                  <p className="text-sm text-red-500 font-medium">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
                >
                  {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Lembrou da senha?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Voltar para o login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* LADO DIREITO — VISUAL */}
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
            Segurança e controle total da sua conta.
          </p>
        </div>
      </div>
    </div>
  );
}
