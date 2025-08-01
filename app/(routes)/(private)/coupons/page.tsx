"use client"

import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseFilters } from '@/app/(components)/(base)/(form)/base-filters'
import { BaseDialog } from '@/app/(components)/(base)/(portals)/base-dialog'
import { BaseEmptyData } from '@/app/(components)/(base)/(show-data)/base-empty-data'
import { BaseLoadingCards } from '@/app/(components)/(base)/(show-data)/base-loading-cards'
import { BasePagination } from '@/app/(components)/(base)/(show-data)/base-pagination'
import { CupomCard } from '@/app/(components)/(card)/cupom-card'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { UpsertCouponForm } from '@/app/(resources)/(forms)/(coupons)/upsert-coupom.form'
import { CouponFiltersDefaultValues, CouponFiltersSchema, CouponFiltersType } from '@/app/(resources)/(schemas)/filters.schema'
import { useCoupons } from '@/hooks/use-coupons'
import { usePagination } from '@/hooks/use-pagination'
import { useRedemptions } from '@/hooks/use-redemptions'
import { Tickets } from 'lucide-react'

export default function CouponsPage() {
  const {
    currentPage,
    filters,
    handlePageChange,
    handleFiltersChange,
    handleResetPage,
    validatePage,
    getPaginationData
  } = usePagination<CouponFiltersType>({
    defaultValues: CouponFiltersDefaultValues,
    pageSize: 10
  })

  const { coupons, isLoading: isLoadingCoupons, totalCount, pagination } = useCoupons({
    page: currentPage,
    page_size: 10,
    search: filters.search || undefined,
    ordering: filters.ordering,
  })

  const { redemptions, isLoading: isLoadingRedemptions } = useRedemptions({
    totalCount: totalCount
  })

  const isLoading = isLoadingCoupons || isLoadingRedemptions

  const loadingCards = Array.from({ length: 6 }).map((_, index) => (
    <BaseLoadingCards key={index} />
  ))

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
          />,
          <BaseDialog
            key="create-coupon"
            title="Criar Cupom"
            trigger={<BaseButton variant="outline" clickAction='create' >Criar Cupom</BaseButton>}
          >
            <UpsertCouponForm />
          </BaseDialog>
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
            {coupons.map((coupon) => (
              <CupomCard
                key={coupon.id}
                coupon={coupon}
                redemptions={redemptions}
              />
            ))}
          </StaggeredFade>
        </div>

        {coupons.length === 0 && !isLoading && (filters.search || !pagination) && (
          <StaggeredFade variant="slide-up">
            <BaseEmptyData
              Icon={Tickets}
              title={filters.search ? "Nenhum cupom encontrado" : "Erro ao carregar cupons"}
              onClick={handleResetPage}
            />
          </StaggeredFade>
        )}

        {pagination && pagination.count > 10 && (
          <BasePagination
            data={getPaginationData(pagination.count || 0)}
            onPageChange={handlePageChange}
            className="justify-center"
          />
        )}
      </StaggeredFade>
    </StaggeredFade>
  )
} 