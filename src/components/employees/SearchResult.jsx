import CustomInputField from "./CustomInputField";

export default function SearchResult({ searchResult }) {
  return (
    <div className="z-0 my-2 gap-x-7 w-full h-full flex flex-row">
      {/* First Column */}
      <div className="flex flex-col items-end justify-end w-full gap-y-4">
        <p className="text-primaryDark font-semibold text-4xl">
          {searchResult.employee.firstName} {searchResult.employee.lastName}
        </p>
        <div className="w-full flex flex-row justify-end items-center">
          <p className="text-pinkAccent font-semibold text-lg">RELIXEMP001A</p>
          <img src="icons/copy-icon.svg" alt="" className="w-5 h-5 ml-2" />
        </div>
        <div className="relative h-80 w-full rounded-xl my-3 overflow-hidden">
          <img
            src={searchResult.employee.avatar}
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
          value={searchResult.employee.roles[0]}
          editable={false}
        />
        <CustomInputField
          label="Team"
          value="Human Resource"
          editable={false}
        />
        <CustomInputField
          label="Joining Date"
          value={searchResult.employee.joiningDate}
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
            value={searchResult.employee.email}
            editable={false}
            icon={true}
          />
          <CustomInputField
            label="Phone Number"
            value={searchResult.employee.phone}
            editable={false}
            icon={true}
          />
          <CustomInputField
            label="Salary"
            value={searchResult.employee.salary}
            editable={false}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <CustomInputField
            label="Bank Name"
            value={searchResult.bankAccountDetail.bankName}
            editable={false}
            icon={true}
          />
          <CustomInputField
            label="Account Number"
            value={searchResult.bankAccountDetail.bankAccountNumber}
            editable={false}
            icon={true}
          />
          <CustomInputField
            label="IFSC Number"
            value={searchResult.bankAccountDetail.ifscCode}
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
          value={searchResult.employeeCTC.basicPay}
          editable={true}
        />
        <CustomInputField
          label="HRA"
          value={searchResult.employeeCTC.houseRentAllowance}
          editable={true}
        />
        <CustomInputField
          label="Special Allowance"
          value={searchResult.employeeCTC.specialAllowance}
          editable={true}
        />
        <CustomInputField
          label="Other Allowance"
          value={searchResult.employeeCTC.otherAllowance}
          editable={true}
        />
        <CustomInputField
          label="Employee Provident Fund"
          value={searchResult.deductions.epf}
          editable={true}
        />
        <CustomInputField
          label="Professional Tax"
          value={searchResult.deductions.professionalTax}
          editable={true}
        />
        <CustomInputField
          label="TDS (tax deduction at source)"
          value={searchResult.deductions.tds}
          editable={true}
        />
        <CustomInputField
          label="Other Deductions"
          value={searchResult.deductions.otherDeductions}
          editable={false}
        />
      </div>
    </div>
  );
}
