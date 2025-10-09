import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Obrigado por criar sua conta!
              </CardTitle>
              <CardDescription>Cadastro finalizado com sucesso</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verifique seu e-mail para confirmar sua conta antes de fazer
                login.
              </p>
            </CardContent>
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/login" className="underline underline-offset-4">
                Acessar nova conta
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
