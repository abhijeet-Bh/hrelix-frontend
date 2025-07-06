import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDashboardData } from "../../api/dashboardApi.js";
import { DashboardContext } from "./dashboard-context.js";

export function DashboardProvider({ children }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboardData(accessToken);
      setDashboard(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData(accessToken);
        setDashboard(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) loadDashboardData();
  }, [accessToken]);

  return (
    <DashboardContext.Provider
      value={{ dashboard, loading, error, refetch: loadDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
