import React, { useState } from "react";
import MenuButton from "./MenuButton";
import { Divider } from "@heroui/react";
// import { useSelector } from "react-redux";

export default function Home() {
  //   const auth = useSelector((state) => state.auth);
  const [index, setIndex] = useState(0);

  return (
    <div className="w-screen h-screen">
      <div className="max-w-[270px] h-screen flex flex-col items-center bg-secondary px-6">
        <div className="w-full h-[56px] bg-primaryDark flex justify-center items-center my-8 rounded-lg">
          <img
            src="icons/hrelix-logo-white.svg"
            alt=""
            className="h-[36px] w-[120]"
          />
        </div>
        <MenuButton
          icon="icons/home-icon.svg"
          text="Dashboard"
          active={index === 0}
          onClick={() => setIndex(0)}
        />
        <MenuButton
          icon="icons/employees-icon.svg"
          text="Employees"
          active={index === 1}
          onClick={() => setIndex(1)}
        />
        <MenuButton
          icon="icons/payroll-icon.svg"
          text="Payroll"
          active={index === 2}
          onClick={() => setIndex(2)}
        />
        <MenuButton
          icon="icons/leaves-icon.svg"
          text="Employee Leaves"
          active={index === 3}
          onClick={() => setIndex(3)}
        />
        <MenuButton
          icon="icons/stats-icon.svg"
          text="Statistics"
          active={index === 4}
          onClick={() => setIndex(4)}
        />
        <Divider className="my-4 bg-white" />
        <MenuButton
          icon="icons/settings-icon.svg"
          text="Settings"
          active={index === 5}
          onClick={() => setIndex(5)}
        />
        <MenuButton
          icon="icons/help-icon.svg"
          text="Help"
          active={index === 6}
          onClick={() => setIndex(6)}
        />
        <Divider className="my-4 bg-white" />
        <p className="text-xs font-bold w-full text-primaryDark">
          © HRelix Inc. 2025
        </p>
      </div>
    </div>
  );
}
