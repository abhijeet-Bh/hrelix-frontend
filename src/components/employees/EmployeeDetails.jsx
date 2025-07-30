import { useParams } from "react-router";
import CustomInputField from "./CustomInputField";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import { searchEmployeeByEmail } from "../../api/employeeApi";
import ErrorScreen from "../ErrorScreen";
import { formatINRCurrency } from "../../utils/UtilityFunctions";

export default function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await searchEmployeeByEmail(id);
        setEmployeeData(data);
      } catch (error) {
        setError(error.response.data.message);
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!id || error)
    return (
      <div className="h-full w-full">
        <ErrorScreen error={error || "Something went wrong"} />
      </div>
    );

  if (!employeeData)
    return (
      <div className="h-full w-full">
        <LoadingScreen />
      </div>
    );

  return (
    <div className="w-auto h-auto mx-4 p-4 my-8 bg-white/50 border-white border-1 rounded-xl ">
      <div className="z-0 my-2 gap-x-7 flex flex-row">
        {/* First Column */}
        <div className="flex flex-col items-end justify-end w-full gap-y-4">
          <p className="text-primaryDark font-semibold text-4xl">
            {employeeData.employee.firstName} {employeeData.employee.lastName}
          </p>
          <div className="w-full flex flex-row justify-end items-center">
            <p className="text-pinkAccent font-semibold text-lg">
              RELIXEMP001A
            </p>
            <img src="/icons/copy-icon.svg" alt="" className="w-5 h-5 ml-2" />
          </div>
          <div className="relative h-80 w-full rounded-xl my-3 overflow-hidden">
            <img
              src={employeeData.employee.avatar}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 h-16 w-full flex flex-row justify-end items-center">
              <button className="bg-accent/20 text-accent text-sm mx-4 p-2 rounded-lg">
                Change profile picture
              </button>
            </div>
          </div>
          <CustomInputField
            label="Role"
            value={employeeData.employee.roles[0]}
            editable={false}
          />
          <CustomInputField
            label="Team"
            value="Human Resource"
            editable={false}
          />
          <CustomInputField
            label="Joining Date"
            value={employeeData.employee.joiningDate}
            editable={false}
          />
        </div>

        {/* Second Column */}
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col gap-y-4">
            <CustomInputField
              label="Email Address"
              value={employeeData.employee.email}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Phone Number"
              value={employeeData.employee.phone}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Salary"
              value={formatINRCurrency(employeeData.employee.salary)}
              editable={false}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <CustomInputField
              label="Bank Name"
              value={employeeData.bankAccountDetail.bankName}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Account Number"
              value={employeeData.bankAccountDetail.bankAccountNumber}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="IFSC Number"
              value={employeeData.bankAccountDetail.ifscCode}
              editable={false}
              icon={true}
            />
            {/* <button
              className="px-20 w-full text-sm text-primaryDark font-semibold py-3 rounded-md mt-4 drop-shadow-button cursor-pointer bg-accent"
              type="submit"
            >
              Save Changes
            </button> */}
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-full justify-between">
          <CustomInputField
            label="Basic Pay"
            value={formatINRCurrency(employeeData.employeeCTC.basicPay)}
          />
          <CustomInputField
            label="HRA"
            value={formatINRCurrency(
              employeeData.employeeCTC.houseRentAllowance
            )}
          />
          <CustomInputField
            label="Special Allowance"
            value={formatINRCurrency(employeeData.employeeCTC.specialAllowance)}
          />
          <CustomInputField
            label="Other Allowance"
            value={formatINRCurrency(employeeData.employeeCTC.otherAllowance)}
          />
          <CustomInputField
            label="Employee Provident Fund"
            value={formatINRCurrency(employeeData.deductions.epf)}
          />
          <CustomInputField
            label="Professional Tax"
            value={formatINRCurrency(employeeData.deductions.professionalTax)}
          />
          <CustomInputField
            label="TDS (tax deduction at source)"
            value={formatINRCurrency(employeeData.deductions.tds)}
          />
          <CustomInputField
            label="Other Deductions"
            value={formatINRCurrency(employeeData.deductions.otherDeductions)}
          />
        </div>
      </div>
    </div>
  );
}
