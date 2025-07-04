import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import { HeroUIProvider } from "@heroui/react";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Payroll from "./components/Payroll";
import Leaves from "./components/Leaves";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";
import Help from "./components/Help";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={auth.isAuthenticated ? <Home /> : <Navigate to="/login" />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="employee-leaves" element={<Leaves />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
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
