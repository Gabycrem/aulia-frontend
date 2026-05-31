import {
  dashboardMetrics,
  priorityCases,
  recentActivity,
  todayAgenda,
} from "../../data/gabDashboardMock";

/*
DESCOMENTAR AL INTEGRAR

import { useEffect, useState } from "react";
import {
  getHelpRequests,
  getDailyCheckInSummary,
} from "../services/checkInService";
*/

function useGabDashboard() {
  /*
  DESCOMENTAR AL INTEGRAR

  const [dashboardMetricsData, setDashboardMetricsData] = useState(dashboardMetrics);
  const [priorityCasesData, setPriorityCasesData] = useState(priorityCases);
  const [recentActivityData, setRecentActivityData] = useState(recentActivity);
  const [todayAgendaData, setTodayAgendaData] = useState(todayAgenda);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);

        const helpRequests = await getHelpRequests();
        const checkInSummary = await getDailyCheckInSummary();

        console.log(helpRequests);
        console.log(checkInSummary);

        // setDashboardMetricsData(...)
        // setPriorityCasesData(...)
        // setRecentActivityData(...)
        // setTodayAgendaData(...)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);
  */

  return {
    dashboardMetrics,
    priorityCases,
    recentActivity,
    todayAgenda,
  };
}

export default useGabDashboard;