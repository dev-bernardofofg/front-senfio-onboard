'use client'

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { useAuth } from '@/app/(contexts)/auth.context'
import { Form } from '@/components/ui/form'
import { Login200, useLogin } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SignInDefaultValues, SignInSchema, SignInSchemaType } from './sign-in.schema'

export const SignInForm = () => {
  const router = useRouter()
  const { setAuth, setTokensOnly } = useAuth()

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInDefaultValues,
  })

  const { mutateAsync: login, isPending: isLoginPending } = useLogin({
    mutation: {
      onSuccess: ({ data: tokenData }: { data: Login200 }) => {
        setTokensOnly({
          access: tokenData.access,
          refresh: tokenData.refresh,
        })
        router.push('/dashboard')
      },
      onError: (error: any) => {
        toast.error(error.data.message)
      },
    }
  })

  const onSubmit = (data: SignInSchemaType) => {
    login({
      data: {
        email: data.email,
        password: data.password,
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
          type="email"
        />
        <BaseInput
          control={form.control}
          name="password"
          label="Senha"
          placeholder="Senha"
          type="password"
        />
        <BaseButton
          type="submit"
          isLoading={isLoginPending}
          disabled={isLoginPending}
        >
          Entrar
        </BaseButton>
      </BaseForm>
    </Form>
  );
}
