"use client"

import { BaseFilters } from '@/app/(components)/(base)/(form)/base-filters'
import { BaseEmptyData } from '@/app/(components)/(base)/(show-data)/base-empty-data'
import { BaseLoadingCards } from '@/app/(components)/(base)/(show-data)/base-loading-cards'
import { BasePagination } from '@/app/(components)/(base)/(show-data)/base-pagination'
import { CupomCard } from '@/app/(components)/(card)/cupom-card'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { CouponFiltersDefaultValues, CouponFiltersSchema, CouponFiltersType } from '@/app/(resources)/(schemas)/filters.schema'
import { useCoupons } from '@/hooks/use-coupons'
import { useRedemptions } from '@/hooks/use-redemptions'
import { useUrlFilters } from '@/hooks/use-url-filters'
import { Tickets } from 'lucide-react'
import { useQueryState } from 'nuqs'

export default function CouponsPage() {
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => parseInt(value) || 1,
    serialize: (value) => value.toString(),
    shallow: true,
    clearOnDefault: false,
  })

  const { filters, updateFilters } = useUrlFilters<CouponFiltersType>({
    defaultValues: CouponFiltersDefaultValues,
    paramName: 'couponFilters'
  })

  const { coupons, isLoading: isLoadingCoupons, totalCount, pagination } = useCoupons({
    page: currentPage,
    page_size: 25,
    search: filters.search || undefined,
    ordering: filters.ordering,
  })

  const { redemptions, isLoading: isLoadingRedemptions } = useRedemptions({
    totalCount: totalCount
  })

  const isLoading = isLoadingCoupons || isLoadingRedemptions

  // Criar loading cards
  const loadingCards = Array.from({ length: 6 }).map((_, index) => (
    <BaseLoadingCards key={index} />
  ))

  // Criar cupom cards
  const couponCards = coupons.map((coupon) => (
    <CupomCard
      key={coupon.id}
      coupon={coupon}
      redemptions={redemptions}
    />
  ))

  const handleFiltersChange = (newFilters: CouponFiltersType) => {
    updateFilters(newFilters)
    setCurrentPage(1) // Reset para primeira página quando filtrar
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header
        title="Cupons"
        actions={[
          <BaseFilters
            key="filters"
            schema={CouponFiltersSchema}
            defaultValues={filters}
            onFiltersChange={handleFiltersChange}
          />
        ]}
      />
      <StaggeredFade className="w-full p-3 space-y-3">
        <div className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto max-h-[calc(100vh-13rem)] p-2">
          <StaggeredFade
            key={`cards-page-${currentPage}-loading-${isLoading}-filters-${JSON.stringify(filters)}`}
            variant="cards"
            isLoading={isLoading}
            loadingContent={loadingCards}
            staggerDelay={0.1}
          >
            {couponCards}
          </StaggeredFade>
        </div>

        {coupons.length === 0 && !isLoading && (
          <StaggeredFade variant="slide-up">
            <BaseEmptyData
              Icon={Tickets}
              title={filters.search ? "Nenhum cupom encontrado" : "Nenhum cupom disponível"}
            />
          </StaggeredFade>
        )}

        {/* Paginação */}
        <StaggeredFade variant="slide-up" initialDelay={0.2}>
          {coupons.length > 0 && !isLoading && pagination && pagination.count > 25 && (
            <BasePagination
              data={{
                count: pagination.count || 0,
                total_pages: Math.ceil((pagination.count || 0) / 25),
                page_size: 25,
                current_page: currentPage,
                next_page: currentPage + 1,
                previous_page: currentPage - 1
              }}
              onPageChange={handlePageChange}
              className="justify-center"
            />
          )}
        </StaggeredFade>
      </StaggeredFade>
    </StaggeredFade>
  )
} 