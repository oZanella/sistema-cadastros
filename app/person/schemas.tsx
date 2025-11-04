import z from "zod";

export const personZod = z
  //validação genérica
  .object({
    id: z.number(),
    nome: z.string(),
    sobrenome: z.string(),
    idade: z
      .number()
      .min(1, "Idade inválida deve ser maior que zero")
      .optional(),
    dtcad: z.string(),
    tp: z.boolean,
    cpfcnpj: z.number,
  })

  //validação personalizada
  .superRefine((data, ctx) => {
    //data é usado como "padrão" para informar de que esta consultando o banco de dados se a propriedade existe
    if (data.id) {
      if (!data.idade || (data.idade && data.idade === 0)) {
        //ctx é usado na documentação para informar o erro personalizado, addInssue é um objeto
        ctx.addIssue({
          code: "custom",
          message: "Idade Inválida deve ser maior que zero",
          path: ["idade"],
          expected: "number",
        });
      }
    }
  });

export type PersonFormProps = z.infer<typeof personZod>;
