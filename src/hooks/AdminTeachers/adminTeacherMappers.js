import {
  getRoleIdByName,
  isUserInRole,
  mapUserFormDataToCreatePayload,
  mapUserFormDataToUpdatePayload,
  mapUserToDetail,
  mapUserToFormData,
  mapUserToManagementRow,
} from "../../utils/userMappers";

export const initialAssignmentData = {
  academicYear: new Date().getFullYear(),
  courseId: "",
  subjectId: "",
};

export function getTeacherRoleId(roles) {
  return getRoleIdByName(roles, "Docente");
}

export function isTeacherUser(user, teacherRoleId) {
  return isUserInRole(user, teacherRoleId, "Docente");
}

export function mapTeacherUserToRow(user, assignmentCounts = {}) {
  const row = mapUserToManagementRow(user);

  return {
    ...row,
    teacherName: row.fullName,
    assignmentCount: assignmentCounts[user.id] || 0,
  };
}

export function mapTeacherToDetail(user) {
  const detail = mapUserToDetail(user);

  return {
    ...detail,
    teacherName: detail.fullName,
  };
}

export function mapTeacherToSummary(user) {
  const detail = mapUserToDetail(user);

  return {
    id: detail.id,
    teacherName: detail.fullName,
    email: detail.email,
    username: detail.username,
  };
}

export function mapUserToTeacherFormData(user) {
  return mapUserToFormData(user);
}

export function mapTeacherFormDataToCreatePayload(userData) {
  return mapUserFormDataToCreatePayload(userData, "Docente");
}

export function mapTeacherFormDataToUpdatePayload(userData) {
  return mapUserFormDataToUpdatePayload(userData, "Docente");
}

export function normalizeAssignmentsResponse(response) {
  const assignments =
    response?.assignments?.rows ||
    response?.assignments?.data ||
    response?.assignments ||
    response?.data ||
    response?.rows ||
    [];

  return Array.isArray(assignments) ? assignments : [];
}

export function normalizeCoursesResponse(response) {
  const courses =
    response?.courses ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(courses) ? courses : [];
}

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

export function countAssignmentsByTeacher(assignments) {
  return assignments.reduce((counts, assignment) => {
    const teacherId = assignment.teacherId;

    if (!teacherId) {
      return counts;
    }

    return {
      ...counts,
      [teacherId]: (counts[teacherId] || 0) + 1,
    };
  }, {});
}

export function mapCourseToOption(course) {
  const labelParts = [course.grade, course.division, course.level].filter(Boolean);

  return {
    id: course.id,
    value: course.id,
    label: labelParts.length > 0 ? labelParts.join(" ") : `Curso ${course.id}`,
  };
}

export function mapSubjectToOption(subject) {
  return {
    id: subject.id,
    value: subject.id,
    label: subject.name || `Materia ${subject.id}`,
  };
}

export function mapAssignmentToRow(assignment) {
  const course = assignment.Course || assignment.course;
  const subject = assignment.Subject || assignment.subject;

  return {
    id: assignment.id,
    course: course
      ? [course.grade, course.division, course.level].filter(Boolean).join(" ")
      : `Curso ID ${assignment.courseId || "-"}`,
    subject: subject?.name || `Materia ID ${assignment.subjectId || "-"}`,
    academicYear: assignment.academicYear || "-",
  };
}

export function mapAssignmentFormToPayload(assignmentData, teacherId) {
  return {
    academicYear: Number(assignmentData.academicYear),
    courseId: Number(assignmentData.courseId),
    teacherId: Number(teacherId),
    subjectId: Number(assignmentData.subjectId),
  };
}