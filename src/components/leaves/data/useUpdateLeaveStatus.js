import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../../../api/leavesApi";
import { addToast } from "@heroui/react";

export function useUpdateLeaveStatus(page) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, statusData }) => changeStatus(id, statusData),

    onSuccess: (res) => {
      if (!res.success) {
        throw new Error(res.message);
      }

      queryClient.invalidateQueries({
        queryKey: ["leaves", page],
      });
    },

    onError: (err) => {
      addToast({
        title: "Failed!",
        description: err.message || "Error updating leave status",
        variant: "solid",
        color: "danger",
      });
    },
  });
}
