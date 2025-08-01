import { buildSearchString } from '@/app/(resources)/(helpers)/search'
import { useListCoupons } from '@/lib/generated/hooks/useListCoupons'

interface UseCouponsParams {
  page?: number
  page_size?: number
  search?: string
  ordering?: string
}

export const useCoupons = ({
  page = 1,
  page_size = 10,
  search,
  ordering,
}: UseCouponsParams = {}) => {
  // Construir string de busca
  const searchString = buildSearchString({ search })

  const { data: couponsData, isLoading: isLoadingCoupons } = useListCoupons(
    {
      page,
      page_size,
      search: searchString, // Termo de busca simples
      ordering, // Ordenação
    },
    {
      query: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0, // Sempre considerar dados como stale para forçar refetch
      },
    }
  )

  const coupons = couponsData?.data?.results || []

  return {
    coupons,
    isLoading: isLoadingCoupons,
    totalCount: couponsData?.data?.count || 0,
    pagination: couponsData?.data,
  }
}
