import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuthorization } from "./use-authorization";

interface ProtectedQueryConfig<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "enabled"> {
  requireStaff?: boolean;
  requireNonStaff?: boolean;
  fallbackData?: TData;
}

export const useProtectedQuery = <TData, TError>(
  queryKey: any[],
  queryFn: () => Promise<TData>,
  config: ProtectedQueryConfig<TData, TError> = {}
) => {
  const { isStaff, isNonStaff, isAuthenticated } = useAuthorization();

  const {
    requireStaff = false,
    requireNonStaff = false,
    fallbackData,
    ...queryConfig
  } = config;

  // Verifica se a query deve ser executada
  const shouldExecute = () => {
    if (!isAuthenticated) return false;

    if (requireStaff && !isStaff) return false;
    if (requireNonStaff && !isNonStaff) return false;

    return true;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: shouldExecute(),
    ...queryConfig,
  });
};

// Hook específico para queries que requerem staff
export const useStaffQuery = <TData, TError>(
  queryKey: any[],
  queryFn: () => Promise<TData>,
  config: Omit<ProtectedQueryConfig<TData, TError>, "requireStaff"> = {}
) => {
  return useProtectedQuery(queryKey, queryFn, {
    ...config,
    requireStaff: true,
  });
};

// Hook específico para queries que requerem não-staff
export const useNonStaffQuery = <TData, TError>(
  queryKey: any[],
  queryFn: () => Promise<TData>,
  config: Omit<ProtectedQueryConfig<TData, TError>, "requireNonStaff"> = {}
) => {
  return useProtectedQuery(queryKey, queryFn, {
    ...config,
    requireNonStaff: true,
  });
};
