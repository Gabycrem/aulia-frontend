export function normalizeResponse(response, key) {
  return response?.data || response?.[key] || response || null;
}

export function normalizeListResponse(response, key) {
  const data =
    response?.data ||
    response?.[key] ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(data) ? data : [];
}

export function mapStudentToCaseDetail(student) {
  const user = student?.User || student?.user;

  return {
    id: student?.id,
    studentName:
      `${user?.firstName || student?.firstName || ""} ${
        user?.lastName || student?.lastName || ""
      }`.trim() || "Sin nombre",
    course: getCourseLabel(student),
    birthDate: formatDate(student?.birthDate),
    familyConsent: student?.familyConsent ? "Sí" : "No",
    status: student?.active ? "Activo" : "Inactivo",
    active: Boolean(student?.active),
  };
}

export function mapCaseFileToDetail(caseFile) {
  if (!caseFile) {
    return null;
  }

  return {
    id: caseFile.id,
    status: caseFile.status || "Sin estado",
    priority: caseFile.priority || "-",
    createdAt: formatDate(caseFile.createdAt),
    updatedAt: formatDate(caseFile.updatedAt),
  };
}

export function mapInterventionToDetailRow(intervention) {
  return {
    id: intervention.id,
    title: intervention.title || "Intervención sin título",
    type: intervention.type || "-",
    interventionDate: formatDateTime(intervention.interventionDate),
  };
}

function getCourseLabel(student) {
  const course = student?.Course || student?.course;

  if (course) {
    const label = [course.grade, course.division, course.level]
      .filter(Boolean)
      .join(" ");

    if (label) {
      return label;
    }
  }

  if (student?.courseId) {
    return String(student.courseId).toLowerCase().includes("curso")
      ? student.courseId
      : `Curso ID ${student.courseId}`;
  }

  return "Sin curso";
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("es-AR");
}

function formatDateTime(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}