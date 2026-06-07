export function normalizeInterventionsResponse(response) {
  const interventions =
    response?.interventions?.rows ||
    response?.interventions?.data ||
    response?.interventions ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(interventions) ? interventions : [];
}

export function mapInterventionToAgendaItem(intervention) {
  const dateKey = getDateOnly(intervention.interventionDate);

  return {
    id: intervention.id,
    source: "intervention",
    sourceId: intervention.id,
    date: dateKey,
    time: "-",
    title: intervention.type || intervention.title || "Intervención",
    description: intervention.description || intervention.title || "",
    status: intervention.status || "Programada",
    caseFileId: intervention.caseFileId,
    studentId: intervention.studentId,
    professionalId: intervention.professionalId,
    raw: intervention,
  };
}

function getDateOnly(value) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}