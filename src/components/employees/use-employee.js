import { useContext } from "react";
import { EmployeeContext } from "./employee-context";

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within a EmployeeProvider");
  }
  return context;
}
