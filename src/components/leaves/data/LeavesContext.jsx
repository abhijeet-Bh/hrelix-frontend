import { useState } from "react";
import { LeaveContext } from "./leaves-context";
import { changeStatus, getLeaves } from "../../../api/leavesApi";
import { addToast } from "@heroui/react";

export function LeaveProvider({ children }) {
  const [leaves, setLeaves] = useState([]);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch leaves
  const fetchLeaves = async (page) => {
    setError(null);
    const upadatedPage = page - 1;
    try {
      setLoading(true);
      const data = await getLeaves(upadatedPage);
      if (data.success) {
        setPagination({
          currentPage: data.data.pageable.pageNumber,
          totalPage: data.data.totalPages,
          isLast: data.data.last,
          totalResults: data.data.totalElements,
        });
        setLeaves(data.data.content);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message || "Failed to update leave!");
    } finally {
      setLoading(false);
    }
  };

  // update leaves
  const updateStatus = async (id, statusData, pageNo) => {
    setError(null);
    setLoading(true);
    try {
      const response = await changeStatus(id, statusData);
      if (response.success) {
        await fetchLeaves(pageNo);
      } else {
        addToast({
          title: response.message,
          description: response.error.message,
          // @ts-ignore
          variant: "solid",
          color: "danger",
        });
      }
    } catch (err) {
      addToast({
        title: "Failed!",
        description: err,
        // @ts-ignore
        variant: "solid",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeaveContext.Provider
      value={{ leaves, loading, error, pagination, fetchLeaves, updateStatus }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
