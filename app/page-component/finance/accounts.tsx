"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { FinanceListagemProps, financeZod } from "@/app/finance/schemas";
import router from "next/router";

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

function formatValor(v: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export default function PessoaListagem() {
  const [pesquisa, setPesquisa] = useState("");
  const [dados, setDados] = useState<FinanceListagemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("finance")
          .select("*")
          .order("data", { ascending: false });

        if (error) {
          console.error("Erro ao buscar dados:", error);
          return;
        }

        if (!data || data.length === 0) {
          setDados([]);
          return;
        }

        const parsed = data.map((item) => financeZod.parse(item));
        setDados(parsed);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const dadosFiltrados = dados.filter((item) =>
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Pesquisar por nome..."
          className="max-w-xs"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <Button
          onClick={() => router.back()}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus />
          Adicionar
        </Button>
      </div>

      <Card className="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Histórico</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : dadosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  {pesquisa
                    ? "Nenhum resultado para esta pesquisa"
                    : "Nenhum registro cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              dadosFiltrados.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.tipo === "Despesa" ? (
                      <div className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold w-fit">
                        DESPESA
                      </div>
                    ) : (
                      <div className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold w-fit">
                        RECEITA
                      </div>
                    )}
                  </TableCell>

                  <TableCell>{formatDate(item.data)}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.historico || "-"}</TableCell>
                  <TableCell>R$ {formatValor(item.valor)}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <Pencil className="w-4 h-4 cursor-pointer text-blue-600" />
                      <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
