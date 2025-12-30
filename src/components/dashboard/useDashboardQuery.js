import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../../api/dashboardApi";

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    enabled: true,
  });
}
