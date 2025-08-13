import React, { useCallback } from "react";
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
import { getDaysAgo } from "../../utils/UtilityFunctions";

// Define columns for the table
const columns = [
  { name: "EMPLOYEE NAME", uid: "employeeName" },
  { name: "APPLIED", uid: "appliedOn" },
  { name: "NO. OF DAYS", uid: "days" },
  { name: "STATUS", uid: "status" },
];

// Chip colors for status
const statusColorMap = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

export default function DashBoardLeavesTable({ leaves }) {
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
      case "appliedOn":
        return (
          <p className="text-pinkAccent font-semibold">
            {getDaysAgo(cellValue)}
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
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      removeWrapper
      classNames={{
        tr: "even:bg-secondary/20 rounded-xl",
        th: "bg-secondary text-primaryDark",
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
  );
}
