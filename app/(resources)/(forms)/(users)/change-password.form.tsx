"use client"

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ChangePasswordDefaultValues, ChangePasswordSchema, ChangePasswordSchemaType } from './change-password.schema'

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordSchemaType) => Promise<void>
  isLoading?: boolean
}

export const ChangePasswordForm = ({ onSubmit, isLoading = false }: ChangePasswordFormProps) => {
  const router = useRouter()

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordDefaultValues,
  })

  const handleSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      await onSubmit(data)
      toast.success('Senha alterada com sucesso')
      form.reset()
    } catch (error: any) {
      const errorMessage = error.data?.errors
        ? Object.values(error.data.errors).join(', ')
        : 'Erro ao alterar senha'
      toast.error('Erro ao alterar senha', {
        description: errorMessage,
      })
    }
  }

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(handleSubmit)}>
        <BaseInput
          control={form.control}
          name="current_password"
          label="Senha Atual"
          placeholder="Digite sua senha atual"
          type="password"
        />

        <BaseInput
          control={form.control}
          name="new_password"
          label="Nova Senha"
          placeholder="Digite sua nova senha"
          type="password"
        />

        <BaseInput
          control={form.control}
          name="confirm_password"
          label="Confirmar Nova Senha"
          placeholder="Confirme sua nova senha"
          type="password"
        />

        <div className="space-y-3">
          <BaseButton
            type="submit"
            isLoading={isLoading}
            loadingText="Alterando..."
          >
            Alterar Senha
          </BaseButton>

          <BaseButton
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  )
} 