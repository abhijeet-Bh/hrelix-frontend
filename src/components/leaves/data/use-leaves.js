import { useContext } from "react";
import { LeaveContext } from "./leaves-context";

export function useLeaves() {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error("useLeaves must be used within a LeavesProvider");
  }
  return context;
}
