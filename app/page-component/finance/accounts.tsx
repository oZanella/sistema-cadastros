"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Pencil, Trash, Filter, Columns, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function PessoaListagem() {
  const [pesquisa, setPesquisa] = useState("");

  const dados = [
    {
      id: 1,
      tipo: "Despesa",
      data: "13/12/2025",
      nome: "Henrique Zanella",
      historico: "Despesas de Escritório",
      valor: "54,00",
    },
    {
      id: 2,
      tipo: "Receita",
      data: "05/12/2025",
      nome: "Henrique Zanella",
      historico: "Salário",
      valor: "6.000,00",
    },
    {
      id: 3,
      tipo: "Despesa",
      data: "07/12/2025",
      nome: "Henrique Zanella",
      historico: "Cartão de Crédito",
      valor: "2.534,00",
    },
    {
      id: 4,
      tipo: "Receita",
      data: "15/12/2025",
      nome: "Henrique Zanella",
      historico: "Telefone",
      valor: "88,90",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Pesquisar por nome..."
          className="max-w-xs"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus />
            Adicionar
          </Button>
        </div>
      </div>

      <Card className="p-2 cursor-pointer">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Histórico</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dados.map((item) => (
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

                <TableCell>{item.data}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.historico}</TableCell>
                <TableCell>R$ {item.valor}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Pencil className="w-4 h-4 cursor-pointer text-blue-600" />
                    <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
