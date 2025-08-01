'use client'

import { useCreateCoupon } from '@/lib/generated/hooks/useCreateCoupon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { DialogClose } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
  Coupon,
  listCouponsQueryKey,
  listRedemptionsQueryKey,
  useUpdateCoupon,
} from '@/lib/generated'
import { useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import {
  UpsertCouponFormData,
  upsertCouponSchema,
} from './upsert-coupom.schema'

interface UpsertCouponFormProps {
  coupon?: Coupon
}

export const UpsertCouponForm = ({ coupon }: UpsertCouponFormProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const queryClient = useQueryClient()

  const form = useForm<UpsertCouponFormData>({
    resolver: zodResolver(upsertCouponSchema),
    defaultValues: {
      code: coupon?.code ?? '',
      description: coupon?.description ?? '',
      max_redemptions: coupon?.max_redemptions ?? null,
      available: coupon?.available ?? true,
    },
  })

  const createCouponMutation = useCreateCoupon({
    mutation: {
      onSuccess: () => {
        toast.success('Cupom criado com sucesso!')
        queryClient.invalidateQueries({ queryKey: listCouponsQueryKey() })
        queryClient.invalidateQueries({ queryKey: listRedemptionsQueryKey() })
        closeRef.current?.click()
      },
      onError: error => {
        toast.error('Erro ao criar cupom. Tente novamente.')
      },
    },
  })

  const updateCouponMutation = useUpdateCoupon({
    mutation: {
      onSuccess: () => {
        toast.success('Cupom atualizado com sucesso!')
        queryClient.invalidateQueries({ queryKey: listCouponsQueryKey() })
        queryClient.invalidateQueries({ queryKey: listRedemptionsQueryKey() })
        closeRef.current?.click()
      },
      onError: error => {
        toast.error('Erro ao atualizar cupom. Tente novamente.')
      },
    },
  })

  const onSubmit = (data: UpsertCouponFormData) => {
    if (coupon) {
      updateCouponMutation.mutate({ data, id: coupon.id })
    } else {
      createCouponMutation.mutate({ data })
    }
  }

  return (
    <>
      <DialogClose ref={closeRef} className="hidden" />
      <Form {...form}>
        <BaseForm onSubmit={form.handleSubmit(onSubmit)}>
          <BaseInput
            control={form.control}
            name="code"
            label="Nome"
            placeholder="Digite o nome do cupom"
            description="Nome do cupom que será exibido para o usuário"
          />

          <BaseInput
            control={form.control}
            name="description"
            label="Descrição"
            placeholder="Digite a descrição do cupom"
            description="Descrição detalhada do cupom e suas condições"
          />

          <BaseInput
            control={form.control}
            name="max_redemptions"
            label="Número Máximo de Resgates"
            placeholder="0"
            type="number"
            description="Deixe em branco para resgates ilimitados"
          />

          <BaseButton
            type="submit"
            isLoading={
              createCouponMutation.isPending || updateCouponMutation.isPending
            }
            loadingText={coupon ? 'Salvando cupom...' : 'Criando cupom...'}
            clickAction={coupon ? 'edit' : 'create'}
          >
            {coupon ? 'Salvar Cupom' : 'Criar Cupom'}
          </BaseButton>
        </BaseForm>
      </Form>
    </>
  )
}
