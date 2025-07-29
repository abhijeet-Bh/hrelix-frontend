import { useState } from "react";
import {
  getAllEmployees,
  searchEmployeeByEmailOrName,
} from "../../api/employeeApi";
import { EmployeeContext } from "./employee-context";

export function EmployeeProvider({ children }) {
  const [employeeList, setEmployeeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // search employee by email or name
  const searchEmployeeEmailOrname = async (key) => {
    if (!key) return;
    setEmployeeList(null);
    try {
      setLoading(true);
      const data = await searchEmployeeByEmailOrName(key);
      setEmployeeList(data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // get all employee
  const fetchAllEmployees = async () => {
    setEmployeeList(null);
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployeeList(data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error.message || "Failed to load dashboard");
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
