import { z } from 'zod'

export const SignUpSchema = z.object({
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
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    .trim(),
  member_since: z.string().min(1, { message: 'Data é obrigatória' }),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

export const SignUpDefaultValues: SignUpSchemaType = {
  email: '',
  password: '',
  member_since: '',
}
