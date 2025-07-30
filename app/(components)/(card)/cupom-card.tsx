import { NonStaffOnly, StaffOnly } from '@/app/(components)/(base)/(authorization)/authorized-content'
import { FN_UTILS_DATE } from '@/app/(resources)/(helpers)/date'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coupon, listCouponsQueryKey, listRedemptionsQueryKey, Redemption, useCreateRedemption, useDeleteCoupon } from '@/lib/generated'
import { useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface CupomCardProps {
  coupon: Coupon
  redemptions?: Redemption[]
}

export const CupomCard = ({ coupon, redemptions = [] }: CupomCardProps) => {
  const queryClient = useQueryClient()

  const isAvailable = coupon.available

  // Verificar se o usuário já atingiu o limite máximo de resgates para este cupom
  const userRedemptionsForThisCoupon = redemptions.filter(
    redemption => redemption.coupon.id === coupon.id
  )

  const hasReachedMaxRedemptions = coupon.max_redemptions
    ? userRedemptionsForThisCoupon.length >= coupon.max_redemptions
    : false

  const canRedeem = isAvailable && !hasReachedMaxRedemptions

  const { mutate: deleteCoupon, isPending } = useDeleteCoupon({
    mutation: {
      onSuccess: () => {
        toast.success('Cupom deletado com sucesso')
        queryClient.invalidateQueries({
          queryKey: listCouponsQueryKey()
        })
      },
      onError: () => {
        toast.error('Erro ao deletar cupom')
      }
    }
  })

  const { mutate: redeemCoupon, isPending: isRedeeming } = useCreateRedemption({
    mutation: {
      onSuccess: () => {
        toast.success('Cupom resgatado com sucesso')

        queryClient.invalidateQueries({
          queryKey: listCouponsQueryKey()
        })
        queryClient.invalidateQueries({
          queryKey: listRedemptionsQueryKey({})
        })

      },
      onError: (error: any) => {
        toast.error(error.data.errors.non_field_errors[0])
      }
    }
  })

  return (
    <Card key={coupon.id} className='h-full'>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg truncate">
              {coupon.code}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1 line-clamp-2">
              {coupon.description}
            </CardDescription>
          </div>
          <Badge
            variant={canRedeem ? "default" : "secondary"}
            className="flex-shrink-0 text-xs"
          >
            {canRedeem ? "Disponível" : hasReachedMaxRedemptions ? "Limite Atingido" : "Indisponível"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Máximo de resgates:</span>
            <span className="font-medium">{coupon.max_redemptions || 'Ilimitado'}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Seus resgates:</span>
            <span className="font-medium">
              {userRedemptionsForThisCoupon.length} / {coupon.max_redemptions || '∞'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Criado em:</span>
            <span className="font-medium">
              {FN_UTILS_DATE.formatDate(coupon.created_at)}
            </span>
          </div>

          {/* Ações específicas por tipo de usuário */}
          <div className="flex gap-1.5 mt-3">
            <StaffOnly>
              <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                <Edit className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Editar</span>
              </Button>
              <Button size="sm" variant="destructive" className="text-xs h-7 px-2" onClick={() => deleteCoupon({ id: coupon.id })} disabled={isPending}>
                <Trash2 className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Excluir</span>
              </Button>
            </StaffOnly>

            <NonStaffOnly>
              <Button
                size="sm"
                variant="default"
                disabled={!canRedeem || isRedeeming}
                className="text-xs h-7 px-2"
                onClick={() => redeemCoupon({ data: { coupon: coupon.id } })}
              >
                {isRedeeming ? 'Resgatando...' : hasReachedMaxRedemptions ? 'Limite Atingido' : 'Resgatar'}
              </Button>
            </NonStaffOnly>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
