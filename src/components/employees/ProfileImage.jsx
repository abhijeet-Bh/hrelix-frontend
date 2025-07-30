import { useRef, useState } from "react";
import { uploadProfilePicture } from "../../api/employeeApi";

export default function ProfileImage({ employeeData, setEmployeeData }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadProfilePicture(employeeData.employee.id, file);

      if (res?.success) {
        setEmployeeData((prev) => ({
          ...prev,
          employee: {
            ...prev.employee,
            avatar: res.data.avatar, // Adjust this key if necessary
          },
        }));
      } else {
        alert(res.message || "Upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative h-80 w-full rounded-xl my-3 overflow-hidden">
      <img
        src={employeeData.employee.avatar}
        alt="Profile"
        className="object-cover w-full h-full"
      />
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
