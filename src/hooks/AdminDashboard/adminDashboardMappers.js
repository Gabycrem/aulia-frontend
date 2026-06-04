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
      value: students.length,
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
      value: courses.length,
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
  return {
    users: normalizeUsersResponse(usersResponse),
    roles: normalizeRolesResponse(rolesResponse),
    students: normalizeStudentsResponse(studentsResponse),
    courses: normalizeCoursesResponse(coursesResponse),
    subjects: normalizeSubjectsResponse(subjectsResponse),
  };
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