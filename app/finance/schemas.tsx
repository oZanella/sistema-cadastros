import z from "zod";

export const financeZod = z.object({
  id: z.number(),

  created_at: z.string().optional(),

  tipo: z.enum(["Receita", "Despesa"]),

  data: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),

  nome: z.string().min(1).max(60),

  historico: z.string().nullable().optional(),

  valor: z.number(),
});

export type FinanceListagemProps = z.infer<typeof financeZod>;
