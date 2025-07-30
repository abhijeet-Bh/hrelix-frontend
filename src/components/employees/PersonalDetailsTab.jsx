import { Formik, Form } from "formik";
import CustomInputField from "./CustomInputField";
import { updatePersonalDetails } from "../../api/employeeApi";
import { addToast } from "@heroui/react";
import { useState } from "react";

export default function PersonalDetailsTab({ employeeData, setEmployeeData }) {
  const [employeeDetails, setEmployeeDetails] = useState(
    employeeData?.employee || {}
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updatePersonalDetails(
        employeeDetails.id,
        employeeDetails
      );
      addToast({
        title: res.success ? "Success!" : "Failed",
        description: res.message,
        // @ts-ignore
        variant: "solid",
        color: res.success ? "success" : "danger",
      });

      setEmployeeData((prev) => ({
        ...prev,
        employee: employeeDetails,
      }));
    } catch (err) {
      console.error("Employee Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-6">
      <CustomInputField
        label="First Name"
        value={employeeDetails.firstName}
        onChange={(e) =>
          setEmployeeDetails({
            ...employeeDetails,
            firstName: e.target.value,
          })
        }
        placeholder="Enter First Name"
        editable={true}
      />
      <CustomInputField
        label="Last Name"
        value={employeeDetails.lastName}
        onChange={(e) =>
          setEmployeeDetails({
            ...employeeDetails,
            lastName: e.target.value,
          })
        }
        placeholder="Enter Last Name"
        editable={true}
      />
      <CustomInputField
        label="Email"
        value={employeeDetails.email}
        editable={false}
        washed={true}
      />
      <CustomInputField
        label="Phone"
        value={employeeDetails.phone}
        onChange={(e) =>
          setEmployeeDetails({
            ...employeeDetails,
            phone: e.target.value,
          })
        }
        editable={true}
      />
      <CustomInputField
        label="Salary"
        value={employeeDetails.salary}
        onChange={(e) =>
          setEmployeeDetails({
            ...employeeDetails,
            salary: e.target.value,
          })
        }
        editable={true}
      />
      <CustomInputField
        label="Joining Date"
        value={employeeDetails.joiningDate}
        editable={false}
        washed={true}
      />
      <CustomInputField
        label="Roles"
        value={employeeDetails.roles}
        onChange={(e) =>
          setEmployeeDetails({
            ...employeeDetails,
            roles: e.target.value,
          })
        }
        editable={true}
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
}
