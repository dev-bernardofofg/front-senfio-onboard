import { z } from "zod";

export const upsertCouponSchema = z.object({
  code: z
    .string()
    .min(1, "Código é obrigatório")
    .max(50, "Código deve ter no máximo 50 caracteres"),
  description: z.string().min(1, "Descrição é obrigatória"),
  max_redemptions: z
    .number()
    .min(0, "Número máximo de resgates deve ser maior ou igual a 0")
    .optional()
    .nullable(),
  available: z.boolean(),
});

export type UpsertCouponFormData = z.infer<typeof upsertCouponSchema>;
