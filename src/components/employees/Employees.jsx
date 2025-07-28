import { EmployeeProvider } from "./EmployeeContext";
import EmployeesContent from "./EmployeesContent";

export default function Employees() {
  return (
    <EmployeeProvider>
      <EmployeesContent />
    </EmployeeProvider>
  );
}
