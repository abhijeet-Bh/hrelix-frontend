import { useEffect, useState } from "react";
import { LeaveContext } from "./leaves-context";
import { changeStatus, getLeaves } from "../../../api/leavesApi";
import { addToast } from "@heroui/react";

export function LeaveProvider({ children }) {
  const [leaves, setLeaves] = useState(() => {
    const cached = sessionStorage.getItem("leavesData");
    return cached ? JSON.parse(cached) : [];
  });

  const [pagination, setPagination] = useState(() => {
    const cached = sessionStorage.getItem("leavesPagination");
    return cached
      ? JSON.parse(cached)
      : { totalPage: 0, currentPage: 0, isLast: false, totalResults: 0 };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch leaves (with optional cache)
  const fetchLeaves = async (page, forceRefresh = false) => {
    setError(null);
    const updatedPage = page - 1;

    // check cache if not forcing refresh
    if (!forceRefresh) {
      const cachedLeaves = sessionStorage.getItem("leavesData");
      const cachedPagination = sessionStorage.getItem("leavesPagination");
      if (cachedLeaves && cachedPagination) {
        setLeaves(JSON.parse(cachedLeaves));
        setPagination(JSON.parse(cachedPagination));
        return;
      }
    }

    try {
      setLoading(true);
      const data = await getLeaves(updatedPage);

      if (data.success) {
        const paginationData = {
          currentPage: data.data.pageable.pageNumber,
          totalPage: data.data.totalPages,
          isLast: data.data.last,
          totalResults: data.data.totalElements,
        };

        setPagination(paginationData);
        setLeaves(data.data.content);

        // store in session
        sessionStorage.setItem("leavesData", JSON.stringify(data.data.content));
        sessionStorage.setItem(
          "leavesPagination",
          JSON.stringify(paginationData)
        );
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error?.message || "Failed to fetch leaves!");
    } finally {
      setLoading(false);
    }
  };

  // update leave status
  const updateStatus = async (id, statusData, pageNo) => {
    setError(null);
    setLoading(true);
    try {
      const response = await changeStatus(id, statusData);
      if (response.success) {
        // force refresh to get fresh data
        await fetchLeaves(pageNo, true);
      } else {
        addToast({
          title: response.message,
          description: response.error?.message,
          variant: "solid",
          color: "danger",
        });
      }
    } catch (err) {
      addToast({
        title: "Failed!",
        description: err.message || "Error updating leave status",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // keep session cache updated
  useEffect(() => {
    if (leaves?.length) {
      sessionStorage.setItem("leavesData", JSON.stringify(leaves));
      sessionStorage.setItem("leavesPagination", JSON.stringify(pagination));
    }
  }, [leaves, pagination]);

  return (
    <LeaveContext.Provider
      value={{
        leaves,
        loading,
        error,
        pagination,
        fetchLeaves,
        updateStatus,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
