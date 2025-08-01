import { z } from 'zod'

export const EditUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .min(1, { message: 'Email é obrigatório' })
    .refine(email => !email.includes(' '), {
      message: 'Email não pode conter espaços',
    })
    .refine(email => email.endsWith('@senfio.com'), {
      message: 'Email deve terminar com @senfio.com',
    })
    .trim(),
  works_since: z.string().min(1, { message: 'Data é obrigatória' }),
  // Campos readonly não incluídos: id, team, is_active, is_staff
})

export type EditUserSchemaType = z.infer<typeof EditUserSchema>

export const EditUserDefaultValues: EditUserSchemaType = {
  email: '',
  works_since: '',
}
