import { Divider } from "@heroui/react";
import NavButton from "./NavButton";

export default function Sidebar() {
  return (
    <div className="max-w-[270px] h-screen flex flex-col items-center bg-secondary px-6">
      <div className="w-full h-[56px] bg-primaryDark flex justify-center items-center my-8 rounded-lg">
        <img
          src="icons/hrelix-logo-white.svg"
          alt="HRelix Logo"
          className="h-[36px] w-[120]"
        />
      </div>

      <NavButton to="/dashboard" icon="icons/home-icon.svg" text="Dashboard" />
      <NavButton
        to="/employees"
        icon="icons/employees-icon.svg"
        text="Employees"
      />
      <NavButton to="/payroll" icon="icons/payroll-icon.svg" text="Payroll" />
      <NavButton
        to="/employee-leaves"
        icon="icons/leaves-icon.svg"
        text="Employee Leaves"
      />
      <NavButton
        to="/statistics"
        icon="icons/stats-icon.svg"
        text="Statistics"
      />

      <Divider className="my-4 bg-white" />

      <NavButton
        to="/settings"
        icon="icons/settings-icon.svg"
        text="Settings"
      />
      <NavButton to="/help" icon="icons/help-icon.svg" text="Help" />

      <Divider className="my-4 bg-white" />

      <p className="text-xs font-bold w-full text-primaryDark mt-1">
        © HRelix Inc. 2025
      </p>
    </div>
  );
}
