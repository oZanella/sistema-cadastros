"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
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
  const [loadingId, setLoadingId] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<PersonFormProps>({
    resolver: zodResolver(personZod),
    defaultValues: {
      id: undefined,
      nome: "",
      idade: undefined,
    },
  });

  useEffect(() => {
    async function fetchNextId() {
      setLoadingId(true);

      const { data, error } = await supabase
        .from("pessoas")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Erro ao buscar ID:", error);
        setLoadingId(false);
        return;
      }

      const lastId = data?.[0]?.id ?? -1;
      const nextId = lastId + 1;

      form.setValue("id", nextId);
      setLoadingId(false);
    }

    fetchNextId();
  }, [form]);

  const handleSubmit = async (values: PersonFormProps) => {
    setSubmitting(true);

    const { error } = await supabase.from("pessoas").insert([
      {
        id: values.id,
        nome: values.nome,
        idade: values.idade,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar pessoa no banco de dados.");
    } else {
      alert("Pessoa cadastrada com sucesso!");
      form.reset();

      const { data } = await supabase
        .from("pessoas")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);
      const nextId = (data?.[0]?.id ?? -1) + 1;
      form.setValue("id", nextId);
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
              htmlFor="tp"
              className="text-sm font-medium text-foreground mb-1"
            >
              Tipo Pessoa
            </label>

            <Select>
              <SelectTrigger className="w-full cursor-pointer group h-[40px]">
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
            name="cpfcnpj"
            label="CPF/CNPJ"
            required
            maxLength={60}
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
            maxLength={2}
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <FormInput
            type="text"
            control={form.control}
            name="dtcad"
            label="Data Cadastro"
            required
            maxLength={60}
          />

          <FormInput
            type="text"
            control={form.control}
            name="telefone"
            label="Telefone"
            required
            maxLength={60}
          />

          <FormInput
            type="text"
            control={form.control}
            name="email"
            label="E-mail"
            required
            maxLength={60}
          />
        </form>
      </Card>
      <Button className="mt-6" type="submit" disabled={loadingId || submitting}>
        {submitting ? "Enviando..." : "Enviar"}
      </Button>
    </div>
  );
}
