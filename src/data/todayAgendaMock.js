export const todayInterventionsMock = [
  {
    id: 1,
    interventionDate: "2026-05-31T10:00:00.000Z",
    type: "Entrevista Individual con Alumno",
    title: "Entrevista inicial",
    description: "Seguimiento con Juan Pérez",
    summary: "Se acuerda seguimiento semanal.",
    outcome: "Próxima entrevista en 7 días.",
    caseFileId: 1,
    professionalId: 1,
  },
  {
    id: 2,
    interventionDate: "2026-05-31T11:30:00.000Z",
    type: "Reunión Familiar",
    title: "Reunión con familia",
    description: "Martina Gómez",
    summary: "",
    outcome: "",
    caseFileId: 2,
    professionalId: 1,
  },
  {
    id: 3,
    interventionDate: "2026-05-31T14:00:00.000Z",
    type: "Observación de Aula",
    title: "Observación en clase",
    description: "Lucas Fernández",
    summary: "",
    outcome: "",
    caseFileId: 3,
    professionalId: 1,
  },
];

export function mapInterventionToAgendaItem(intervention) {
  const date = intervention.interventionDate
    ? new Date(intervention.interventionDate)
    : null;

  return {
    id: intervention.id,
    source: "intervention",
    sourceId: intervention.id,
    date: intervention.interventionDate,
    time: date
      ? date.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
    title: intervention.type || intervention.title || "Intervención",
    description: intervention.description || intervention.title || "",
    status: "Programada",
    caseFileId: intervention.caseFileId,
    studentId: intervention.studentId,
    professionalId: intervention.professionalId,
    raw: intervention,
  };
}

export const todayAgendaMock = todayInterventionsMock.map(
  mapInterventionToAgendaItem
);