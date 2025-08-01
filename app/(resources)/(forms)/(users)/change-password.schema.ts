import { z } from 'zod'

export const ChangePasswordSchema = z.object({
  current_password: z.string().min(1, 'Senha atual é obrigatória'),
  new_password: z.string().min(8, 'Nova senha deve ter pelo menos 8 caracteres'),
  confirm_password: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: 'As senhas não coincidem',
  path: ['confirm_password'],
})

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

export const ChangePasswordDefaultValues: ChangePasswordSchemaType = {
  current_password: '',
  new_password: '',
  confirm_password: '',
} 