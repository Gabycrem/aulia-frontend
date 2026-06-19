import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDailyCheckInSummary,
  getHelpRequests,
} from "../../services/checkInService";
import { getReferrals } from "../../services/referralService";
import { getOpenCaseFiles } from "../../services/caseFileService";
import {
  buildGabDashboardMetrics,
  buildRecentActivity,
  mapReferralsToPriorityCases,
  normalizeCheckInSummaryResponse,
  normalizeHelpRequestsResponse,
  normalizeReferralsResponse,
  normalizeOpenCaseFilesResponse,
} from "./gabDashboardMappers";

function useGabDashboard() {
  const navigate = useNavigate();

  const [dashboardMetrics, setDashboardMetrics] = useState([]);
  const [priorityCases, setPriorityCases] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [todayAgenda, setTodayAgenda] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError("");

        const [referralsResponse, helpRequestsResponse, summaryResponse, openCaseFilesResponse,] =
          await Promise.all([
            getReferrals(),
            getHelpRequests(),
            getDailyCheckInSummary(),
            getOpenCaseFiles(),
          ]);

        const referrals = normalizeReferralsResponse(referralsResponse);
        const helpRequests = normalizeHelpRequestsResponse(helpRequestsResponse);
        const checkInSummary = normalizeCheckInSummaryResponse(summaryResponse);
        const openCaseFiles = normalizeOpenCaseFilesResponse(openCaseFilesResponse);

        setDashboardMetrics(
          buildGabDashboardMetrics({
            referrals,
            helpRequests,
            checkInSummary,
            openCaseFilesCount: openCaseFiles.count,
          })
        );
        setPriorityCases(mapReferralsToPriorityCases(referrals));
        setRecentActivity(buildRecentActivity({ referrals, helpRequests }));
        setTodayAgenda([]);
      } catch (error) {
        setError(error.message || "Error al cargar el dashboard de gabinete");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  function handleViewCase(caseItem) {
    if (!caseItem.studentId) {
      setError("No se pudo identificar el alumno asociado");
      return;
    }

    navigate(`/dashboard/gabinete/alumnos/${caseItem.studentId}/caso`);
  }

  function handleSelectAgendaItem() {
    return;
  }

  return {
    dashboardMetrics,
    priorityCases,
    recentActivity,
    todayAgenda,
    loading,
    error,
    handleViewCase,
    handleSelectAgendaItem,
  };
}

export default useGabDashboard;