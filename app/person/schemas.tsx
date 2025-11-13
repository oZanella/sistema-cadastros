import z from "zod";

export const personZod = z
  .object({
    id: z.uuid().optional(),

    nome: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(60, "Nome não pode ter mais de 60 caracteres"),

    idade: z.number().min(1, "Idade inválida, deve ser maior que zero"),

    tipo: z
      .enum(["F", "J", "E"])
      .refine((val) => !!val, { message: "Tipo de pessoa é obrigatório" }),

    cnpjcpf: z
      .string()
      .regex(/^\d+$/, "CPF/CNPJ deve conter apenas números")
      .min(11, "CPF/CNPJ deve ter no mínimo 11 dígitos")
      .max(14, "CPF/CNPJ não pode ter mais de 14 dígitos")
      .optional(),

    email: z
      .string()
      .min(5, "E-mail muito curto")
      .max(60, "E-mail muito longo")
      .email("E-mail inválido"),

    telefone: z
      .string()
      .regex(/^\d{10,11}$/, "Telefone deve ter entre 10 e 11 dígitos")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipo === "E") {
      if (data.cnpjcpf !== "9999999999999") {
        ctx.addIssue({
          code: "custom",
          message: "Para estrangeiro, o CPF/CNPJ deve ser 9999999999999",
          path: ["cnpjcpf"],
        });
      }
    }

    if (data.tipo === "F" && data.cnpjcpf && data.cnpjcpf.length !== 11) {
      ctx.addIssue({
        code: "custom",
        message: "CPF deve conter 11 dígitos",
        path: ["cnpjcpf"],
      });
    }

    if (data.tipo === "J" && data.cnpjcpf && data.cnpjcpf.length !== 14) {
      ctx.addIssue({
        code: "custom",
        message: "CNPJ deve conter 14 dígitos",
        path: ["cnpjcpf"],
      });
    }
  });

export type PersonFormProps = z.infer<typeof personZod>;
