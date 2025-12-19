"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";
import { personZod, PersonFormProps } from "@/app/product/schemas";
import { Button } from "@/components/ui/button";
import TitlePersonalizado from "@/components/ui-padrao/text-personalizado";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Brands() {
  const [submitting, setSubmitting] = useState(false);
  const [unidade, setUnidade] = useState<string>("");
  const [marcas, setMarcas] = useState<string>("");
  const [subtipo, setSubtipo] = useState<string>("");

  const form = useForm<PersonFormProps>({
    resolver: zodResolver(personZod),
    defaultValues: {
      nome: "",
      desc_comp: "",
      unidade: undefined,
      referencia: "",
      marcas: undefined,
      subtipo: undefined,
    },
  });

  const handleSubmit = async (values: PersonFormProps) => {
    setSubmitting(true);

    const { error } = await supabase.from("pessoas").insert([
      {
        nome: values.nome,
        idade: values.desc_comp,
        tp: values.unidade,
        unidade: values.unidade,
        marcas: values.marcas,
        subtipo: values.subtipo,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar pessoa no banco de dados.");
    } else {
      alert("Pessoa cadastrada com sucesso!");
      form.reset();
      setUnidade("");
      setMarcas("");
      setSubtipo("");
    }

    setSubmitting(false);
  };

  const itens = [
    {
      title: "Comprado",
    },
    {
      title: "Fabricado",
    },
    {
      title: "Serviço",
    },
    {
      title: "Produto ativo",
    },
  ];

  return (
    <div className="relative w-full">
      <div>
        <TitlePersonalizado className="font-bold mb-4">
          Marcas
        </TitlePersonalizado>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="p-4">
            <TitlePersonalizado className="text-base font-semibold text-blue-500 ">
              Dados Principais
            </TitlePersonalizado>

            <div className="grid md:grid-cols-3 gap-4 items-end">
              <FormInput
                control={form.control}
                name="nome"
                label="Nome"
                required
                maxLength={60}
              />

              <FormInput
                control={form.control}
                name="desc_comp"
                label="Descrição Complementar"
                required
                maxLength={60}
              />

              <div className="flex flex-col">
                <label
                  htmlFor="tipo"
                  className="text-sm font-medium text-foreground mb-1"
                >
                  Unidade de medida
                </label>

                <Select
                  value={unidade}
                  onValueChange={(value) => {
                    setUnidade(value);
                    form.setValue("unidade", value);
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer group h-10">
                    <SelectValue placeholder="Selecione..." />
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground transition-none group-data-[state=open]:rotate-180" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="unidade">UN</SelectItem>
                    <SelectItem value="metro">MT</SelectItem>
                    <SelectItem value="tonelada">TN</SelectItem>
                    <SelectItem value="peca">PC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormInput
                type="text"
                control={form.control}
                name="referencia"
                label="Referência"
                required
                maxLength={11}
              />

              <div className="flex flex-col">
                <label
                  htmlFor="tipo"
                  className="text-sm font-medium text-foreground mb-1"
                >
                  Marca
                </label>

                <Select
                  value={marcas}
                  onValueChange={(value) => {
                    setMarcas(value);
                    form.setValue("marcas", value);
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer group h-10">
                    <SelectValue placeholder="Selecione..." />
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground transition-none group-data-[state=open]:rotate-180" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="nike">NIKE</SelectItem>
                    <SelectItem value="adidas">ADIDAS</SelectItem>
                    <SelectItem value="fabricante">FABRICANTE</SelectItem>
                    <SelectItem value="generico">GENÉRICO</SelectItem>
                    <SelectItem value="marca">MARCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="tipo"
                  className="text-sm font-medium text-foreground mb-1"
                >
                  Subtipo
                </label>

                <Select
                  value={subtipo}
                  onValueChange={(value) => {
                    setSubtipo(value);
                    form.setValue("subtipo", value);
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer group h-10">
                    <SelectValue placeholder="Selecione..." />
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground transition-none group-data-[state=open]:rotate-180" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="revenda">
                      Mercadoria para Revenda
                    </SelectItem>
                    <SelectItem value="prima">Matéria-Prima</SelectItem>
                    <SelectItem value="embalagem">Embalagem</SelectItem>
                    <SelectItem value="processo">
                      Produto em Processo
                    </SelectItem>
                    <SelectItem value="acabado">Produto Acabado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="mt-4">
            <TitlePersonalizado className="text-base font-semibold text-blue-500 ml-4">
              Tipo
            </TitlePersonalizado>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
              {itens.map((item, index) => (
                <Card
                  key={index}
                  className="p-2 sm:p-3 flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm break-words leading-tight flex-1 min-w-0">
                      {item.title}
                    </p>
                    <Switch className="scale-90 sm:scale-100 mb-1" />
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
