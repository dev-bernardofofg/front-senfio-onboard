import { useListUsers } from "@/lib/generated/hooks/useListUsers";

interface UseUsersParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export const useUsers = ({
  page = 1,
  page_size = 25,
  search,
  ordering,
}: UseUsersParams = {}) => {
  const { data: usersData, isLoading: isLoadingUsers } = useListUsers(
    {
      page,
      page_size,
      search, // Termo de busca (email, team)
      ordering, // Ordenação
    },
    {
      query: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0, // Sempre considerar dados como stale para forçar refetch
      },
    }
  );

  const users = usersData?.data?.results || [];

  return {
    users,
    isLoading: isLoadingUsers,
    totalCount: usersData?.data?.count || 0,
    pagination: usersData?.data,
  };
};
