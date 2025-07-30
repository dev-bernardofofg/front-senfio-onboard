import {
  useGetBalance,
  useListCoupons,
  useListRedemptions,
  useListUsers,
  useRecentRedemptions,
} from "@/lib/generated/hooks";
import { useAuthorization } from "./use-authorization";

// Hook protegido para listar usuários (apenas staff)
export const useProtectedListUsers = () => {
  const { isStaff, isAuthenticated } = useAuthorization();

  return useListUsers(undefined, {
    query: {
      enabled: isAuthenticated && isStaff,
    },
  });
};

// Hook protegido para listar cupons (todos podem ver)
export const useProtectedListCoupons = () => {
  const { isAuthenticated } = useAuthorization();

  return useListCoupons(undefined, {
    query: {
      enabled: isAuthenticated,
    },
  });
};

// Hook protegido para listar resgates (apenas staff pode ver todos)
export const useProtectedListRedemptions = () => {
  const { isStaff, isAuthenticated } = useAuthorization();

  return useListRedemptions(undefined, {
    query: {
      enabled: isAuthenticated && isStaff,
    },
  });
};

// Hook protegido para buscar saldo (todos podem ver)
export const useProtectedGetBalance = () => {
  const { isAuthenticated } = useAuthorization();

  return useGetBalance({
    query: {
      enabled: isAuthenticated,
    },
  });
};

// Hook protegido para resgates recentes (apenas staff pode ver todos)
export const useProtectedRecentRedemptions = () => {
  const { isStaff, isAuthenticated } = useAuthorization();

  return useRecentRedemptions({
    query: {
      enabled: isAuthenticated && isStaff,
    },
  });
};

// Hook para resgates do usuário atual (apenas não-staff)
export const useUserRedemptions = () => {
  const { isNonStaff, isAuthenticated } = useAuthorization();

  return useListRedemptions(undefined, {
    query: {
      enabled: isAuthenticated && isNonStaff,
    },
  });
};
