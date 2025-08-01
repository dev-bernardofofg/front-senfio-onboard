'use client'

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseDatePicker } from '@/app/(components)/(base)/(form)/base-date-picker'
import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { Form } from '@/components/ui/form'
import { User } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  EditUserDefaultValues,
  EditUserSchema,
  EditUserSchemaType,
} from './edit-user.schema'

interface EditUserFormProps {
  user?: User
  onSubmit: (data: EditUserSchemaType) => Promise<void>
  isLoading?: boolean
}

export const EditUserForm = ({
  user,
  onSubmit,
  isLoading = false,
}: EditUserFormProps) => {
  const router = useRouter()

  const form = useForm<EditUserSchemaType>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: EditUserDefaultValues,
  })

  // Preencher formulário com dados do usuário
  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        works_since: user.works_since,
      })
    }
  }, [user, form])

  const handleSubmit = async (data: EditUserSchemaType) => {
    try {
      await onSubmit(data)
      toast.success('Usuário atualizado com sucesso')
      router.push('/users')
    } catch (error: any) {
      const errorMessage = error.data?.errors
        ? Object.values(error.data.errors).join(', ')
        : 'Erro ao atualizar usuário'
      toast.error('Erro ao atualizar usuário', {
        description: errorMessage,
      })
    }
  }

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(handleSubmit)}>
        <BaseInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="email@senfio.com"
          type="email"
        />

        <BaseDatePicker
          control={form.control}
          name="works_since"
          label="Data de Admissão"
          placeholder="Data de Admissão"
        />

        <div className="space-y-3">
          <BaseButton
            type="submit"
            isLoading={isLoading}
            loadingText="Atualizando..."
          >
            Atualizar Usuário
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
