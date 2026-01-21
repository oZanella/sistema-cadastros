"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FinanceEditModal from "../modal-accounts";
import TitlePersonalizado from "@/components/ui-padrao/text-personalizado";

type FinanceItem = {
  id: number;
  tipo: "Aberto" | "Fechado" | "Parcial";
  data: string;
  nome: string;
  historico: string;
  valor: number;
};

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

function formatValor(v: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export default function FinanceReceive() {
  const [pesquisa, setPesquisa] = useState("");
  const [dados, setDados] = useState<FinanceItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FinanceItem | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    data: "",
    nome: "",
    historico: "",
    valor: "",
  });

  useEffect(() => {
    setDados([
      {
        id: 1,
        tipo: "Aberto",
        data: "2023-04-27",
        nome: "Venda",
        historico: "",
        valor: 3920.0,
      },
      {
        id: 2,
        tipo: "Fechado",
        data: "2024-01-20",
        nome: "Aluguel",
        historico: "Pagamento aluguel Janeiro",
        valor: 1500.0,
      },
      {
        id: 3,
        tipo: "Aberto",
        data: "2024-01-22",
        nome: "Supermercado",
        historico: "Compras mensais",
        valor: 800.5,
      },
      {
        id: 4,
        tipo: "Parcial",
        data: "2024-02-05",
        nome: "Venda à Vista",
        historico: "Venda de mercadorias balcão",
        valor: 1250.0,
      },
      {
        id: 5,
        tipo: "Fechado",
        data: "2024-02-10",
        nome: "Venda Parcelada",
        historico: "1ª parcela venda cliente João Silva",
        valor: 980.0,
      },
      {
        id: 6,
        tipo: "Aberto",
        data: "2024-02-15",
        nome: "Prestação de Serviço",
        historico: "Serviço de manutenção mensal",
        valor: 600.0,
      },
      {
        id: 7,
        tipo: "Fechado",
        data: "2024-02-18",
        nome: "Mensalidade",
        historico: "Mensalidade sistema fevereiro",
        valor: 299.9,
      },
      {
        id: 8,
        tipo: "Aberto",
        data: "2024-02-20",
        nome: "Venda Online",
        historico: "Pedido e-commerce #4587",
        valor: 1840.75,
      },
      {
        id: 9,
        tipo: "Aberto",
        data: "2024-02-22",
        nome: "Contrato",
        historico: "Recebimento contrato empresa ABC Ltda",
        valor: 3500.0,
      },
      {
        id: 10,
        tipo: "Aberto",
        data: "2024-02-25",
        nome: "Licenciamento",
        historico: "Licença anual software",
        valor: 1200.0,
      },
      {
        id: 11,
        tipo: "Parcial",
        data: "2024-02-27",
        nome: "Comissão",
        historico: "Comissão sobre vendas janeiro",
        valor: 450.0,
      },
      {
        id: 12,
        tipo: "Parcial",
        data: "2024-03-01",
        nome: "Venda a Prazo",
        historico: "Venda faturada cliente XPTO",
        valor: 2100.0,
      },
      {
        id: 13,
        tipo: "Aberto",
        data: "2024-03-05",
        nome: "Recuperação de Crédito",
        historico: "Pagamento de título em atraso",
        valor: 760.0,
      },
    ]);
  }, []);

  const handleEdit = (item: FinanceItem) => {
    setEditingItem(item);
    setFormData({
      tipo: item.tipo,
      data: item.data,
      nome: item.nome,
      historico: item.historico || "",
      valor: item.valor.toString(),
    });
    setIsEditOpen(true);
  };

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (!editingItem) return;

    setDados(
      dados.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              tipo: formData.tipo as "Aberto" | "Fechado" | "Parcial",
              data: formData.data,
              nome: formData.nome,
              historico: formData.historico,
              valor: parseFloat(formData.valor),
            }
          : item,
      ),
    );

    setIsEditOpen(false);
    alert("Registro atualizado com sucesso!");
  };

  const dadosFiltrados = dados.filter((item) =>
    item.nome.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <TitlePersonalizado>Contas a Receber</TitlePersonalizado>
      <div className="max-w-full mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Pesquisar por nome..."
            className="max-w-xs"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />

          <Button
            variant={"defaultAdd"}
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            <Plus className="w-4 h-4 " />
            Adicionar
          </Button>
        </div>

        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="cursor-default">
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Nome
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Histórico
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Valor
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-8">
                      Carregando...
                    </td>
                  </tr>
                ) : dadosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-8">
                      {pesquisa
                        ? "Nenhum resultado para esta pesquisa"
                        : "Nenhum registro cadastrado"}
                    </td>
                  </tr>
                ) : (
                  dadosFiltrados.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-default"
                    >
                      <td className="py-3 px-4">
                        {item.tipo === "Aberto" ? (
                          <div className="px-2 py-1 rounded bg-gray-500 text-white text-xs font-bold w-fit">
                            ABERTO
                          </div>
                        ) : item.tipo === "Fechado" ? (
                          <div className="px-2 py-1 rounded bg-green-700 text-white text-xs font-bold w-fit">
                            FECHADO
                          </div>
                        ) : (
                          <div className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-bold w-fit">
                            PARCIAL
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-sm">
                        {formatDate(item.data)}
                      </td>
                      <td className="py-3 px-4 text-sm">{item.nome}</td>
                      <td className="py-3 px-4 text-sm">{item.historico}</td>
                      <td className="py-3 px-4 text-sm">
                        R$ {formatValor(item.valor)}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Pencil
                            className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
                            onClick={() => handleEdit(item)}
                          />
                          <Trash className="w-4 h-4 cursor-pointer text-red-600 hover:text-red-800" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <FinanceEditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          formData={formData}
          onFormChange={handleFormChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
