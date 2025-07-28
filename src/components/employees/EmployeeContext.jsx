import { useState } from "react";
import { searchEmployeeByEmail } from "../../api/employeeApi";
import { EmployeeContext } from "./employee-context";

export function EmployeeProvider({ children }) {
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchEmployee = async (email) => {
    setSearchResult(null);
    setError(null);
    if (!email) return;
    try {
      setLoading(true);
      const data = await searchEmployeeByEmail(email);
      setSearchResult(data);
    } catch (err) {
      setError(err.response.data.error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ searchResult, loading, error, searchEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
