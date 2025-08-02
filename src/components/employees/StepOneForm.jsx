import { useState } from "react";
import { createEmployee } from "../../api/employeeApi";
import CustomInputField from "./CustomInputField";
import LoadingScreen from "../LoadingScreen";

export default function StepOneForm({ onNext, onClose, showToast }) {
  const [newEmployee, setNewEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdEmployee = await createEmployee(newEmployee);
      onNext(createdEmployee);
      showToast(
        true,
        `Employee: ${newEmployee.firstName} Created Successfully!`
      );
    } catch (err) {
      showToast(true, `Failed to create employee: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingScreen />
        </div>
      )}
      <form onSubmit={handleNext} className="flex flex-col gap-4 px-4 py-2">
        <button
          onClick={onClose}
          className="w-full text-red-500 text-sm flex flex-row justify-end"
        >
          <span className="py-2 px-4 bg-red-500/20 hover:bg-red-500/40 rounded-full">
            close
          </span>
        </button>
        <div className="flex flex-row gap-x-2">
          <CustomInputField
            label="First Name"
            value={newEmployee.firstName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
            placeholder="Enter employee's first name"
            editable={true}
          />
          <CustomInputField
            label="Last Name"
            value={newEmployee.lastName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
            placeholder="Enter employee's last name"
            editable={true}
          />
        </div>

        <CustomInputField
          label="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          placeholder="Enter employee's email"
          type="email"
          editable={true}
        />
        <div className="flex flex-row gap-x-2">
          <CustomInputField
            label="Phone Number"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            placeholder="Enter employee's phone number"
            editable={true}
          />
          <CustomInputField
            label="Salary"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: e.target.value })
            }
            placeholder="Enter employee's salary"
            type="number"
            editable={true}
          />
        </div>
        <div className="flex flex-row gap-x-2">
          <CustomInputField
            label="Password"
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
            }
            placeholder="Enter employee's temporary password"
            editable={true}
          />
          <CustomInputField
            label="Team"
            value={newEmployee.team}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, team: e.target.value })
            }
            placeholder="Enter employee's Team"
            editable={true}
          />
        </div>
        <CustomInputField
          label="Position"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, position: e.target.value })
          }
          placeholder="Enter employee's Position"
          editable={true}
        />
        <button
          type="submit"
          className="bg-primaryDark text-white py-2 mt-2 rounded-lg font-semibold hover:bg-primaryLight"
        >
          Next
        </button>
      </form>
    </div>
  );
}
