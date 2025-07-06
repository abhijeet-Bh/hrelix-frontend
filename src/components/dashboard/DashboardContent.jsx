import { useDashboard } from "./use-dashboard";

export default function Dashboard() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!dashboard) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p>{dashboard.totalEmployees}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">New Employees</h2>
          <p>{dashboard.newEmployees}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Payroll Pending</h2>
          <p>₹ {dashboard.payrollPending}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Employees on Leave</h2>
          <p>{dashboard.employeesOnLeave}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Leaves</h2>
      <ul className="space-y-2">
        {dashboard.leaves.map((leave) => (
          <li key={leave.id} className="bg-white border p-3 rounded shadow">
            <p className="font-semibold">{leave.employeeName}</p>
            <p className="text-sm text-gray-600">
              {leave.leaveType} Leave | {leave.startDate} → {leave.endDate}
            </p>
            <p className="text-sm text-gray-500 italic">{leave.reason}</p>
            <p className="text-sm text-green-600">{leave.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
