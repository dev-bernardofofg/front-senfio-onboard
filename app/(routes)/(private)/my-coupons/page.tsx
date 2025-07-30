"use client"

import { BaseEmptyData } from "@/app/(components)/(base)/(show-data)/base-empty-data"
import { CupomCard } from "@/app/(components)/(card)/cupom-card"
import { Header } from "@/app/(components)/(layout)/header"
import { StaggeredFade } from "@/app/(components)/(motion)/staggered-fade"
import { useRecentRedemptions } from "@/lib/generated/hooks/useRecentRedemptions"
import { Tickets } from "lucide-react"
import { useMemo } from "react"

const MyCouponsPage = () => {
  const { data: recentRedemptionsData } = useRecentRedemptions()

  const uniqueCoupons = useMemo(() => {
    const redemptions = recentRedemptionsData?.data || []
    const seenCouponIds = new Set()

    return redemptions.filter((redemption) => {
      const couponId = redemption.coupon.id
      if (seenCouponIds.has(couponId)) {
        return false
      }
      seenCouponIds.add(couponId)
      return true
    })
  }, [recentRedemptionsData?.data])

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header title="Meus Resgates" />
      <StaggeredFade className="w-full p-3 space-y-3">
        <StaggeredFade className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto max-h-[calc(100vh-8rem)] p-2">
          {uniqueCoupons.map((redemption) => (
            <CupomCard
              key={redemption.id}
              coupon={redemption.coupon}
              recentRedemptions={recentRedemptionsData?.data || []}
            />
          ))}
        </StaggeredFade>

        {uniqueCoupons.length === 0 && (
          <BaseEmptyData Icon={Tickets} title="Nenhum cupom encontrado" />
        )}
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default MyCouponsPage