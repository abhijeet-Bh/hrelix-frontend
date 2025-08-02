import { useState } from "react";
import ErrorScreen from "../ErrorScreen";
import LoadingScreen from "../LoadingScreen";
import EmployeeList from "./EmployeeList";
import NoResult from "./NoResult";
import { useEmployee } from "./use-employee";
import AddEmployeeModal from "./AddEmployeeModal";
import { addToast } from "@heroui/react";

export default function EmployeesContent() {
  const [showModal, setShowModal] = useState(false);

  const {
    employeeList,
    loading,
    error,
    searchEmployeeEmailOrname,
    fetchAllEmployees,
    setEmployeeList,
  } = useEmployee();

  async function searchEmp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const key = formData.get("key");
    await searchEmployeeEmailOrname(key);
    e.target.reset();
  }

  const handleAddEmployee = (newEmployee) => {
    setEmployeeList([newEmployee]); // or refetchAllEmployees()
  };

  const showToast = (success, description, color) => {
    addToast({
      title: success ? "Success!" : "Failed!",
      description: description,
      variant: "solid",
      color: color,
    });
  };

  return (
    <div className="flex flex-col pb-8 px-2 ">
      <div className="sticky top-0 z-10 bg-[#f5f3ff] pt-8">
        <div className="flex flex-row justify-between items-center">
          <p className="text-primaryDark font-bold text-2xl">
            Employees Management
          </p>
          <div
            className="mr-4 cursor-pointer hover:bg-primaryDark/70 flex flex-row items-center justify-between gap-2 bg-primaryDark py-2 px-5 rounded-lg drop-shadow-button"
            onClick={() => setShowModal(true)}
          >
            <img src="icons/add-emp-icon.svg" alt="" />
            <p className="text-accent text-sm font-semibold">Add Employee</p>
          </div>
        </div>
        <div className="my-5 w-full bg-white/50 border-white border-1 p-3 rounded-xl">
          <form
            onSubmit={searchEmp}
            className="flex flex-row justify-between items-center"
          >
            <input
              type="text"
              name="key"
              className="rounded-lg w-full px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50 text-primaryDark placeholder:text-primaryLight"
              placeholder="Enter employee Email or Name to search..."
            />
            <button
              className="px-6 text-sm text-primaryDark font-semibold py-2 rounded-md ml-4 drop-shadow-button cursor-pointer bg-accent"
              type="submit"
            >
              Search
            </button>
            <button
              className="px-2 w-[200px] text-sm text-white font-semibold py-2 rounded-md ml-4 drop-shadow-button cursor-pointer bg-pinkAccent"
              onClick={fetchAllEmployees}
            >
              All Employees
            </button>
          </form>
        </div>
      </div>
      <SearchResultSection
        loading={loading}
        error={error}
        employeeList={employeeList}
        fetchAllEmployees={fetchAllEmployees}
        showToast={showToast}
      />

      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onEmployeeAdded={handleAddEmployee}
        />
      )}
    </div>
  );
}

export function SearchResultSection({
  loading,
  error,
  employeeList,
  fetchAllEmployees,
  showToast,
}) {
  if (loading)
    return (
      <div className="w-full min-h-[600px] bg-white/50 border-white border-1 p-5 rounded-xl flex flex-col justify-center">
        <LoadingScreen />
      </div>
    );
  if (error)
    return (
      <div className="w-full min-h-[600px] bg-white/50 border-white border-1 p-5 rounded-xl flex flex-col justify-center">
        <ErrorScreen error={error} />
      </div>
    );
  if (!employeeList || employeeList.length < 1)
    return (
      <div className="w-full min-h-[600px] bg-white/50 border-white border-1 p-5 rounded-xl flex flex-col justify-center">
        <NoResult />
      </div>
    );

  return (
    <EmployeeList
      employeeList={employeeList}
      reFresh={fetchAllEmployees}
      showToast={showToast}
    />
  );
}
