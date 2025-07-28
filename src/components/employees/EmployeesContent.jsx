import { useState } from "react";
import CustomInputField from "./CustomInputField";

export default function EmployeesContent() {
  const [data, setData] = useState({
    employee: {
      id: "ad128b50-8087-41eb-89fb-bbb99d60812c",
      firstName: "Abhijeet",
      lastName: "Bhardwaj",
      email: "bh.abhi@hrelix.com",
      phone: "6574856473",
      salary: 1500000,
      joiningDate: "2025-07-26",
      avatar:
        "https://hrelix-backend.s3.amazonaws.com/profiles/9c9b37df-2cf3-4f97-9575-5cf0d4461347-20220716_07500.jpeg",
      roles: ["ADMIN"],
    },
    employeeCTC: {
      id: "037500eb-993d-4ae5-a236-0dd7361a086a",
      employee: "ad128b50-8087-41eb-89fb-bbb99d60812c",
      basicPay: 85000,
      houseRentAllowance: 25000,
      specialAllowance: 20000,
      otherAllowance: 15000,
      monthlyNetCTC: 145000,
    },
    deductions: {
      id: "95b14213-c136-4fac-8bbf-29fbc36edc05",
      employee: "ad128b50-8087-41eb-89fb-bbb99d60812c",
      epf: 10200,
      professionalTax: 1500,
      tds: 8867,
      otherDeductions: 0,
      totalDeduction: 20567,
    },
    bankAccountDetail: {
      id: "15ed9815-6188-47eb-963d-356832da631b",
      employeeId: "ad128b50-8087-41eb-89fb-bbb99d60812c",
      bankName: "Bank Of India",
      bankAccountNumber: "18XXX89XX891",
      ifscCode: "BKID00735",
    },
  });

  return (
    <div className="flex flex-col pb-8 px-2">
      <div className="sticky top-0 z-10 bg-[#f5f3ff] pt-8">
        <div className="flex flex-row justify-between items-center">
          <p className="text-primaryDark font-bold text-2xl">
            Employees Management
          </p>
          <div className="mr-4 cursor-pointer hover:bg-primaryDark/70 flex flex-row items-center justify-between gap-2 bg-primaryDark py-2 px-5 rounded-lg drop-shadow-button">
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
              name="email"
              className="rounded-lg w-full px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary text-primaryDark placeholder:text-primaryLight"
              placeholder="Enter employee email to search..."
            />
            <button
              className="px-20 text-sm text-primaryDark font-semibold py-2 rounded-md ml-4 drop-shadow-button cursor-pointer bg-accent"
              type="submit"
            >
              Go
            </button>
          </form>
        </div>
      </div>
      <div className="z-0 my-2 gap-x-7 w-full h-full bg-white/50 border-white border-1 p-5 rounded-xl flex flex-row">
        {/* First Column */}
        <div className="flex flex-col items-end justify-end w-full gap-y-4">
          <p className="text-primaryDark font-semibold text-4xl">
            {data.employee.firstName} {data.employee.lastName}
          </p>
          <div className="w-full flex flex-row justify-end items-center">
            <p className="text-pinkAccent font-semibold text-lg">
              RELIXEMP001A
            </p>
            <img src="icons/copy-icon.svg" alt="" className="w-5 h-5 ml-2" />
          </div>
          <div
            className={`bg-[url('${data.employee.avatar}')] bg-cover h-72 w-full rounded-xl my-3 flex flex-col justify-end items-center`}
          >
            <div className="bg-black/50 h-16 w-full rounded-b-xl flex flex-row justify-end items-center">
              <button className="bg-accent/20 text-accent text-sm mx-4 p-2 rounded-lg">
                Change profile picture
              </button>
            </div>
          </div>
          <CustomInputField
            label="Role"
            value={data.employee.roles[0]}
            editable={false}
          />
          <CustomInputField
            label="Team"
            value="Human Resource"
            editable={false}
          />
          <CustomInputField
            label="Joining Date"
            value={data.employee.joiningDate}
            editable={false}
          />
          <button
            className="px-20 w-full text-sm text-accent font-semibold py-3 rounded-md mt-4 drop-shadow-button cursor-pointer bg-red-500"
            type="submit"
          >
            Delete Employee
          </button>
        </div>

        {/* Second Column */}
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col gap-y-4">
            <CustomInputField
              label="Email Address"
              value={data.employee.email}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Phone Number"
              value={data.employee.phone}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Salary"
              value={data.employee.salary}
              editable={false}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <CustomInputField
              label="Bank Name"
              value={data.bankAccountDetail.bankName}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="Account Number"
              value={data.bankAccountDetail.bankAccountNumber}
              editable={false}
              icon={true}
            />
            <CustomInputField
              label="IFSC Number"
              value={data.bankAccountDetail.ifscCode}
              editable={false}
              icon={true}
            />
            <button
              className="px-20 w-full text-sm text-primaryDark font-semibold py-3 rounded-md mt-4 drop-shadow-button cursor-pointer bg-accent"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-full justify-between">
          <CustomInputField
            label="Basic Pay"
            value={data.employeeCTC.basicPay}
            editable={true}
          />
          <CustomInputField
            label="HRA"
            value={data.employeeCTC.houseRentAllowance}
            editable={true}
          />
          <CustomInputField
            label="Special Allowance"
            value={data.employeeCTC.specialAllowance}
            editable={true}
          />
          <CustomInputField
            label="Other Allowance"
            value={data.employeeCTC.otherAllowance}
            editable={true}
          />
          <CustomInputField
            label="Employee Provident Fund"
            value={data.deductions.epf}
            editable={true}
          />
          <CustomInputField
            label="Professional Tax"
            value={data.deductions.professionalTax}
            editable={true}
          />
          <CustomInputField
            label="TDS (tax deduction at source)"
            value={data.deductions.tds}
            editable={true}
          />
          <CustomInputField
            label="Other Deductions"
            value={data.deductions.otherDeductions}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}

function searchEmp(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  console.log(email);
}
