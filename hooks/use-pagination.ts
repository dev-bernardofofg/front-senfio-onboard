import { PaginationData } from "@/app/(components)/(base)/(show-data)/base-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");

  const updatePage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const updatePageSize = useCallback(
    (size: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page_size", size.toString());
      params.set("page", "1"); // Volta para primeira página
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const getPaginationParams = useCallback(() => {
    return {
      page: currentPage,
      page_size: pageSize,
    };
  }, [currentPage, pageSize]);

  const createPaginationData = useCallback(
    (apiResponse: any): PaginationData => {
      return {
        count: apiResponse?.count || 0,
        current_page: apiResponse?.current_page || 1,
        next_page: apiResponse?.next_page || null,
        page_size: apiResponse?.page_size || 10,
        previous_page: apiResponse?.previous_page || null,
        total_pages: apiResponse?.total_pages || 1,
      };
    },
    []
  );

  return {
    currentPage,
    pageSize,
    updatePage,
    updatePageSize,
    getPaginationParams,
    createPaginationData,
  };
};
