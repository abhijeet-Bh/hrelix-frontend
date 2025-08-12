import { addToast } from "@heroui/react";
import NewLeaveForm from "./NewLeaveForm";

export default function AddNewLeave({ onClose }) {
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
        <NewLeaveForm onClose={onClose} showToast={showToast} />
      </div>
    </div>
  );
}
