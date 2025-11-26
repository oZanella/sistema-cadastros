import z from "zod";

export const financeZod = z.object({
  id: z.number(),

  created_at: z.string().optional(),

  tipo: z.string().transform((val) => {
    if (val === "Receita" || val === "Despesa") {
      return val;
    }
    const lower = val.toLowerCase();
    if (lower.includes("receit")) return "Receita";
    if (lower.includes("despes")) return "Despesa";
    return val;
  }),

  data: z
    .string()
    .or(z.date())
    .transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split("T")[0];
      }
      if (typeof val === "string") {
        if (val.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return val;
        }
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split("T")[0];
        }
      }
      return val;
    }),

  nome: z.string().min(1).max(60),

  historico: z.string().nullable().optional(),

  valor: z
    .number()
    .or(z.string())
    .transform((val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    }),
});

export type FinanceListagemProps = z.infer<typeof financeZod>;
