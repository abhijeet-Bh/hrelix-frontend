import { DashboardProvider } from "./DashboardContext";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
