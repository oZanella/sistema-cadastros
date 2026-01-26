import z from "zod";

export const personZod = z
  .object({
    id: z.uuid().optional(),

    nome: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(60, "Nome não pode ter mais de 60 caracteres"),

    idade: z.string().max(3, "Máximo de 3 caracteres"),

    tipo: z
      .enum(["F", "J", "E"])
      .refine((val) => !!val, { message: "Tipo de pessoa é obrigatório" }),

    cnpjcpf: z.preprocess((val) => {
      if (typeof val === "string") {
        return val.replace(/\D/g, "");
      }
      return val;
    }, z.string()),

    email: z
      .string()
      .min(5, "E-mail muito curto")
      .max(60, "E-mail muito longo")
      .email("E-mail inválido"),

    telefone: z.preprocess(
      (val) => {
        if (typeof val === "string") {
          return val.replace(/\D/g, "");
        }
        return val;
      },
      z
        .string()
        .regex(/^\d{10,11}$/, "Telefone deve ter entre 10 e 11 dígitos")
        .optional(),
    ),
  })

  .superRefine((data, ctx) => {
    if (!data.tipo) return;

    if (data.tipo === "E") {
      if (data.cnpjcpf !== "9999999999999") {
        ctx.addIssue({
          path: ["cnpjcpf"],
          message: "Para estrangeiro, informe 9999999999999",
          code: z.ZodIssueCode.custom,
        });
      }
      return;
    }

    if (data.tipo === "F" && data.cnpjcpf.length !== 11) {
      ctx.addIssue({
        path: ["cnpjcpf"],
        message: "CPF deve conter 11 dígitos",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.tipo === "J" && data.cnpjcpf.length !== 14) {
      ctx.addIssue({
        path: ["cnpjcpf"],
        message: "CNPJ deve conter 14 dígitos",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type PersonFormProps = z.infer<typeof personZod>;
