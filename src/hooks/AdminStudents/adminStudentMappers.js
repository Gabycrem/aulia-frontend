import { mapCourseToOption } from "../AdminTeachers/adminTeacherMappers";
import {
  mapUserFormDataToUpdatePayload,
  mapUserToFormData,
} from "../../utils/userMappers";

export const initialStudentData = {
  birthDate: "",
  familyConsent: false,
  courseId: "",
};

export function normalizeStudentsResponse(response) {
  const students =
    response?.students?.rows ||
    response?.students?.data ||
    response?.students ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(students) ? students : [];
}

export function normalizeStudentResponse(response) {
  return response?.student || response?.data || response || null;
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

export function mapStudentToTableRow(student) {
  const user = getStudentUser(student);
  const course = getStudentCourse(student);

  return {
    id: student.id,
    studentName:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Alumno sin nombre",
    course: getCourseLabel(course, student.courseId),
    email: user.email || "-",
    familyConsent: student.familyConsent ? "Sí" : "No",
    status: student.active ? "Activo" : "Inactivo",
  };
}

export function mapStudentToDetail(student) {
  const user = getStudentUser(student);
  const course = getStudentCourse(student);

  return {
    id: student.id,
    userId: student.userId,
    courseId: student.courseId,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "-",
    birthDate: student.birthDate || "",
    course: getCourseLabel(course, student.courseId),
    familyConsent: student.familyConsent ? "Sí" : "No",
    active: student.active ? "Activo" : "Inactivo",
    createdAt: student.createdAt || "",
    updatedAt: student.updatedAt || "",
  };
}

export function mapCoursesToOptions(courses) {
  return courses.map(mapCourseToOption);
}

export function mapStudentFormToPayload(studentData, userId) {
  return {
    userId: Number(userId),
    birthDate: studentData.birthDate,
    familyConsent: studentData.familyConsent,
    courseId: Number(studentData.courseId),
  };
}

export function mapStudentToEditFormData(student) {
  const user = student.User || student.user || {};

  return {
    userData: mapUserToFormData({
      ...user,
      active: user.active ?? true,
    }),
    studentData: {
      birthDate: student.birthDate || "",
      familyConsent: Boolean(student.familyConsent),
      courseId: student.courseId || "",
    },
  };
}

export function mapStudentFormToUpdatePayload(studentData) {
  return {
    birthDate: studentData.birthDate,
    familyConsent: studentData.familyConsent,
    courseId: Number(studentData.courseId),
  };
}

export function mapStudentUserFormToUpdatePayload(userData) {
  return mapUserFormDataToUpdatePayload(userData, "Alumno");
}

function getStudentUser(student) {
  return student.User || student.user || {};
}

function getStudentCourse(student) {
  return student.Course || student.course || null;
}

function getCourseLabel(course, fallbackCourseId) {
  if (course) {
    const label = [course.grade, course.division, course.level]
      .filter(Boolean)
      .join(" ");

    if (label) {
      return label;
    }
  }

  if (fallbackCourseId) {
    return `Curso ID ${fallbackCourseId}`;
  }

  return "Sin curso";
}