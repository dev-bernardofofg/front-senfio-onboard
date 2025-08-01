'use client'

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseDatePicker } from '@/app/(components)/(base)/(form)/base-date-picker'
import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { useAuth } from '@/app/(contexts)/auth.context'
import { Form } from '@/components/ui/form'
import { Login200, useLogin, User, useRegister } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  SignUpDefaultValues,
  SignUpSchema,
  SignUpSchemaType,
} from './sign-up.schema'

export const SignUpForm = () => {
  const router = useRouter()
  const { setAuth } = useAuth()

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: SignUpDefaultValues,
  })

  const { mutateAsync: login, isPending: isLoginPending } = useLogin()

  const { mutateAsync: register, isPending: isRegisterPending } = useRegister({
    mutation: {
      onSuccess: ({ data: userData }: { data: User }) => {
        toast.success('Usuário criado com sucesso')
        login(
          {
            data: {
              email: form.getValues('email'),
              password: form.getValues('password'),
            },
          },
          {
            onSuccess: ({ data: tokenData }: { data: Login200 }) => {
              setAuth(userData, {
                access: tokenData.access,
                refresh: tokenData.refresh,
              })
              router.push('/dashboard')
            },
            onError: (loginError: any) => {
              const errorMessage = loginError.data?.errors
                ? Object.values(loginError.data.errors).join(', ')
                : 'Erro ao fazer login após registro'
              toast.error('Erro ao fazer login após registro', {
                description: errorMessage,
              })
            },
          }
        )
      },
      onError: (error: any) => {
        const errorMessage = error.data?.errors
          ? Object.values(error.data.errors).join(', ')
          : 'Erro ao criar usuário'
        toast.error('Erro ao criar usuário', {
          description: errorMessage,
        })
      },
    },
  })

  const onSubmit = (data: SignUpSchemaType) => {
    register({
      data: {
        email: data.email,
        password: data.password,
        works_since: data.member_since,
      },
    })
  }

  return (
    <Form {...form}>
      <BaseForm onSubmit={form.handleSubmit(onSubmit)}>
        <BaseInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email"
        />
        <BaseInput
          control={form.control}
          name="password"
          label="Senha"
          placeholder="Senha"
          type="password"
        />
        <BaseDatePicker
          control={form.control}
          name="member_since"
          label="Data de Admissão"
          placeholder="Data de Admissão"
        />
        <BaseButton
          type="submit"
          isLoading={isRegisterPending || isLoginPending}
          loadingText="Criando conta..."
        >
          Criar conta
        </BaseButton>
      </BaseForm>
    </Form>
  )
}
