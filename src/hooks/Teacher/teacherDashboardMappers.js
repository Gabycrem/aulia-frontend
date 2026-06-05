import {
  mapTeacherStudentToRow,
  normalizeTeacherStudentsResponse,
} from "./teacherStudentsMappers";

export function mapTeacherDashboardStudents(response) {
  return normalizeTeacherStudentsResponse(response).map(mapTeacherStudentToRow);
}

export function buildTeacherMetricsFromStudents(students) {
  const uniqueCourses = new Set(
    students
      .map((student) => student.courseId || student.course)
      .filter(Boolean)
      .map(String)
  );

  return [
    {
      id: "assigned-courses",
      title: "Cursos asignados",
      value: uniqueCourses.size,
    },
    {
      id: "total-students",
      title: "Alumnos a cargo",
      value: students.length,
    },
    {
      id: "intervention-requests",
      title: "Solicitudes enviadas",
      value: "-",
    },
    {
      id: "pending-requests",
      title: "Solicitudes pendientes",
      value: "-",
    },
  ];
}

export function buildTeacherAssignmentsFromStudents(students) {
  const assignmentsMap = new Map();

  students.forEach((student) => {
    const key = `${student.courseId || student.course}-${student.subjectId || student.subject}`;

    if (!assignmentsMap.has(key)) {
      assignmentsMap.set(key, {
        id: key,
        course: student.course,
        subject: student.subject,
      });
    }
  });

  return Array.from(assignmentsMap.values()).slice(0, 4);
}