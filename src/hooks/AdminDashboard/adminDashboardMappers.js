import {
  getRoleIdByName,
  isUserInRole,
  normalizeRolesResponse,
  normalizeUsersResponse,
} from "../../utils/userMappers";
import { normalizeStudentsResponse } from "../AdminStudents/adminStudentMappers";
import { normalizeCoursesResponse } from "../AdminTeachers/adminTeacherMappers";
import { normalizeSubjectsResponse } from "../AdminTeachers/adminTeacherMappers";

export function buildAdminMetrics({
  students,
  users,
  roles,
  courses,
  totals,
}) {
  const teacherRoleId = getRoleIdByName(roles, "Docente");
  const gabineteRoleId = getRoleIdByName(roles, "Gabinete");

  const teachers = users.filter((user) =>
    isUserInRole(user, teacherRoleId, "Docente")
  );

  const gabinete = users.filter((user) =>
    isUserInRole(user, gabineteRoleId, "Gabinete")
  );

  return [
    {
      id: "registered-students",
      title: "Alumnos registrados",
      value: totals?.students ?? students.length,
    },
    {
      id: "active-teachers",
      title: "Docentes",
      value: teachers.length,
    },
    {
      id: "cabinet-members",
      title: "Gabinete",
      value: gabinete.length,
    },
    {
      id: "active-courses",
      title: "Cursos activos",
      value: totals?.courses ?? courses.length,
    },
  ];
}

export function buildManagementCards({
  students,
  users,
  roles,
}) {
  const teacherRoleId = getRoleIdByName(roles, "Docente");
  const gabineteRoleId = getRoleIdByName(roles, "Gabinete");

  const teachers = users.filter((user) =>
    isUserInRole(user, teacherRoleId, "Docente")
  );

  const gabinete = users.filter((user) =>
    isUserInRole(user, gabineteRoleId, "Gabinete")
  );

  return [
    {
      id: "students",
      title: "Gestión alumnos",
      items: students.slice(0, 3).map(mapStudentToCardItem),
    },
    {
      id: "teachers",
      title: "Gestión docentes",
      items: teachers.slice(0, 3).map(mapUserToCardItem),
    },
    {
      id: "cabinet",
      title: "Gestión gabinete",
      items: gabinete.slice(0, 3).map(mapUserToCardItem),
    },
  ];
}

export function normalizeAdminDashboardData({
  usersResponse,
  rolesResponse,
  studentsResponse,
  coursesResponse,
  subjectsResponse,
}) {
  const users = normalizeUsersResponse(usersResponse);
  const roles = normalizeRolesResponse(rolesResponse);
  const students = normalizeStudentsResponse(studentsResponse);
  const courses = normalizeCoursesResponse(coursesResponse);
  const subjects = normalizeSubjectsResponse(subjectsResponse);

  return {
    users,
    roles,
    students,
    courses,
    subjects,
    totals: {
      users: getResponseTotal(usersResponse, users),
      students: getResponseTotal(studentsResponse, students),
      courses: getResponseTotal(coursesResponse, courses),
      subjects: getResponseTotal(subjectsResponse, subjects),
    },
  };
}

function getResponseTotal(response, fallbackItems) {
  return (
    response?.totalItems ??
    response?.total ??
    response?.count ??
    fallbackItems.length
  );
}

function mapUserToCardItem(user) {
  return {
    id: user.id,
    name:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Usuario sin nombre",
    detail: user.email || user.username || "-",
    status: user.active ? "Activo" : "Inactivo",
  };
}

function mapStudentToCardItem(student) {
  const user = student.User || student.user || {};
  const course = student.Course || student.course;

  return {
    id: student.id,
    name:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Alumno sin nombre",
    detail: course
      ? [course.grade, course.division, course.level].filter(Boolean).join(" ")
      : student.courseId
        ? `Curso ID ${student.courseId}`
        : "Sin curso",
    status: student.active ? "Activo" : "Inactivo",
  };
}