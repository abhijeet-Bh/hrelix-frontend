import { useState, useEffect } from "react";
import {
  getAllEmployees,
  searchEmployeeByEmailOrName,
} from "../../api/employeeApi";
import { EmployeeContext } from "./employee-context";

export function EmployeeProvider({ children }) {
  const [employeeList, setEmployeeList] = useState(() => {
    const cached = sessionStorage.getItem("employeeList");
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // keep cache updated whenever list changes
  useEffect(() => {
    if (employeeList) {
      sessionStorage.setItem("employeeList", JSON.stringify(employeeList));
    }
  }, [employeeList]);

  // 🧹 Hard-refresh fetch from backend (ignore cache)
  const refreshAllEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEmployees();
      setEmployeeList(data);
      sessionStorage.setItem("employeeList", JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error?.message || "Failed to refresh employees"
      );
    } finally {
      setLoading(false);
    }
  };

  // normal fetch — uses cache if available
  const fetchAllEmployees = async () => {
    const cached = sessionStorage.getItem("employeeList");
    if (cached) {
      setEmployeeList(JSON.parse(cached));
      return;
    }
    await refreshAllEmployees();
  };

  // search (always fetches new data)
  const searchEmployeeEmailOrname = async (key) => {
    if (!key) return;
    setEmployeeList(null);
    try {
      setLoading(true);
      setError(null);
      const data = await searchEmployeeByEmailOrName(key);
      setEmployeeList(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error?.message || "Failed to load employees"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employeeList,
        loading,
        error,
        searchEmployeeEmailOrname,
        fetchAllEmployees,
        refreshAllEmployees,
        setEmployeeList,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
