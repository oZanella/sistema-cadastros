"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";
import { personZod, PersonFormProps } from "@/app/person/schemas";
import { Button } from "@/components/ui/button";
import TitlePersonalizado from "@/components/ui-padrao/text-personalizado";
import { supabase } from "@/lib/supabaseClient";

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
    <div>
      <TitlePersonalizado>Cadastrar Pessoa</TitlePersonalizado>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 flex flex-row gap-4 m-4"
      >
        <FormInput
          type="text"
          control={form.control}
          name="nome"
          label="Nome"
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

        <Button
          className="m-6"
          type="submit"
          disabled={loadingId || submitting}
        >
          {submitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
