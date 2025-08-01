import { z } from 'zod'

export const SignInSchema = z.object({
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
    .min(1, { message: 'Senha é obrigatória' })
    .trim(),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignInDefaultValues: SignInSchemaType = {
  email: '',
  password: '',
}
