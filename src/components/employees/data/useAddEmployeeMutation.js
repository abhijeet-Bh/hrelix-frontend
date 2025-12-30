import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEmployee) => newEmployee, // backend already done
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}
