import { buildSearchString } from "@/app/(resources)/(helpers)/search";
import { useListRedemptions } from "@/lib/generated";

interface UseRedemptionsParams {
  totalCount?: number;
  search?: string;
  ordering?: string;
}

export const useRedemptions = ({
  totalCount,
  search,
  ordering,
}: UseRedemptionsParams = {}) => {
  const searchString = buildSearchString({ search });

  const { data: redemptionsData, isLoading: isLoadingRedemptions } =
    useListRedemptions({
      page_size: totalCount || 1000,
      search: searchString,
      ordering,
    });

  const redemptions = redemptionsData?.data?.results || [];

  return {
    redemptions,
    isLoading: isLoadingRedemptions,
    totalCount: redemptionsData?.data?.count || 0,
  };
};
