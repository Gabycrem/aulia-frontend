const teacherSummary = {
  assignedCourses: 3,
  totalStudents: 82,
  interventionRequests: 4,
  pendingRequests: 2,
};

export const teacherMetrics = [
  {
    id: "assigned-courses",
    title: "Cursos asignados",
    value: teacherSummary.assignedCourses,
  },
  {
    id: "total-students",
    title: "Alumnos a cargo",
    value: teacherSummary.totalStudents,
  },
  {
    id: "intervention-requests",
    title: "Solicitudes enviadas",
    value: teacherSummary.interventionRequests,
  },
  {
    id: "pending-requests",
    title: "Solicitudes pendientes",
    value: teacherSummary.pendingRequests,
  },
];

export const assignedStudents = [
  {
    id: 1,
    studentName: "Martina Gómez",
    course: "3° A",
    subject: "Lengua",
    lastRequest: "Pendiente",
  },
  {
    id: 2,
    studentName: "Lucas Fernández",
    course: "2° B",
    subject: "Historia",
    lastRequest: "Sin solicitud",
  },
  {
    id: 3,
    studentName: "Sofía Ramírez",
    course: "4° A",
    subject: "Matemática",
    lastRequest: "Enviada",
  },
  {
    id: 4,
    studentName: "Juan Pérez",
    course: "1° C",
    subject: "Lengua",
    lastRequest: "Sin solicitud",
  },
];

export const sentRequests = [
  {
    id: 1,
    studentName: "Martina Gómez",
    reason: "Dificultades de aprendizaje",
    status: "Pendiente",
    createdAt: "Hace 25 min.",
  },
  {
    id: 2,
    studentName: "Sofía Ramírez",
    reason: "Baja participación en clase",
    status: "Enviada",
    createdAt: "Ayer",
  },
];

export const todayClasses = [
  {
    id: 1,
    time: "09:00",
    course: "3° A",
    subject: "Lengua",
  },
  {
    id: 2,
    time: "11:00",
    course: "2° B",
    subject: "Historia",
  },
  {
    id: 3,
    time: "14:30",
    course: "4° A",
    subject: "Matemática",
  },
];