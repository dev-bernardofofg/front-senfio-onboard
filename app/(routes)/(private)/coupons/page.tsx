"use client"

import { BaseEmptyData } from '@/app/(components)/(base)/(show-data)/base-empty-data'
import { BaseLoadingCards } from '@/app/(components)/(base)/(show-data)/base-loading-cards'
import { BasePagination } from '@/app/(components)/(base)/(show-data)/base-pagination'
import { CupomCard } from '@/app/(components)/(card)/cupom-card'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { usePagination } from '@/hooks/use-pagination'
import { useListCoupons } from '@/lib/generated/hooks/useListCoupons'
import { useRecentRedemptions } from '@/lib/generated/hooks/useRecentRedemptions'
import { Tickets } from 'lucide-react'

export default function CouponsPage() {
  const { getPaginationParams, createPaginationData, updatePage, currentPage } = usePagination()

  const { data, isLoading: isLoadingCoupons } = useListCoupons(getPaginationParams(), {
    query: {
      refetchOnWindowFocus: false,
    }
  })

  const { data: recentRedemptionsData, isLoading: isLoadingRecentRedemptions } = useRecentRedemptions()

  const coupons = data?.data?.results || []
  const recentRedemptions = recentRedemptionsData?.data || []

  const paginationData = createPaginationData(data?.data)

  const isLoading = isLoadingCoupons || isLoadingRecentRedemptions

  // Criar loading cards
  const loadingCards = Array.from({ length: 6 }).map((_, index) => (
    <BaseLoadingCards key={index} />
  ))

  // Criar cupom cards
  const couponCards = coupons.map((coupon) => (
    <CupomCard
      key={coupon.id}
      coupon={coupon}
      recentRedemptions={recentRedemptions}
    />
  ))

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header title="Cupons" />
      <StaggeredFade className="w-full p-3 space-y-3">
        <div className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto max-h-[calc(100vh-13rem)] p-2">
          <StaggeredFade
            key={`cards-page-${currentPage}-loading-${isLoading}`}
            variant="cards"
            isLoading={isLoading}
            loadingContent={loadingCards}
            staggerDelay={0.1}
          >
            {couponCards}
          </StaggeredFade>
        </div>

        <StaggeredFade variant="slide-up">
          {coupons.length === 0 && !isLoading && (
            <BaseEmptyData Icon={Tickets} title="Nenhum cupom encontrado" />
          )}
        </StaggeredFade>

        {/* Paginação */}
        <StaggeredFade variant="slide-up" initialDelay={0.2}>
          {coupons.length > 0 && !isLoading && (
            <BasePagination
              data={paginationData}
              onPageChange={updatePage}
              className="justify-center"
            />
          )}
        </StaggeredFade>
      </StaggeredFade>
    </StaggeredFade>
  )
} 