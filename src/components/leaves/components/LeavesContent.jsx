import { useEffect, useState } from "react";
import LeavesTable from "./LeavesTable";
import AddNewLeave from "./AddNewLeave";
import { useLeaves } from "../data/use-leaves";
import LoadingScreen from "../../../shared/LoadingScreen";
import ErrorScreen from "../../../shared/ErrorScreen";

export default function LeavesContent() {
  const { leaves, loading, error, fetchLeaves, pagination } = useLeaves();
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLeaves(page);
  }, [page]);

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
        {error && <ErrorScreen />}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <LoadingScreen />
          </div>
        )}
        {leaves.length > 0 ? (
          <LeavesTable
            leaves={leaves}
            setPage={setPage}
            loading={loading}
            totalPage={pagination.totalPage}
            currentPage={pagination.currentPage + 1}
          />
        ) : (
          "No Leaves data!"
        )}
      </div>
      {showModal && <AddNewLeave onClose={() => setShowModal(false)} />}
    </div>
  );
}
