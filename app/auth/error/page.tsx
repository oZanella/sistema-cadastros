"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Desculpe, algo deu errado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Erro: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ocorreu um erro não especificado.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
