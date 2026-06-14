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
  const studentName = getInterventionStudentName(intervention);

  return {
    id: intervention.id,
    title: intervention.title || "Intervención sin título",
    type: intervention.type || "-",
    studentId: intervention.studentId || "-",
    studentName,
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
    // Cuando el backend acepte datetime, reemplazar por:
    // interventionDate: new Date(interventionData.interventionDate).toISOString(),
    interventionDate: toDateOnly(interventionData.interventionDate),
    caseFileId: Number(caseFile.id),
    professionalId: Number(professionalId),
  };
}

function getInterventionStudentName(intervention) {
  const student =
    intervention.Student ||
    intervention.student ||
    intervention.CaseFile?.Student ||
    intervention.caseFile?.student;

  const user = student?.User || student?.user;

  return (
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    `${student?.firstName || ""} ${student?.lastName || ""}`.trim() ||
    "-"
  );
}

function toDateOnly(value) {
  return value ? value.slice(0, 10) : "";
}

function formatDate(date) {
  if (!date) return "-";

  const dateOnly = date.slice(0, 10);

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split("-");
    return `${day}/${month}/${year}`;
  }

  return new Date(date).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}