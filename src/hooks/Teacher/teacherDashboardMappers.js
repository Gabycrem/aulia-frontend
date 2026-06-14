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
      value: "N/D",
    },
    {
      id: "pending-requests",
      title: "Solicitudes pendientes",
      value: "N/D",
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

export function normalizeTeacherAssignmentsResponse(response) {
  const assignments =
    response?.foundAssignments ||
    response?.assignments?.rows ||
    response?.assignments?.data ||
    response?.assignments ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(assignments) ? assignments : [];
}

export function mapTeacherAssignmentToSummary(assignment) {
  const course = assignment.Course || assignment.course;
  const subject = assignment.Subject || assignment.subject;

  const courseLabel = course
    ? [course.grade, course.division, course.level].filter(Boolean).join(" ")
    : assignment.courseId
      ? `Curso ID ${assignment.courseId}`
      : "Sin curso";

  return {
    id: assignment.id,
    course: courseLabel,
    subject: subject?.name || "Sin materia",
  };
}

export function normalizeTeacherReferralsResponse(response) {
  const referrals =
    response?.referrals?.rows ||
    response?.referrals?.data ||
    response?.referrals ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(referrals) ? referrals : [];
}

export function filterReferralsByTeacher(referrals, teacherUserId) {
  return referrals.filter(
    (referral) => Number(referral.referrerId) === Number(teacherUserId)
  );
}

export function mapTeacherReferralToSummary(referral) {
  const student = referral.Student || referral.student;
  const user = student?.User || student?.user;

  const studentName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    `Alumno ID ${referral.studentId || "-"}`;

  return {
    id: referral.id,
    studentName,
    reason: referral.category || "Sin categoría",
    status: referral.status || "Sin estado",
    createdAt: formatDate(referral.createdAt),
  };
}

export function buildTeacherMetrics({ students, referrals }) {
  const uniqueCourses = new Set(
    students
      .map((student) => student.courseId || student.course)
      .filter(Boolean)
      .map(String)
  );

  const pendingReferrals = referrals.filter((referral) =>
    String(referral.status || "").toLowerCase().includes("pendiente")
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
      value: referrals.length,
    },
    {
      id: "pending-requests",
      title: "Solicitudes pendientes",
      value: pendingReferrals.length,
    },
  ];
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("es-AR");
}