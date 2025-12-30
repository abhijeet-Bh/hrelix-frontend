import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../api/employeeApi";

export function useEmployeesQuery(enabled = true) {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
    enabled,
  });
}
