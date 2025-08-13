import { useEffect, useState } from "react";
import LeavesTable from "./LeavesTable";
import AddNewLeave from "./AddNewLeave";
import { useLeaves } from "../data/use-leaves";
import LoadingScreen from "../../../shared/LoadingScreen";
import ErrorScreen from "../../../shared/ErrorScreen";

export default function LeavesContent() {
  const { leaves, loading, error, fetchLeaves, pagination, updateStatus } =
    useLeaves();
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLeaves(page);
  }, [page]);

  const handleStatusChange = (id, data) => {
    try {
      updateStatus(id, data, page);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    setShowModal(false);
    fetchLeaves(page);
  };

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
            handleStatusChange={handleStatusChange}
          />
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full min-h-[600px] bg-white/50 border-white border-1 rounded-xl p-4">
            <img src="/icons/search-icon.svg" alt="" className="w-[50px]" />
            <p className="text-primaryDark font-semibold text-lg">
              No Leaves to show!
            </p>
            <p className="text-primaryDark text-sm">
              There is no applied leaves in the Database
            </p>
          </div>
        )}
      </div>
      {showModal && <AddNewLeave onClose={handleClose} />}
    </div>
  );
}
