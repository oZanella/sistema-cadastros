"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SignUpSuccessForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
              Conta criada com sucesso!
            </h1>

            <p className="text-zinc-400">Seu cadastro foi finalizado.</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enviamos um e-mail de confirmação para você. Verifique sua caixa
              de entrada (e o spam) antes de acessar o sistema.
            </p>

            <Button
              asChild
              className="w-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Link href="/auth/login">Acessar minha conta</Link>
            </Button>
          </div>
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
            Seu acesso ao Zynk System está quase pronto.
          </p>
        </div>
      </div>
    </div>
  );
}
