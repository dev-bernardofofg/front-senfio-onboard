import { useQueryState } from "nuqs";
import { useCallback } from "react";

interface UseUrlFiltersOptions<T> {
  defaultValues: T;
  paramName: string;
}

export function useUrlFilters<T extends Record<string, any>>({
  defaultValues,
  paramName,
}: UseUrlFiltersOptions<T>) {
  const [filters, setFilters] = useQueryState(paramName, {
    defaultValue: defaultValues,
    parse: (value: string) => {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return defaultValues;
      }
    },
    serialize: (value: T) => encodeURIComponent(JSON.stringify(value)),
    // Usar shallow para evitar problemas de hidratação
    shallow: true,
    clearOnDefault: false,
  });

  const updateFilters = useCallback(
    (newFilters: T) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  return {
    filters: filters || defaultValues,
    updateFilters,
  };
}
