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
  ProfileDefaultValues,
  ProfileSchema,
  ProfileSchemaType,
} from './profile.schema'

interface ProfileFormProps {
  user?: User
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const router = useRouter()

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: ProfileDefaultValues,
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

  const handleSubmit = async (data: ProfileSchemaType) => {
    try {
      // await updateUser(data)
      toast.success('Perfil atualizado com sucesso')
      router.push('/dashboard')
    } catch (error: any) {
      const errorMessage = error.data?.errors
        ? Object.values(error.data.errors).join(', ')
        : 'Erro ao atualizar perfil'
      toast.error('Erro ao atualizar perfil', {
        description: errorMessage,
      })
    }
  }

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <BaseInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="email@senfio.com"
            type="email"
            readOnly
          />

          <BaseDatePicker
            control={form.control}
            name="works_since"
            label="Data de Admissão"
            placeholder="Data de Admissão"
            readOnly
          />
        </div>
        <div className="space-y-3">
          <BaseButton
            type="submit"
            isLoading={false}
            loadingText="Atualizando..."
            disabled
          >
            Aguardando implementação para edição de perfil
          </BaseButton>

          <BaseButton
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
          >
            Voltar ao Dashboard
          </BaseButton>
        </div>
      </BaseForm>
    </Form>
  )
}
