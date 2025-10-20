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

  // Keep session cache updated
  useEffect(() => {
    if (employeeList) {
      sessionStorage.setItem("employeeList", JSON.stringify(employeeList));
    }
  }, [employeeList]);

  const searchEmployeeEmailOrname = async (key) => {
    if (!key) return;
    setEmployeeList(null);
    try {
      setLoading(true);
      const data = await searchEmployeeByEmailOrName(key);
      setEmployeeList(data);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error?.message || "Failed to load employees"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    // Check cache first
    const cached = sessionStorage.getItem("employeeList");
    if (cached) {
      setEmployeeList(JSON.parse(cached));
      return;
    }

    setEmployeeList(null);
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployeeList(data);
      sessionStorage.setItem("employeeList", JSON.stringify(data));
    } catch (err) {
      console.log(err);
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
        setEmployeeList,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
