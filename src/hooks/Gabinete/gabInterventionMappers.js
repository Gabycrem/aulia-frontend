export const initialInterventionData = {
  studentId: "",
  title: "",
  type: "",
  description: "",
  interventionDate: "",
};

export const interventionTypeOptions = [
  { id: "Entrevista Individual con Alumno", value: "Entrevista Individual con Alumno", label: "Entrevista individual con alumno" },
  { id: "Reunión Familiar", value: "Reunión Familiar", label: "Reunión familiar" },
  { id: "Observación de Aula", value: "Observación de Aula", label: "Observación de aula" },
  { id: "Reunión de Equipo / Articulación Interna", value: "Reunión de Equipo / Articulación Interna", label: "Reunión de equipo / articulación interna" },
];

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

export function normalizeStudentsResponse(response) {
  const students =
    response?.students?.rows ||
    response?.students?.data ||
    response?.students ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(students) ? students : [];
}

export function normalizeStudentResponse(response) {
  return response?.student || response?.data || response || null;
}

export function normalizeCaseFileResponse(response) {
  return response?.caseFile || response?.data || response || null;
}

export function mapStudentToOption(student) {
  const user = student.User || student.user;
  const name =
    `${user?.firstName || student.firstName || ""} ${
      user?.lastName || student.lastName || ""
    }`.trim() || `Alumno ${student.id}`;

  return {
    id: student.id,
    value: student.id,
    label: name,
  };
}

export function mapStudentToSummary(student) {
  return {
    id: student.id,
    studentName: mapStudentToOption(student).label,
  };
}

export function mapInterventionToRow(intervention) {
  return {
    id: intervention.id,
    title: intervention.title || "Intervención sin título",
    type: intervention.type || "-",
    studentId: intervention.studentId || "-",
    caseFileId: intervention.caseFileId || "-",
    interventionDate: formatDate(intervention.interventionDate),
    status: intervention.status || "Registrada",
  };
}

export function mapInterventionFormToPayload({
  interventionData,
  caseFile,
  professionalId,
}) {
  return {
    title: interventionData.title.trim(),
    type: interventionData.type,
    description: interventionData.description.trim(),
    // interventionDate: new Date(interventionData.interventionDate).toISOString(), cuando el back acepte datetime descomentar
    interventionDate: interventionData.interventionDate.slice(0, 10),
    caseFileId: Number(caseFile.id),
    professionalId: Number(professionalId),
  };
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}