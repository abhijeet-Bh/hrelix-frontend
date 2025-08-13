import React, { useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Select,
  SelectItem,
  Button,
  Pagination,
} from "@heroui/react";
import { formatDate, getDaysAgo } from "../../../utils/UtilityFunctions";
import LoadingScreen from "../../../shared/LoadingScreen";

// Define columns for the table
const columns = [
  { name: "EMPLOYEE NAME", uid: "employeeName" },
  { name: "LEAVE TYPE", uid: "leaveType" },
  { name: "APPLIED", uid: "appliedOn" },
  { name: "NO. OF DAYS", uid: "days" },
  { name: "START DATE", uid: "startDate" },
  { name: "END DATE", uid: "endDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

// Chip colors for status
const statusColorMap = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

const leavetypeMap = {
  casual: "warning",
  sick: "danger",
  annual: "success",
};

export default function LeavesTable({
  leaves,
  setPage,
  loading,
  totalPage,
  currentPage,
  handleStatusChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [comments, setComments] = useState("");

  const processedLeaves = leaves.map((leave) => ({
    ...leave,
    days:
      (new Date(leave.endDate) - new Date(leave.startDate)) /
      (1000 * 3600 * 24),
  }));

  const renderCell = useCallback((leave, columnKey) => {
    const cellValue = leave[columnKey];

    switch (columnKey) {
      case "employeeName":
        return (
          <div className="font-semibold text-primaryDark">
            <p>{cellValue}</p>
          </div>
        );
      case "leaveType":
        return (
          <Chip
            className="capitalize p-2 text-white"
            color={leavetypeMap[cellValue.toLowerCase()]}
            size="sm"
            radius="lg"
          >
            {cellValue}
          </Chip>
        );
      case "appliedOn":
        return (
          <p className="text-pinkAccent font-semibold">
            {getDaysAgo(cellValue)}
          </p>
        );
      case "startDate":
        return (
          <p className="text-primaryDark font-medium">
            {formatDate(cellValue)}
          </p>
        );
      case "endDate":
        return (
          <p className="text-primaryDark font-medium">
            {formatDate(cellValue)}
          </p>
        );
      case "status":
        return (
          <Chip
            className="capitalize p-2 text-white"
            color={statusColorMap[leave.status.toLowerCase()]}
            size="sm"
            radius="sm"
          >
            {cellValue}
          </Chip>
        );
      case "days":
        return (
          <p className="text-primaryDark tracking-wide">
            <span className="font-bold">
              {cellValue > 9 ? cellValue : `0${cellValue}`}
            </span>{" "}
            Days
          </p>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-center">
            <Tooltip content="Edit status">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedLeave(leave);
                  setNewStatus(leave.status.toLowerCase());
                  setComments("");
                  setIsModalOpen(true);
                }}
              >
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-white/50 border-white border-1 rounded-xl p-4">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <LoadingScreen />
        </div>
      )}
      <Table
        removeWrapper
        classNames={{
          tr: "even:bg-primaryDark/5 rounded-xl",
          th: "bg-primaryDark text-white",
        }}
        aria-label="Leaves table with editable status"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={processedLeaves}>
          {(item) => (
            <TableRow key={item.id} className="h-12">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        color="primary"
        variant="solid"
        page={currentPage}
        total={totalPage}
        onChange={setPage}
        className="mt-2 w-full flex items-center justify-end"
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Update Leave Status</h3>

            <Select
              aria-label="Select new status"
              placeholder="Select status"
              size="sm"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              classNames={{
                trigger: "bg-secondary text-primaryDark font-semibold",
                value: "text-primaryDark",
                popoverContent: "bg-secondary text-primaryDark",
                listbox: "bg-tranparent", // background of dropdown
                listboxItem: "hover:bg-primaryLight hover:text-pinkAccent", // hover color
              }}
            >
              <SelectItem key="approved" value="approved">
                Approved
              </SelectItem>
              <SelectItem key="pending" value="pending">
                Pending
              </SelectItem>
              <SelectItem key="rejected" value="rejected">
                Rejected
              </SelectItem>
            </Select>

            <textarea
              placeholder="Comments..."
              className="w-full mt-4 px-4 py-3 pr-10 rounded-lg italic text-primaryDark font-semibold text-sm placeholder:text-primaryLight/70 placeholder:font-normal placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary/50"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                size="sm"
                color="danger"
                onPress={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                onPress={() => {
                  handleStatusChange(selectedLeave.id, {
                    status: newStatus.toUpperCase(),
                    comments,
                  });
                  setIsModalOpen(false);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
