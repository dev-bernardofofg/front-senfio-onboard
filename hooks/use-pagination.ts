import { useQueryState } from 'nuqs'
import { useUrlFilters } from './use-url-filters'

interface UsePaginationParams<T> {
  defaultValues: T
  pageSize?: number
}

export const usePagination = <T extends Record<string, any>>({
  defaultValues,
  pageSize = 10,
}: UsePaginationParams<T>) => {
  const [currentPage, setCurrentPage] = useQueryState('page', {
    defaultValue: 1,
    parse: value => parseInt(value) || 1,
    serialize: value => value.toString(),
    shallow: true,
    clearOnDefault: false,
  })

  const { filters, updateFilters } = useUrlFilters<T>({
    defaultValues,
    paramName: 'filters',
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFiltersChange = (newFilters: T) => {
    updateFilters(newFilters)
    setCurrentPage(1) // Reset para primeira página quando filtrar
  }

  const handleResetPage = () => {
    // Limpar completamente a URL
    setCurrentPage(1)
    updateFilters(defaultValues)
  }

  const validatePage = (totalPages: number) => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    } else if (currentPage < 1) {
      setCurrentPage(1)
    }
  }

  const getPaginationData = (totalCount: number) => {
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      count: totalCount,
      total_pages: totalPages,
      page_size: pageSize,
      current_page: currentPage,
      next_page: currentPage < totalPages ? currentPage + 1 : null,
      previous_page: currentPage > 1 ? currentPage - 1 : null,
    }
  }

  return {
    currentPage,
    setCurrentPage,
    filters,
    updateFilters,
    handlePageChange,
    handleFiltersChange,
    handleResetPage,
    validatePage,
    getPaginationData,
    pageSize,
  }
}
