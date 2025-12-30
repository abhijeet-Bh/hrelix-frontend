import { useQuery } from "@tanstack/react-query";
import { getLeaves } from "../../../api/leavesApi";

export function useLeavesQuery(page) {
  return useQuery({
    queryKey: ["leaves", page],
    queryFn: async () => {
      const res = await getLeaves(page - 1);

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch leaves");
      }

      return {
        leaves: res.data.content,
        pagination: {
          currentPage: res.data.pageable.pageNumber,
          totalPage: res.data.totalPages,
          isLast: res.data.last,
          totalResults: res.data.totalElements,
        },
      };
    },
    keepPreviousData: true, // 🔥 smooth pagination
  });
}
