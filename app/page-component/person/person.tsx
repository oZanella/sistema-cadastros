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

export default function Person() {
  const [submitting, setSubmitting] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState<string>("");

  const form = useForm<PersonFormProps>({
    resolver: zodResolver(personZod),
    defaultValues: {
      nome: "",
      sobrenome: "",
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
        sobrenome: values.sobrenome,
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

  return (
    <div className="relative w-full">
      <TitlePersonalizado>Cadastrar Pessoa</TitlePersonalizado>

      <Card>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-4 gap-4 m-4 items-end"
        >
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
            name="sobrenome"
            label="Sobrenome"
            required
            maxLength={60}
          />

          <FormInput
            type="number"
            control={form.control}
            name="idade"
            label="Idade"
            required
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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

          <div className="col-span-4 flex justify-end mt-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
