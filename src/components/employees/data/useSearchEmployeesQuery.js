import { useQuery } from "@tanstack/react-query";
import { searchEmployeeByEmailOrName } from "../../../api/employeeApi";

export function useSearchEmployeesQuery(key) {
  return useQuery({
    queryKey: ["employees", "search", key],
    queryFn: () => searchEmployeeByEmailOrName(key),
    enabled: !!key,
  });
}
