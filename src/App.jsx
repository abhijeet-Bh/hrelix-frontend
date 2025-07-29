import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import { HeroUIProvider } from "@heroui/react";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Employees from "./components/employees/Employees";
import Payroll from "./components/Payroll";
import Leaves from "./components/Leaves";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";
import Help from "./components/Help";
import AuthWrapper from "./utils/AuthWrapper";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorScreen from "./components/ErrorScreen";
import { useIsMobile } from "./utils/useIsMobile";
import EmployeeDetails from "./components/employees/EmployeeDetails";

function App() {
  const auth = useSelector((state) => state.auth);
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="w-screen h-screen px-4">
        <ErrorScreen error="This contents of this site difficult to access in small screen, please us Desktop!" />
      </div>
    );

  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              auth.isAuthenticated ? (
                <AuthWrapper>
                  <Home />
                </AuthWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="employee-leaves" element={<Leaves />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="employee-details/:id" element={<EmployeeDetails />} />
          </Route>
          <Route
            path="/login"
            element={auth.isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
