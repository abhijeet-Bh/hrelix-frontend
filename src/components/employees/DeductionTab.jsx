import { useState } from "react";
import CustomInputField from "./CustomInputField";
import { updateDeductions } from "../../api/employeeApi";
import { formatINRCurrency } from "../../utils/UtilityFunctions";
import { addToast } from "@heroui/react";

export default function DeductionTab({ employeeData, setEmployeeData }) {
  const [deductions, setDeductions] = useState(employeeData?.deductions || {});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateDeductions({
        ...deductions,
        employee: employeeData.employee.id,
      });
      addToast({
        title: res.success ? "Success!" : "Failed",
        description: res.message,
        // @ts-ignore
        variant: "solid",
        color: res.success ? "success" : "danger",
      });

      setEmployeeData((prev) => ({
        ...prev,
        deductions: deductions,
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
        label="EPF Employer Providant fund (in ₹)"
        value={deductions.epf}
        onChange={(e) =>
          setDeductions({ ...deductions, epf: Number(e.target.value) })
        }
        placeholder="Enter CTC amount"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(deductions.epf))}
      </div>

      <CustomInputField
        label="Prefessional Tax (in ₹)"
        value={deductions.professionalTax}
        onChange={(e) =>
          setDeductions({
            ...deductions,
            professionalTax: Number(e.target.value),
          })
        }
        placeholder="Enter CTC amount"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(deductions.professionalTax))}
      </div>

      <CustomInputField
        label="TDS (in ₹)"
        value={deductions.tds}
        onChange={(e) =>
          setDeductions({ ...deductions, tds: Number(e.target.value) })
        }
        placeholder="Enter CTC amount"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(deductions.tds))}
      </div>

      <CustomInputField
        label="Other Deductions (in ₹)"
        value={deductions.otherDeductions}
        onChange={(e) =>
          setDeductions({
            ...deductions,
            otherDeductions: Number(e.target.value),
          })
        }
        placeholder="Enter CTC amount"
        type="number"
        editable={true}
      />
      <div className="text-gray-500 text-sm text-end">
        {formatINRCurrency(Number(deductions.otherDeductions))}
      </div>

      <div className="text-end mt-2 text-lg text-pinkAccent font-semibold">
        <span className="font-normal text-gray-500">Total Deductions: </span>
        {formatINRCurrency(
          Number(deductions.epf) +
            Number(deductions.professionalTax) +
            Number(deductions.tds) +
            Number(deductions.otherDeductions)
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Deductions"}
      </button>
    </form>
  );
}
