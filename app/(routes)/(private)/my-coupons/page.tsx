'use client'

import { BaseFilters } from '@/app/(components)/(base)/(form)/base-filters'
import { BaseEmptyData } from '@/app/(components)/(base)/(show-data)/base-empty-data'
import { BaseLoadingCards } from '@/app/(components)/(base)/(show-data)/base-loading-cards'
import { BasePagination } from '@/app/(components)/(base)/(show-data)/base-pagination'
import { CupomCard } from '@/app/(components)/(card)/cupom-card'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import {
  RedemptionFiltersDefaultValues,
  RedemptionFiltersSchema,
  RedemptionFiltersType,
} from '@/app/(resources)/(schemas)/filters.schema'
import { usePagination } from '@/hooks/use-pagination'
import { useRedemptions } from '@/hooks/use-redemptions'
import { Tickets } from 'lucide-react'
import { Suspense, useEffect, useMemo } from 'react'

function MyCouponsPageContent() {
  const {
    currentPage,
    filters,
    handlePageChange,
    handleFiltersChange,
    handleResetPage,
    validatePage,
    getPaginationData,
    pageSize,
  } = usePagination<RedemptionFiltersType>({
    defaultValues: RedemptionFiltersDefaultValues,
    pageSize: 10,
  })

  const {
    redemptions,
    isLoading: isLoadingRedemptions,
    totalCount,
  } = useRedemptions({
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
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedCoupons = uniqueCoupons.slice(startIndex, endIndex)
  const totalPages = Math.ceil(uniqueCoupons.length / pageSize)

  // Validar página quando os dados carregam
  useEffect(() => {
    if (!isLoadingRedemptions) {
      validatePage(totalPages)
    }
  }, [currentPage, totalPages, isLoadingRedemptions, validatePage])

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
          />,
        ]}
      />
      <StaggeredFade className="w-full p-3 space-y-3">
        {isLoadingRedemptions && (
          <div className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BaseLoadingCards key={index} />
            ))}
          </div>
        )}

        {uniqueCoupons.length > 0 && !isLoadingRedemptions && (
          <StaggeredFade
            className="grid gap-4 base:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            variant="contentWithPagination"
          >
            {paginatedCoupons.map(redemption => (
              <CupomCard
                key={redemption.coupon.id}
                coupon={redemption.coupon}
                redemptions={redemptions}
              />
            ))}
          </StaggeredFade>
        )}

        {/* Estado vazio apenas quando há busca sem resultados ou erro na paginação */}
        {uniqueCoupons.length === 0 &&
          !isLoadingRedemptions &&
          (filters.search || totalCount === 0) && (
            <BaseEmptyData
              Icon={Tickets}
              title="Nenhum resgate encontrado"
              onClick={handleResetPage}
            />
          )}

        {/* Paginação */}
        {uniqueCoupons.length > pageSize && !isLoadingRedemptions && (
          <BasePagination
            data={getPaginationData(uniqueCoupons.length)}
            onPageChange={handlePageChange}
            className="justify-center"
          />
        )}
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default function MyCouponsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <MyCouponsPageContent />
    </Suspense>
  )
}
