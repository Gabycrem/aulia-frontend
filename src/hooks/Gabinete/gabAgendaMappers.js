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
  const date = intervention.interventionDate
    ? new Date(intervention.interventionDate)
    : null;

  const dateKey = date ? date.toISOString().slice(0, 10) : "";

  return {
    id: intervention.id,
    source: "intervention",
    sourceId: intervention.id,
    date: dateKey,
    time: date
      ? date.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
    title: intervention.type || intervention.title || "Intervención",
    description: intervention.description || intervention.title || "",
    status: intervention.status || "Programada",
    caseFileId: intervention.caseFileId,
    studentId: intervention.studentId,
    professionalId: intervention.professionalId,
    raw: intervention,
  };
}