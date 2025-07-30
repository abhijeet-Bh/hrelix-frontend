import { useState } from "react";
import CustomInputField from "./CustomInputField";
import { updateBankDetails } from "../../api/employeeApi";
import { addToast } from "@heroui/react";

export default function BankDetailsTab({ employeeData, setEmployeeData }) {
  const [bankDetail, setBankDetail] = useState(
    employeeData?.bankAccountDetail || {}
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateBankDetails({
        ...bankDetail,
        employeeId: employeeData.employee.id,
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
        bankAccountDetail: bankDetail,
      }));
    } catch (err) {
      console.error("CTC update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <CustomInputField
        label="Bank Name of Employee"
        value={bankDetail.bankName}
        onChange={(e) =>
          setBankDetail({ ...bankDetail, bankName: e.target.value })
        }
        placeholder="Enter Bank Name"
        editable={true}
      />

      <CustomInputField
        label="Account Number"
        value={bankDetail.bankAccountNumber}
        onChange={(e) =>
          setBankDetail({
            ...bankDetail,
            bankAccountNumber: e.target.value,
          })
        }
        placeholder="Enter Account Number"
        editable={true}
      />

      <CustomInputField
        label="IFSC Code"
        value={bankDetail.ifscCode}
        onChange={(e) =>
          setBankDetail({ ...bankDetail, ifscCode: e.target.value })
        }
        placeholder="Enter IFSC Code"
        editable={true}
      />

      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Bank Details"}
      </button>
    </form>
  );
}
