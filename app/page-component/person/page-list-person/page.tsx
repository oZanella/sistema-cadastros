"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TitlePersonalizado from "@/components/ui-padrao/text-personalizado";
import { Pencil, Plus, Trash } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ModalDelete } from "@/components/ui-padrao/modal-delete";
import { maskCPF, maskCNPJ, maskTelefone } from "@/utils/masks";

type Pessoa = {
  id: number;
  nome: string;
  sobrenome: string;
  idade: number;
  tp: "F" | "J" | "E";
  cnpjcpf: string;
  email: string;
  telefone: string;
  pessoa: "P" | "F";
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
  const [excluindo, setExcluindo] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(
    null,
  );

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

  const abrirModalExcluir = (pessoa: Pessoa) => {
    setPessoaSelecionada(pessoa);
    setModalAberto(true);
  };

  const fecharModalExcluir = () => {
    setPessoaSelecionada(null);
    setModalAberto(false);
  };

  const confirmarExclusao = async () => {
    if (!pessoaSelecionada) return;

    setExcluindo(true);

    const { error } = await supabase
      .from("pessoas")
      .delete()
      .eq("id", pessoaSelecionada.id);

    setExcluindo(false);

    if (error) {
      alert("Erro ao excluir registro");
      return;
    }

    fecharModalExcluir();
    carregarPessoas();
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
            variant="defaultAdd"
            onClick={() => router.push("/person/register")}
          >
            <Plus className="w-4 h-4 " />
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
                        {item.tp === "F"
                          ? maskCPF(item.cnpjcpf ?? "")
                          : maskCNPJ(item.cnpjcpf ?? "")}{" "}
                      </td>

                      <td className="py-3 px-4 text-sm">
                        {maskTelefone(item.telefone)}
                      </td>

                      <td className="py-3 px-4 text-sm">{item.email}</td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Pencil
                            className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
                            onClick={() =>
                              router.push(`/person/register?id=${item.id}`)
                            }
                          />

                          <Trash
                            className="w-4 h-4 cursor-pointer text-red-600 hover:text-red-800"
                            onClick={() => abrirModalExcluir(item)}
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

      <ModalDelete
        open={modalAberto}
        onClose={fecharModalExcluir}
        onConfirm={confirmarExclusao}
        loading={excluindo}
        title="Excluir Pessoa"
        description={`Tem certeza que deseja excluir a pessoa "${
          pessoaSelecionada?.nome ?? ""
        }"?`}
      />
    </div>
  );
}
