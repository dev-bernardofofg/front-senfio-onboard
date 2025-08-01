import { useQueryState } from 'nuqs'
import { useCallback } from 'react'

interface UseUrlFiltersOptions<T> {
  defaultValues: T
  paramName: string
}

export function useUrlFilters<T extends Record<string, any>>({
  defaultValues,
  paramName,
}: UseUrlFiltersOptions<T>) {
  const [filters, setFilters] = useQueryState(paramName, {
    defaultValue: defaultValues,
    parse: (value: string) => {
      try {
        return JSON.parse(decodeURIComponent(value))
      } catch {
        return defaultValues
      }
    },
    serialize: (value: T) => encodeURIComponent(JSON.stringify(value)),
    shallow: true,
    clearOnDefault: false,
  })

  const updateFilters = useCallback(
    (newFilters: T) => {
      // Se os novos filtros são iguais aos valores padrão, limpar a URL
      const isDefault = Object.keys(defaultValues).every(key => {
        const defaultValue = defaultValues[key as keyof T]
        const newValue = newFilters[key as keyof T]

        // Tratar strings vazias como equivalentes
        if (typeof defaultValue === 'string' && typeof newValue === 'string') {
          return (
            defaultValue === newValue ||
            (defaultValue === '' && newValue === '')
          )
        }

        return defaultValue === newValue
      })

      if (isDefault) {
        setFilters(null) // Isso remove o parâmetro da URL
      } else {
        setFilters(newFilters)
      }
    },
    [setFilters, defaultValues]
  )

  return {
    filters: filters || defaultValues,
    updateFilters,
  }
}
