import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDashboardData } from "../../api/dashboardApi.js";
import { DashboardContext } from "./dashboard-context.js";

export function DashboardProvider({ children }) {
  const [dashboard, setDashboard] = useState(() => {
    const cached = sessionStorage.getItem("dashboardData");
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(!dashboard); // only load if not cached
  const [error, setError] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const loadDashboardData = async (forceRefresh = false) => {
    // use cache unless forced
    if (!forceRefresh) {
      const cached = sessionStorage.getItem("dashboardData");
      if (cached) {
        setDashboard(JSON.parse(cached));
        return;
      }
    }

    try {
      setLoading(true);
      const data = await fetchDashboardData();
      setDashboard(data);
      sessionStorage.setItem("dashboardData", JSON.stringify(data));
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (accessToken && !dashboard) {
      loadDashboardData();
    }
  }, [accessToken]);

  // keep cache updated when dashboard changes
  useEffect(() => {
    if (dashboard) {
      sessionStorage.setItem("dashboardData", JSON.stringify(dashboard));
    }
  }, [dashboard]);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        error,
        refetch: () => loadDashboardData(true), // force refresh
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
