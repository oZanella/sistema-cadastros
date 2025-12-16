"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";
import { personZod, PersonFormProps } from "@/app/person/schemas";
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

export default function Person() {
  const [submitting, setSubmitting] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState<string>("");

  const form = useForm<PersonFormProps>({
    resolver: zodResolver(personZod),
    defaultValues: {
      nome: "",
      idade: undefined,
      cnpjcpf: "",
      email: "",
      telefone: "",
      tipo: undefined,
    },
  });

  const handleSubmit = async (values: PersonFormProps) => {
    setSubmitting(true);

    const cnpjcpfFinal = values.tipo === "E" ? "9999999999999" : values.cnpjcpf;

    const { error } = await supabase.from("pessoas").insert([
      {
        nome: values.nome,
        idade: values.idade,
        tp: values.tipo,
        cnpjcpf: cnpjcpfFinal,
        email: values.email,
        telefone: values.telefone,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar pessoa no banco de dados.");
    } else {
      alert("Pessoa cadastrada com sucesso!");
      form.reset();
      setTipoPessoa("");
    }

    setSubmitting(false);
  };

  const itens = [
    {
      title: "Fornecedor",
      desc: "Marque se o cliente também atua como fornecedor de produtos ou serviços.",
    },
    {
      title: "Não contribuinte",
      desc: "Indica que o cliente é consumidor final e não contribui com ICMS.",
    },
    {
      title: "Simples Nacional",
      desc: "Indica que o cliente é optante pelo regime tributário do Simples Nacional.",
    },
    {
      title: "Situação",
      desc: "Define se o cliente está ativo ou inativo no sistema.",
    },
  ];

  return (
    <div className="relative w-full">
      <TitlePersonalizado className="font-bold mb-4">
        Cadastrar Fornecedor
      </TitlePersonalizado>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="p-4">
          <TitlePersonalizado className="text-base font-semibold text-blue-500 ">
            Dados Principais
          </TitlePersonalizado>

          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <label
                htmlFor="tipo"
                className="text-sm font-medium text-foreground mb-1"
              >
                Tipo Pessoa
              </label>

              <Select
                value={tipoPessoa}
                onValueChange={(value) => {
                  setTipoPessoa(value);

                  const tipoMap = {
                    fisica: "F",
                    juridica: "J",
                    estrangeiro: "E",
                  } as const;

                  form.setValue("tipo", tipoMap[value as keyof typeof tipoMap]);

                  if (value === "estrangeiro") {
                    form.setValue("cnpjcpf", "9999999999999");
                  } else {
                    form.setValue("cnpjcpf", "");
                  }
                }}
              >
                <SelectTrigger className="w-full cursor-pointer group h-10">
                  <SelectValue placeholder="Selecione..." />
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground transition-none group-data-[state=open]:rotate-180" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="fisica">Física</SelectItem>
                  <SelectItem value="juridica">Jurídica</SelectItem>
                  <SelectItem value="estrangeiro">Estrangeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormInput
              type="text"
              control={form.control}
              name="cnpjcpf"
              label="CPF/CNPJ"
              required
              maxLength={14}
              disabled={tipoPessoa === "estrangeiro"}
            />

            <FormInput
              control={form.control}
              name="nome"
              label="Nome"
              required
              maxLength={60}
            />

            <FormInput
              type="text"
              control={form.control}
              name="idade"
              label="Idade"
              required
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              maxLength={3}
            />

            <FormInput
              type="text"
              control={form.control}
              name="telefone"
              label="Telefone"
              required
              maxLength={11}
            />

            <FormInput
              type="text"
              control={form.control}
              name="email"
              label="E-mail"
              required
              maxLength={60}
            />
          </div>
        </Card>

        <Card className="mt-4">
          <TitlePersonalizado className="text-base font-semibold text-blue-500 ml-4">
            Tipo de Pessoa
          </TitlePersonalizado>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {itens.map((item, index) => (
              <Card
                key={index}
                className="p-4 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-mb font-semibold break-words">
                      {item.title}
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70 leading-snug break-words">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex justify-end items-center mt-2 sm:mt-0">
                    <Switch />
                  </div>
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
  );
}
