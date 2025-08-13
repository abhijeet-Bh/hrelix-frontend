import LeavesContent from "./components/LeavesContent";
import { LeaveProvider } from "./data/LeavesContext";

export default function Leaves() {
  return (
    <LeaveProvider>
      <LeavesContent />
    </LeaveProvider>
  );
}
