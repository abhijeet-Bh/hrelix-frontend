import React, { useState } from "react";
import { addNewLeave } from "../../../api/leavesApi";
import CustomInputField from "../../../shared/CustomInputField";

export default function NewLeaveForm({ showToast, onClose }) {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");

  const handleNext = async (e) => {
    const newLeave = {
      leaveType: type,
      startDate: startDate,
      endDate: endDate,
      reason: reason,
    };
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await addNewLeave(newLeave);
      console.log(newLeave);
      // if (response.success) {
      //   showToast(true, "Leave request added successfully!");
      // } else {
      //   showToast(false, "Failed to add new Leave Request");
      // }
    } catch (err) {
      showToast(false, `Failed to add new Leave Request: ${err}`);
    } finally {
      setLoading(false);
    }
    console.log(newLeave);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingScreen />
        </div>
      )}
      <form onSubmit={handleNext} className="flex flex-col gap-4 px-4 py-2">
        <button
          onClick={onClose}
          className="w-full text-red-500 text-sm flex flex-row justify-end"
        >
          <span className="py-2 px-4 bg-red-500/20 hover:bg-red-500/40 rounded-full">
            close
          </span>
        </button>
        <label htmlFor="date" className="text-primaryLight text-base mb-1">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-3 pr-10 rounded-lg italic text-primaryDark font-semibold text-sm placeholder:text-primaryLight/70 placeholder:font-normal placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50"
        />
        <label htmlFor="date" className="text-primaryLight text-base mb-1">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-3 pr-10 rounded-lg italic text-primaryDark font-semibold text-sm placeholder:text-primaryLight/70 placeholder:font-normal placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50"
        />
        <label className="text-primaryLight text-base mt-1">Leave Reason</label>
        <CustomInputField
          color="primary"
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter Reason for the Leave"
          editable={true}
        />
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Select Date
        </label>
        <select
          id="options"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 pr-10 rounded-lg italic text-primaryDark font-semibold text-sm placeholder:text-primaryLight/70 placeholder:font-normal placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50"
        >
          <option value="">-- Choose your leave type --</option>
          <option value="SICK">SICK</option>
          <option value="ANNUAL">ANNUAL</option>
          <option value="CASUAL">CASUAL</option>
        </select>
        <button
          type="submit"
          className="bg-primaryDark text-white py-2 mt-2 rounded-lg font-semibold hover:bg-primaryLight"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
