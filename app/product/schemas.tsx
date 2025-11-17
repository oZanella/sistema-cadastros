import z from "zod";

export const personZod = z.object({
  id: z.uuid().optional(),

  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(60, "Nome não pode ter mais de 60 caracteres"),

  desc_comp: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(60, "Nome não pode ter mais de 60 caracteres"),

  unidade: z.string(),

  referencia: z
    .string()
    .max(60, "Referência não pode ter mais de 60 caracteres"),

  marcas: z.string(),

  subtipo: z.string(),
});

export type PersonFormProps = z.infer<typeof personZod>;
