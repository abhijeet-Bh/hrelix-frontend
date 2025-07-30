import { useState } from "react";
import CustomInputField from "./CustomInputField";
import { updateCTC } from "../../api/employeeApi";
import { formatINRCurrency } from "../../utils/UtilityFunctions";
import { addToast } from "@heroui/react";
import ErrorScreen from "../ErrorScreen";

export default function CTCTab({ employeeData, setEmployeeData }) {
  const [employeeCTC, setEmployeeCTC] = useState(
    employeeData?.employeeCTC || {}
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateCTC({
        ...employeeCTC,
        employee: employeeData.employee.id,
      });
      addToast({
        title: res.success ? "Success!" : "Failed!",
        description: res.success
          ? res.message
          : "Only 'HR' or 'ADMIN' can perform this Operation!",
        // @ts-ignore
        variant: "solid",
        color: res.success ? "success" : "danger",
      });

      setEmployeeData((prev) => ({
        ...prev,
        employeeCTC: employeeCTC,
      }));
    } catch (err) {
      console.error("CTC update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-6">
      <CustomInputField
        label="Basic Monthly Pay (in ₹)"
        value={employeeCTC.basicPay}
        onChange={(e) =>
          setEmployeeCTC({ ...employeeCTC, basicPay: Number(e.target.value) })
        }
        placeholder="Enter monthly basic pay"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(employeeCTC.basicPay))}
      </div>

      <CustomInputField
        label="House Rent Allowance (in ₹)"
        value={employeeCTC.houseRentAllowance}
        onChange={(e) =>
          setEmployeeCTC({
            ...employeeCTC,
            houseRentAllowance: Number(e.target.value),
          })
        }
        placeholder="Enter HRA amount"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(employeeCTC.houseRentAllowance))}
      </div>

      <CustomInputField
        label="Special Allowance (in ₹)"
        value={employeeCTC.specialAllowance}
        onChange={(e) =>
          setEmployeeCTC({
            ...employeeCTC,
            specialAllowance: Number(e.target.value),
          })
        }
        placeholder="Enter Special Allowance"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(employeeCTC.specialAllowance))}
      </div>

      <CustomInputField
        label="Other Allowance (in ₹)"
        value={employeeCTC.otherAllowance}
        onChange={(e) =>
          setEmployeeCTC({
            ...employeeCTC,
            otherAllowance: Number(e.target.value),
          })
        }
        placeholder="Enter Other Allowance"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(employeeCTC.otherAllowance))}
      </div>

      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update CTC"}
      </button>
    </form>
  );
}
