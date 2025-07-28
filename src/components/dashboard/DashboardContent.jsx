import { useSelector } from "react-redux";
import { useDashboard } from "./use-dashboard";
import { Button, Chip, Tooltip as HeroTooltip, Link } from "@heroui/react";
import { useNavigate } from "react-router";
import {
  Bar,
  BarChart,
  Tooltip as RechartToolTip,
  Cell,
  LabelList,
  XAxis,
} from "recharts";
import LoadingScreen from "../LoadingScreen";

import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import ErrorScreen from "../ErrorScreen";

export default function Dashboard() {
  const { dashboard, loading, error, refetch } = useDashboard();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading)
    return (
      <div className="h-full w-full">
        <LoadingScreen />
      </div>
    );
  if (user.status >= 500)
    return (
      <ErrorScreen
        error="Something went wrong, please try again!"
        text={"Refresh"}
        callBack={refetch}
        isButtonEnabled={true}
      />
    );
  if (user.status !== 200)
    return (
      <ErrorScreen
        error={user.error}
        callBack={handleLogout}
        text="Log In"
        isButtonEnabled={true}
      />
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!dashboard) return null;

  const xdata = [
    { name: "Processed", value: dashboard.payrollProcessed, color: "#493D9E" },
    { name: "Pending", value: dashboard.payrollPending, color: "#B2A5FF" },
    { name: "Blocked", value: dashboard.payrollBlocked, color: "#DAD2FF" },
  ];

  // custom tootip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md shadow-md rounded-xl px-4 py-2 border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-600">
            Value:{" "}
            <span className="font-bold text-primary-dark">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label component
  const CustomBarLabel = ({ x, y, width, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#493d9e"
        textAnchor="middle"
        fontWeight="bold"
        fontSize={14}
      >
        ₹{value}
      </text>
    );
  };

  return (
    <div className="p-1">
      <div className="w-full justify-between flex flex-row items-center mb-8 sticky top-0 bg-[#f5f3ff] z-[2]">
        <div className="flex flex-row h-[80px] items-center mt-4">
          <img
            src={user.data.avatar}
            alt=""
            className="bg-cover rounded-full mr-3 h-12 w-12"
          />

          <div className="flex flex-col justify-start">
            <p className="text-primaryDark">Hello, Good Morning 👋</p>
            <p className="font-bold text-pinkAccent">
              {user.data.firstName} {user.data.lastName}
            </p>
          </div>
        </div>
        <div className="bg-pinkAccent hover:bg-pink-500 cursor-pointer rounded-lg shadow-md">
          <Link
            cisExternal
            showAnchorIcon
            href="https://api-hrelix.blufin.co.in/swagger-ui/index.html"
            className="mx-4 my-2 text-white"
          >
            Api Docs
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-6 mb-6">
        {[
          {
            title: "Total Employees",
            value: dashboard.totalEmployees - dashboard.employeesOnLeave,
            of: dashboard.totalEmployees,
            color: "text-primaryDark",
            info: "Total No. Employees in this organisation including ADMIN, HR, EMPLOYEE",
          },
          {
            title: "Employees On Leave",
            value: dashboard.employeesOnLeave,
            of: dashboard.totalEmployees,
            color: "text-red-500",
            info: "Total No. Employees who are absent today",
          },
          {
            title: "New Employees",
            value: dashboard.newEmployees,
            of: dashboard.totalEmployees,
            color: "text-green-500",
            info: "No. Employees who joined this organisation in last 30 days!",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 min-w-[250px] rounded-lg shadow-sm flex flex-col justify-between px-10 py-6 items-center bg-white/50"
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p className={`mb-3 font-bold ${item.color}`}>{item.title}</p>
              <HeroTooltip
                key={"secondary"}
                className="capitalize"
                color={"dafault"}
                content={item.info}
                showArrow={true}
              >
                <div className="bg-primaryDark/50 py-1 px-3.5 rounded-full flex justify-center items-center text-white cursor-pointer">
                  i
                </div>
              </HeroTooltip>
            </div>
            <p className="my-6">
              <span className={`${item.color} font-bold text-5xl`}>
                {item.value}
              </span>
              <span className="text-secondary text-2xl"> of {item.of}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-6 justify-between mb-6">
        {/* Leave Requests */}
        <div className="flex-1 min-w-[320px] rounded-lg bg-white/50 p-4">
          <div className="flex flex-row justify-between items-center mb-6">
            <p className="text-primaryDark font-bold text-lg">Leave Requests</p>
            <Button
              color="warning"
              endContent={<img src="icons/right-icon.svg" className="w-4" />}
              radius="sm"
              size="sm"
              onPress={() => navigate("/employee-leaves")}
              className="z-[1]"
            >
              <span className="text-white font-bold">
                {dashboard.pendingLeaves.length} Leaves are Pending
              </span>
            </Button>
          </div>
          {dashboard.leaves.map((leave) => (
            <div
              key={leave.id}
              className="w-full rounded-lg flex flex-row justify-between p-3 my-2 bg-primaryLight/20 items-center"
            >
              <p className="text-sm text-primaryDark">{leave.employeeName}</p>
              <p className="text-sm text-primaryDark">
                {(new Date(leave.endDate) - new Date(leave.startDate)) /
                  (1000 * 3600 * 24)}{" "}
                Days
              </p>
              <Chip
                color={
                  leave.status === "APPROVED"
                    ? "success"
                    : leave.status === "REJECTED"
                    ? "danger"
                    : "warning"
                }
                variant="flat"
                radius="sm"
              >
                <span className="text-xs font-semibold px-2">
                  {leave.status}
                </span>
              </Chip>
            </div>
          ))}
        </div>

        {/* Payroll Statistics */}
        <div className="flex-1 min-w-[320px] rounded-lg bg-white/50 p-4">
          <div className="flex flex-row justify-between items-center mb-6">
            <p className="text-primaryDark font-bold text-lg">
              Payroll Statistics
            </p>
            <p className="text-primaryLight text-lg">
              {new Date().toLocaleString("default", {
                month: "long",
              })}{" "}
              - {new Date().getFullYear().toString().slice(-2)}
            </p>
          </div>
          <BarChart width={450} height={350} data={xdata}>
            <XAxis dataKey="name" />
            <RechartToolTip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="value" radius={[20, 20, 0, 0]}>
              <LabelList dataKey="value" content={<CustomBarLabel />} />
              {xdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
