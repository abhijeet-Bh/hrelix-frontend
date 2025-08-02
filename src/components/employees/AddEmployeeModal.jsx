import { useState } from "react";
import StepOneForm from "./StepOneForm";
import StepTwoImageUpload from "./StepTwoImageUpload";
import { addToast } from "@heroui/react";

export default function AddEmployeeModal({ onClose, onEmployeeAdded }) {
  const [step, setStep] = useState(1);
  const [newEmployee, setNewEmployee] = useState(null);

  const handleStepOneNext = (employee) => {
    setNewEmployee(employee);
    onEmployeeAdded(employee);
    setStep(2);
  };

  const handleFinish = (updatedEmployee) => {
    onEmployeeAdded(updatedEmployee);
    onClose();
  };

  const showToast = (success, description) => {
    addToast({
      title: success ? "Success!" : "Failed!",
      description: description,
      variant: "solid",
      color: success ? "success" : "danger",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        {step === 1 ? (
          <StepOneForm
            onNext={handleStepOneNext}
            onClose={onClose}
            showToast={showToast}
          />
        ) : (
          <StepTwoImageUpload
            employee={newEmployee}
            onFinish={handleFinish}
            onClose={onClose}
            showToast={showToast}
          />
        )}
      </div>
    </div>
  );
}
