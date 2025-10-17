import z from "zod";

export const personZod = z
  .object({
    id: z.number().optional(),
    nome: z.string(),
    idade: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.id) {
      if (!data.idade || (data.idade && data.idade === 0)) {
        ctx.addIssue({
          code: "custom",
          message: "Idade Inválida",
          path: ["idade"],
          expected: "number",
        });
      }
    }
  });

export type PersonFormProps = z.infer<typeof personZod>;
