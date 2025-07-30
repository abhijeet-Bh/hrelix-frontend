import { useRef, useState } from "react";
import { uploadProfilePicture } from "../../api/employeeApi";
import { addToast, CircularProgress } from "@heroui/react";

export default function ProfileImage({ employeeData, setEmployeeData }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadProfilePicture(employeeData.employee.id, file);
      console.log(res);

      if (res?.success) {
        setEmployeeData((prev) => ({
          ...prev,
          employee: {
            ...prev.employee,
            avatar: res.data.avatar, // Adjust this key if necessary
          },
        }));
        addToast({
          title: "Success!",
          description: "Profile picture updated!",
          variant: "solid",
          color: "success",
        });
      } else {
        addToast({
          title: "Failed!",
          description:
            res.error.message ||
            "Only 'HR' or 'ADMIN' can perform this Operation!",
          variant: "solid",
          color: "danger",
        });
      }
    } catch (err) {
      addToast({
        title: "Failed!",
        description:
          err.response.data.error.message ||
          "Only 'HR' or 'ADMIN' can perform this Operation!",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setUploading(false);
    }
  };

  // addToast({
  //   title: res.success ? "Success!" : "Failed!",
  //   description: res.success
  //     ? res.message
  //     : "Only 'HR' or 'ADMIN' can perform this Operation!",
  //   // @ts-ignore
  //   variant: "solid",
  //   color: res.success ? "success" : "danger",
  // });

  return (
    <div className="relative h-80 w-full rounded-xl my-3 overflow-hidden">
      {!uploading ? (
        <img
          src={employeeData.employee.avatar}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full flex bg-secondary/50 justify-center items-center">
          <CircularProgress aria-label="Loading..." color="danger" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 h-16 w-full flex flex-row justify-end items-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-accent/20 text-accent text-sm mx-4 p-2 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Change profile picture"}
        </button>
      </div>
    </div>
  );
}
