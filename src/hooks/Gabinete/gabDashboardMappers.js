import {
  mapReferralToGabCaseRow,
  normalizeReferralsResponse,
} from "./gabStudentsMappers";

export { normalizeReferralsResponse };

export function normalizeOpenCaseFilesResponse(response) {
  const caseFiles =
    response?.caseFiles?.rows ||
    response?.caseFiles?.data ||
    response?.caseFiles ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    [];

  const count =
    response?.count ||
    response?.caseFiles?.count ||
    response?.data?.count ||
    caseFiles.length;

  return {
    caseFiles: Array.isArray(caseFiles) ? caseFiles : [],
    count,
  };
}

export function normalizeHelpRequestsResponse(response) {
  const requests =
    response?.requests?.rows ||
    response?.requests?.data ||
    response?.requests ||
    response?.checkIns?.rows ||
    response?.checkIns?.data ||
    response?.checkIns ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(requests) ? requests : [];
}

export function normalizeCheckInSummaryResponse(response) {
  return response?.summary || response?.data || response || {};
}

export function buildGabDashboardMetrics({
  referrals,
  helpRequests,
  checkInSummary,
  openCaseFilesCount,
}) {
  const pendingReferrals = referrals.filter((referral) =>
    String(referral.status || "").toLowerCase().includes("pendiente")
  );

  return [
    {
      id: "open-case-files",
      title: "Legajos abiertos",
      value: openCaseFilesCount,
    },
    {
      id: "active-alerts",
      title: "Alertas activas",
      value: helpRequests.length,
    },
    {
      id: "pending-referrals",
      title: "Derivaciones pendientes",
      value: pendingReferrals.length,
    },
    {
      id: "today-checkins",
      title: "Check-ins de hoy",
      value: getSummaryTotal(checkInSummary),
    },
  ];
}

export function mapReferralsToPriorityCases(referrals) {
  return referrals
    .map((referral) => mapReferralToGabCaseRow(referral))
    .slice(0, 6);
}

export function buildRecentActivity({ referrals, helpRequests }) {
  const referralActivities = referrals.map((referral) => ({
    id: `referral-${referral.id}`,
    description: `Derivación recibida`,
    detail: referral.category || referral.reason || "Sin categoría",
    createdAt: formatDate(referral.createdAt),
  }));

  const helpRequestActivities = helpRequests.map((request) => ({
    id: `help-${request.id}`,
    description: "Solicitud de contacto recibida",
    detail: request.emotionalState || request.context || "Check-in",
    createdAt: formatDate(request.createdAt),
  }));

  return [...referralActivities, ...helpRequestActivities]
    .sort((a, b) => new Date(b.rawDate || 0) - new Date(a.rawDate || 0))
    .slice(0, 5);
}

function getSummaryTotal(summary) {
  if (Array.isArray(summary)) {
    return summary.length;
  }

  return (
    summary?.total ||
    summary?.totalCheckIns ||
    summary?.checkInsToday ||
    summary?.count ||
    "-"
  );
}

function formatDate(date) {
  if (!date) {
    return "Fecha no disponible";
  }

  return new Date(date).toLocaleDateString("es-AR");
}