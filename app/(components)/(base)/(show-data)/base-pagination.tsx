"use client"

import { BaseButton } from "@/app/(components)/(base)/(clickable)/base-button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export interface PaginationData {
  count: number
  current_page: number
  next_page: number | null
  page_size: number
  previous_page: number | null
  total_pages: number
}

interface BasePaginationProps {
  data: PaginationData
  onPageChange?: (page: number) => void
  className?: string
  showInfo?: boolean
}

export const BasePagination = ({
  data,
  onPageChange,
  className = "",
  showInfo = true
}: BasePaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    count,
    current_page,
    next_page,
    page_size,
    previous_page,
    total_pages
  } = data

  const handlePageChange = (page: number) => {
    // Validar se a página é válida antes de navegar
    if (page < 1 || page > total_pages) {
      return
    }

    if (onPageChange) {
      onPageChange(page)
    } else {
      // Atualiza a URL com o novo parâmetro de página
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())
      router.push(`?${params.toString()}`)
    }
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (total_pages <= maxVisible) {
      // Se tem poucas páginas, mostra todas
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i)
      }
    } else {
      // Lógica para mostrar páginas com ellipsis
      if (current_page <= 3) {
        // Páginas iniciais
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(total_pages)
      } else if (current_page >= total_pages - 2) {
        // Páginas finais
        pages.push(1)
        pages.push('...')
        for (let i = total_pages - 3; i <= total_pages; i++) {
          pages.push(i)
        }
      } else {
        // Página no meio
        pages.push(1)
        pages.push('...')
        for (let i = current_page - 1; i <= current_page + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(total_pages)
      }
    }

    return pages
  }

  const startItem = (current_page - 1) * page_size + 1
  const endItem = Math.min(current_page * page_size, count)

  return (
    <div className={`flex flex-col items-center justify-between gap-4 ${className}`}>
      {/* Informações da paginação */}
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          Mostrando {startItem} a {endItem} de {count} resultados
        </div>
      )}

      {/* Controles de paginação */}
      <div className="flex items-center gap-2">
        {/* Botão Anterior */}
        <BaseButton
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(previous_page!)}
          disabled={!previous_page}
          className="flex items-center gap-1 max-w-28 w-fit"
        >
          <ChevronLeft className="size-4 m-0" />
          <span className="base:hidden md:block">Anterior</span>
        </BaseButton>

        {/* Números das páginas */}
        <div className="flex items-center gap-1">
          {generatePageNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <div className="flex items-center justify-center size-8">
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </div>
              ) : (
                <BaseButton
                  variant={current_page === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  className="size-8 p-0"
                >
                  {page}
                </BaseButton>
              )}
            </div>
          ))}
        </div>

        {/* Botão Próximo */}
        <BaseButton
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(next_page!)}
          disabled={!next_page}
          className="flex items-center gap-1 max-w-28 w-fit"
        >
          <span className="base:hidden md:block">Próximo</span>
          <ChevronRight className="size-4" />
        </BaseButton>
      </div>
    </div>
  )
} 