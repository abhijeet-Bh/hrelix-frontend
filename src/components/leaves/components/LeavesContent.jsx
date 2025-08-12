import { useState } from "react";
import { DummyLeaves } from "../data/dummy-leaves";
import LeavesTable from "./LeavesTable";
import { Button } from "@heroui/react";
import AddNewLeave from "./AddNewLeave";

export default function LeavesContent() {
  const [leaves, setLeaves] = useState(DummyLeaves);
  const [showModal, setShowModal] = useState(false);

  function onStatusChange(id, status) {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-primaryDark font-bold text-2xl">Leaves Management</p>
        <div
          className="mr-4 cursor-pointer hover:bg-primaryDark/70 flex flex-row items-center justify-between gap-2 bg-primaryDark py-2 px-5 rounded-lg drop-shadow-button"
          onClick={() => setShowModal(true)}
        >
          <img src="icons/add-emp-icon.svg" alt="" />
          <p className="text-accent text-sm font-semibold">New Leave Request</p>
        </div>
      </div>
      <div>
        {leaves.length > 0 ? (
          <LeavesTable leaves={leaves} onStatusChange={onStatusChange} />
        ) : (
          "No Leaves data!"
        )}
      </div>
      {showModal && <AddNewLeave onClose={() => setShowModal(false)} />}
    </div>
  );
}
