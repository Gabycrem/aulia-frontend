export const initialSubjectData = {
  name: "",
};

export function normalizeSubjectsResponse(response) {
  const subjects =
    response?.subjects?.rows ||
    response?.subjects?.data ||
    response?.subjects ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(subjects) ? subjects : [];
}

export function normalizeSubjectResponse(response) {
  return response?.subject || response?.data || response || null;
}

export function mapSubjectToRow(subject) {
  return {
    id: subject.id,
    name: subject.name || "Materia sin nombre",
  };
}

export function mapSubjectFormToPayload(subjectData) {
  return {
    name: subjectData.name.trim(),
  };
}

export const initialCourseData = {
  academicYear: new Date().getFullYear(),
  level: "",
  grade: "",
  division: "",
};

export function normalizeCoursesResponse(response) {
  const courses =
    response?.courses ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(courses) ? courses : [];
}

export function mapCourseToRow(course) {
  return {
    id: course.id,
    academicYear: course.academicYear || "-",
    level: course.level || "-",
    grade: course.grade || "-",
    division: course.division || "-",
    status: course.active ? "Activo" : "Inactivo",
  };
}

export function mapCourseFormToPayload(courseData) {
  return {
    academicYear: Number(courseData.academicYear),
    level: courseData.level,
    grade: courseData.grade,
    division: courseData.division.trim(),
  };
}