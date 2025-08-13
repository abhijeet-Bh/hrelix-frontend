import { useState } from "react";
import { LeaveContext } from "./leaves-context";
import { getLeaves } from "../../../api/leavesApi";

export function LeaveProvider({ children }) {
  const [leaves, setLeaves] = useState([]);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaves = async (page) => {
    setError(null);
    const upadatedPage = page - 1;
    try {
      setLoading(true);
      const data = await getLeaves(upadatedPage);
      console.log(data.data);
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
      setError(err.response.data.error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeaveContext.Provider
      value={{ leaves, loading, error, pagination, fetchLeaves }}
    >
      {children}
    </LeaveContext.Provider>
  );
}
