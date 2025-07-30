"use client"

import { BaseFilters } from '@/app/(components)/(base)/(form)/base-filters'
import { BaseEmptyData } from '@/app/(components)/(base)/(show-data)/base-empty-data'
import { BaseLoadingCards } from '@/app/(components)/(base)/(show-data)/base-loading-cards'
import { BasePagination } from '@/app/(components)/(base)/(show-data)/base-pagination'
import { CupomCard } from '@/app/(components)/(card)/cupom-card'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { RedemptionFiltersDefaultValues, RedemptionFiltersSchema, RedemptionFiltersType } from '@/app/(resources)/(schemas)/filters.schema'
import { useRedemptions } from '@/hooks/use-redemptions'
import { useUrlFilters } from '@/hooks/use-url-filters'
import { Tickets } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'

const MyCouponsPage = () => {
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => parseInt(value) || 1,
    serialize: (value) => value.toString(),
    shallow: true,
    clearOnDefault: false,
  })

  const itemsPerPage = 10
  const { filters, updateFilters } = useUrlFilters<RedemptionFiltersType>({
    defaultValues: RedemptionFiltersDefaultValues,
    paramName: 'redemptionFilters'
  })

  const { redemptions, isLoading: isLoadingRedemptions, totalCount } = useRedemptions({
    totalCount: 1000,
    search: filters.search || undefined,
  })

  // Obter cupons únicos dos redemptions
  const uniqueCoupons = useMemo(() => {
    const seen = new Set()
    return redemptions.filter(redemption => {
      const key = redemption.coupon.id
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }, [redemptions])

  // Paginação client-side
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCoupons = uniqueCoupons.slice(startIndex, endIndex)
  const totalPages = Math.ceil(uniqueCoupons.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFiltersChange = (newFilters: RedemptionFiltersType) => {
    updateFilters(newFilters)
    setCurrentPage(1) // Reset para primeira página quando filtrar
  }

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header
        title="Meus Resgates"
        actions={[
          <BaseFilters
            key="filters"
            schema={RedemptionFiltersSchema}
            defaultValues={filters}
            onFiltersChange={handleFiltersChange}
          />
        ]}
      />
      <StaggeredFade className="w-full p-3 space-y-3">
        {isLoadingRedemptions && (
          <StaggeredFade variant="slide-up">
            <BaseLoadingCards />
          </StaggeredFade>
        )}

        {uniqueCoupons.length > 0 && !isLoadingRedemptions && (
          <StaggeredFade className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" variant="contentWithPagination">
            {paginatedCoupons.map((redemption) => (
              <CupomCard
                key={redemption.coupon.id}
                coupon={redemption.coupon}
                redemptions={redemptions}
              />
            ))}
          </StaggeredFade>
        )}

        {uniqueCoupons.length === 0 && !isLoadingRedemptions && (
          <BaseEmptyData
            Icon={Tickets}
            title={filters.search ? "Nenhum resgate encontrado" : "Nenhum resgate disponível"}
          />
        )}

        {/* Paginação */}
        {uniqueCoupons.length > itemsPerPage && !isLoadingRedemptions && (
          <BasePagination
            data={{
              count: uniqueCoupons.length,
              total_pages: totalPages,
              page_size: itemsPerPage,
              current_page: currentPage,
              next_page: currentPage < totalPages ? currentPage + 1 : null,
              previous_page: currentPage > 1 ? currentPage - 1 : null
            }}
            onPageChange={handlePageChange}
            className="justify-center"
          />
        )}
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default MyCouponsPage