import { useState } from "react";
import { DummyLeaves } from "../data/dummy-leaves";
import LeavesTable from "./LeavesTable";

export default function LeavesContent() {
  const [leaves, setLeaves] = useState(DummyLeaves);

  function onStatusChange(id, status) {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  }

  return (
    <div className="p-8">
      <p className="text-primaryDark font-bold text-2xl mb-6">
        Leaves Management
      </p>
      <div>
        {leaves.length > 0 ? (
          <LeavesTable leaves={leaves} onStatusChange={onStatusChange} />
        ) : (
          "No Leaves data!"
        )}
      </div>
    </div>
  );
}
