"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TitlePersonalizado from "@/components/ui-padrao/text-personalizado";
import { Pencil, Trash } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Pessoa = {
  id: number;
  nome: string;
  sobrenome: string;
  idade: number;
  tp: "F" | "J" | "E";
  cnpjcpf: string;
  email: string;
  telefone: string;
};

function formatTipo(tipo: string) {
  if (tipo === "F") return "Física";
  if (tipo === "J") return "Jurídica";
  return "Estrangeiro";
}

export default function PersonList() {
  const router = useRouter();

  const [pesquisa, setPesquisa] = useState("");
  const [dados, setDados] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarPessoas() {
    setLoading(true);

    const { data, error } = await supabase.from("pessoas").select("*");

    if (error) {
      console.error(error);
      alert("Erro ao carregar pessoas");
    } else {
      setDados(data as Pessoa[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarPessoas();
  }, []);

  const dadosFiltrados = dados.filter((item) =>
    item.nome.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const handleExcluir = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta pessoa?")) return;

    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .order("nome");

    console.log(data);

    if (error) {
      alert("Erro ao excluir registro");
    } else {
      alert("Pessoa excluída com sucesso");
      carregarPessoas();
    }
  };

  return (
    <div className="min-h-screen">
      <TitlePersonalizado>Cadastro de Pessoas</TitlePersonalizado>

      <div className="max-w-full mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Pesquisar por nome..."
            className="max-w-xs"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />

          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => router.push("/person/register")}
          >
            Adicionar
          </Button>
        </div>

        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">
                    Nome
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">
                    CPF/CNPJ
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">
                    Telefone
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">
                    E-mail
                  </th>
                  <th className="text-right py-3 px-4"></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Carregando...
                    </td>
                  </tr>
                ) : dadosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      {pesquisa
                        ? "Nenhum resultado encontrado"
                        : "Nenhuma pessoa cadastrada"}
                    </td>
                  </tr>
                ) : (
                  dadosFiltrados.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="py-3 px-4 text-sm">
                        {formatTipo(item.tp)}
                      </td>

                      <td className="py-3 px-4 text-sm">{item.nome}</td>

                      <td className="py-3 px-4 text-sm">
                        {item.tp === "E" ? "-" : item.cnpjcpf}
                      </td>

                      <td className="py-3 px-4 text-sm">{item.telefone}</td>

                      <td className="py-3 px-4 text-sm">{item.email}</td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Pencil
                            className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
                            onClick={() =>
                              router.push(`/person/cadastro?id=${item.id}`)
                            }
                          />
                          <Trash
                            className="w-4 h-4 cursor-pointer text-red-600 hover:text-red-800"
                            onClick={() => handleExcluir(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
