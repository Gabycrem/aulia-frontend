// Mock temporal de agenda pendiente de integración con backend.
// Ya existe service de intervenciones; mapInterventionToAgendaItem puede quedarse como mapper
// si se mueve a hooks/utils, pero agendaMock y todayAgendaMock deberían eliminarse.
// Se elimina cuando GabAgenda y GabDashboard consuman intervenciones reales.

export const agendaMock = [
  {
    id: 1,
    source: "intervention",
    sourceId: 1,
    date: "2026-05-31",
    time: "10:00",
    title: "Entrevista Individual con Alumno",
    description: "Juan Pérez",
    status: "Programada",
    caseFileId: 1,
    studentId: 1,
    professionalId: 1,
    raw: {
      interventionDate: "2026-05-31T10:00:00.000Z",
      type: "Entrevista Individual con Alumno",
      title: "Entrevista inicial",
      description: "Seguimiento con Juan Pérez",
      caseFileId: 1,
      professionalId: 1,
    },
  },
  {
    id: 2,
    source: "intervention",
    sourceId: 2,
    date: "2026-05-31",
    time: "11:30",
    title: "Reunión Familiar",
    description: "Martina Gómez",
    status: "Programada",
    caseFileId: 2,
    studentId: 2,
    professionalId: 1,
    raw: {
      interventionDate: "2026-05-31T11:30:00.000Z",
      type: "Reunión Familiar",
      title: "Reunión con familia",
      description: "Martina Gómez",
      caseFileId: 2,
      professionalId: 1,
    },
  },
  {
    id: 3,
    source: "intervention",
    sourceId: 3,
    date: "2026-05-31",
    time: "14:00",
    title: "Observación de Aula",
    description: "Lucas Fernández",
    status: "Programada",
    caseFileId: 3,
    studentId: 3,
    professionalId: 1,
    raw: {
      interventionDate: "2026-05-31T14:00:00.000Z",
      type: "Observación de Aula",
      title: "Observación en clase",
      description: "Lucas Fernández",
      caseFileId: 3,
      professionalId: 1,
    },
  },
  {
    id: 4,
    source: "intervention",
    sourceId: 4,
    date: "2026-06-03",
    time: "09:00",
    title: "Reunión de Equipo / Articulación Interna",
    description: "Sofía Ramírez",
    status: "Programada",
    caseFileId: 4,
    studentId: 4,
    professionalId: 1,
    raw: {
      interventionDate: "2026-06-03T09:00:00.000Z",
      type: "Reunión de Equipo / Articulación Interna",
      title: "Reunión de seguimiento",
      description: "Sofía Ramírez",
      caseFileId: 4,
      professionalId: 1,
    },
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

export const todayAgendaMock = agendaMock.filter(
  (item) => item.date === "2026-05-31"
);