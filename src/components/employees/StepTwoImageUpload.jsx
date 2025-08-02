import { useState } from "react";
import ProfileImage from "./ProfileImage";

export default function StepTwoImageUpload({ employee, onFinish, onClose }) {
  const [employeeData, setEmployeeData] = useState({ employee: employee });

  const handleFinish = () => {
    onFinish(employeeData.employee);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <ProfileImage
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
      />
      <button
        onClick={handleFinish}
        className="bg-pinkAccent text-white py-2 rounded-lg font-semibold hover:bg-pinkAccent/70 disabled:opacity-50"
      >
        Finish
      </button>
    </div>
  );
}
