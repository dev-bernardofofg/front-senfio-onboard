import { z } from 'zod'

export const ProfileSchema = z.object({
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

export type ProfileSchemaType = z.infer<typeof ProfileSchema>

export const ProfileDefaultValues: ProfileSchemaType = {
  email: '',
  works_since: '',
}
