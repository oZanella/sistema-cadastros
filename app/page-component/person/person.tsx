"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";
import { PersonFormProps, personZod } from "@/app/person/schemas";
import { Button } from "@/components/ui/button";

export default function Person() {
  const form = useForm<PersonFormProps>({
    resolver: zodResolver(personZod),
  });

  const handleSubmit = (values: PersonFormProps) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">CR7 VERDE</h1>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormInput
          type="number"
          control={form.control}
          name="id"
          label="Código"
        />
        <FormInput
          type="number"
          control={form.control}
          name="idade"
          label="Idade"
        />
        <FormInput
          type="text"
          control={form.control}
          name="nome"
          label="Nome"
        />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
