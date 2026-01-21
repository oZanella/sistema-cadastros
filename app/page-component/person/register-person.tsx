"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { PersonFormProps } from "@/app/person/schemas";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { maskCNPJ, maskCPF } from "@/utils/masks";

export default function Person() {
  const [submitting, setSubmitting] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = Boolean(id);

  const form = useForm<PersonFormProps>({
    shouldUnregister: true,
    defaultValues: {
      nome: "",
      idade: "",
      cnpjcpf: "",
      email: "",
      telefone: "",
      tipo: undefined,
    },
  });

  type TipoPessoaDB = "F" | "J" | "E";

  useEffect(() => {
    if (!id) return;

    async function carregarPessoa() {
      const { data, error } = await supabase
        .from("pessoas")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Erro ao carregar pessoa para edição");
        return;
      }

      form.reset({
        nome: String(data.nome ?? ""),
        idade: String(data.idade ?? ""),
        cnpjcpf:
          data.tp === "J"
            ? maskCNPJ(String(data.cnpjcpf ?? ""))
            : data.tp === "F"
              ? maskCPF(String(data.cnpjcpf ?? ""))
              : String(data.cnpjcpf ?? ""),
        email: String(data.email ?? ""),
        telefone: String(data.telefone ?? ""),
        tipo: data.tp,
      });

      const tipoReverseMap: Record<TipoPessoaDB, string> = {
        F: "fisica",
        J: "juridica",
        E: "estrangeiro",
      };

      setTipoPessoa(tipoReverseMap[data.tp as TipoPessoaDB]);
    }

    carregarPessoa();
  }, [id, form]);

  const handleSubmit = async (values: PersonFormProps) => {
    setSubmitting(true);

    const cnpjcpfFinal =
      values.tipo === "E"
        ? "99999999999999"
        : (values.cnpjcpf ?? "").replace(/\D/g, "");

    const payload = {
      nome: values.nome,
      idade: values.idade ? Number(values.idade) : null,
      tp: values.tipo,
      cnpjcpf: cnpjcpfFinal,
      email: values.email,
      telefone: values.telefone,
    };

    const { error } = isEdit
      ? await supabase.from("pessoas").update(payload).eq("id", id)
      : await supabase.from("pessoas").insert([payload]);

    setSubmitting(false);

    if (error) {
      alert("Erro ao salvar pessoa");
      return;
    }

    alert(
      isEdit
        ? "Pessoa atualizada com sucesso!"
        : "Pessoa cadastrada com sucesso!",
    );

    form.reset();
    setTipoPessoa("");
    router.push("/person");
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
      desc: "Define a situação do cliente como ativo ou inativo no sistema.",
    },
  ];

  return (
    <div className="relative w-full">
      <TitlePersonalizado>
        {isEdit ? "Editar Cliente" : "Cadastrar Cliente"}
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

                  form.setValue(
                    "tipo",
                    tipoMap[value as keyof typeof tipoMap],
                    {
                      shouldValidate: true,
                    },
                  );

                  if (value === "estrangeiro") {
                    const padraoEstrangeiro = "99999999999999";
                    form.setValue("cnpjcpf", maskCNPJ(padraoEstrangeiro));
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
              disabled={tipoPessoa === "estrangeiro"}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");

                if (tipoPessoa === "estrangeiro") {
                  const padraoEstrangeiro = "99999999999999";
                  form.setValue("cnpjcpf", maskCNPJ(padraoEstrangeiro), {
                    shouldValidate: true,
                  });
                  return;
                }

                if (tipoPessoa === "juridica") {
                  raw = raw.slice(0, 14);
                  form.setValue("cnpjcpf", maskCNPJ(raw), {
                    shouldValidate: true,
                  });
                }

                if (tipoPessoa === "fisica") {
                  raw = raw.slice(0, 11);
                  form.setValue("cnpjcpf", maskCPF(raw), {
                    shouldValidate: true,
                  });
                }
              }}
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
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              maxLength={3}
            />

            <FormInput
              type="text"
              control={form.control}
              name="telefone"
              label="Telefone"
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
                    <p className="text-mb font-semibold wrap-break-word">
                      {item.title}
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70 leading-snug wrap-break-word">
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

        <div className="flex justify-end mt-4 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/person")}
          >
            {submitting ? "Voltando..." : "Voltar"}
          </Button>
          <Button type="submit" variant={"default"} disabled={submitting}>
            {submitting
              ? isEdit
                ? "Salvando..."
                : "Enviando..."
              : isEdit
                ? "Atualizar"
                : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
