import { Divider } from "@heroui/react";
import NavButton from "./NavButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Sidebar() {
  const user = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
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
      <p className="text-xs w-full text-primaryLight mt-3">
        Software made for the internal use of the company. Share access to
        thirdparty (i.e. person(s) or organization(s)) is prohibited.
      </p>
      <div
        className="shadow-md hover:bg-red-500 transition-all delay-75 w-full h-150 my-8 px-8 py-2 flex flex-row justify-between cursor-pointer items-center bg-red-400 rounded-md"
        onClick={handleLogout}
      >
        <div className="flex flex-col mr-3">
          <p className="font-bold text-lg text-white/70">
            {user.data ? user.data.firstName : "User"}
          </p>
          <p className="font-bold text-xs text-white">
            {user.data ? user.data.roles[0] : "Role"}
          </p>
        </div>
        <img src="icons/logout-icon.svg" alt="" className="h-[28px]" />
      </div>
    </div>
  );
}
