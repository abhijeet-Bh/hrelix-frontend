import { useState } from "react";
import { Divider } from "@heroui/react";
import NavButton from "./NavButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`
      ${isCollapsed ? "w-[80px]" : "max-w-[270px]"} 
      h-screen flex flex-col items-center bg-secondary 
      ${isCollapsed ? "px-3" : "px-6"}
      transition-all duration-300 ease-in-out
    `}
    >
      <div className="w-full h-[56px] bg-primaryDark flex justify-center items-center my-8 rounded-lg p-4">
        <img
          src={`${
            isCollapsed
              ? "icons/hrelix-icon.svg"
              : "icons/hrelix-logo-white.svg"
          }`}
          alt="HRelix Logo"
          className="h-[36px] w-[120px]"
        />
      </div>

      <NavButton
        to="/dashboard"
        icon="icons/home-icon.svg"
        text="Dashboard"
        isCollapsed={isCollapsed}
      />
      <NavButton
        to="/employees"
        icon="icons/employees-icon.svg"
        text="Employees"
        isCollapsed={isCollapsed}
      />
      <NavButton
        to="/payroll"
        icon="icons/payroll-icon.svg"
        text="Payroll"
        isCollapsed={isCollapsed}
      />
      <NavButton
        to="/employee-leaves"
        icon="icons/leaves-icon.svg"
        text="Employee Leaves"
        isCollapsed={isCollapsed}
      />
      <NavButton
        to="/statistics"
        icon="icons/stats-icon.svg"
        text="Statistics"
        isCollapsed={isCollapsed}
      />

      <Divider className="my-4 bg-white" />

      <NavButton
        to="/settings"
        icon="icons/settings-icon.svg"
        text="Settings"
        isCollapsed={isCollapsed}
      />
      <NavButton
        to="/help"
        icon="icons/help-icon.svg"
        text="Help"
        isCollapsed={isCollapsed}
      />

      <Divider className="my-4 bg-white" />

      {!isCollapsed && (
        <>
          <p className="text-xs font-bold w-full text-primaryDark mt-1">
            © HRelix Inc. 2025
          </p>
          {/* <p className="text-xs w-full text-primaryLight mt-3">
            Software made for the internal use of the company. Share access to
            thirdparty (i.e. person(s) or organization(s)) is prohibited.
          </p> */}
        </>
      )}

      <div
        className={`
          drop-shadow-button hover:bg-red-500 transition-all delay-75 
          ${
            isCollapsed
              ? "w-[60px] justify-center"
              : "w-full px-6 justify-between"
          }
          h-150 mt-6 py-2 flex flex-row cursor-pointer items-center bg-red-400 rounded-md
        `}
        onClick={handleLogout}
      >
        {!isCollapsed && (
          <div className="flex flex-col mr-3">
            <p className="font-bold text-lg text-white/70">
              {user.data ? user.data.firstName : "User"}
            </p>
            <p className="font-bold text-xs text-white">
              {user.data ? user.data.roles[0] : "Role"}
            </p>
          </div>
        )}
        <img src="icons/logout-icon.svg" alt="Logout" className="h-[28px]" />
      </div>

      {!isCollapsed && (
        <p className="w-full text-end mt-2 text-primaryLight">
          version: <span className="font-bold">v1.2.1</span>
        </p>
      )}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`text-white p-2 rounded  mt-1 flex flex-row w-full ${
          isCollapsed ? "justify-center" : "justify-end"
        }`}
      >
        <img
          src={isCollapsed ? "icons/right-icon.svg" : "icons/left-icon.svg"}
          alt="Toggle sidebar"
          className="h-[30px] "
        />
      </button>
    </div>
  );
}
