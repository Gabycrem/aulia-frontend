// Mock temporal pendiente de integración con backend.
// El endpoint para alumnos por docente ya existe en studentService.
// Se elimina cuando useTeacherStudents consuma datos reales y use mappers propios.

export const courseOptions = ["Todos", "1° C", "2° B", "3° A", "4° A"];

export const subjectOptions = ["Todas", "Lengua", "Historia", "Matemática"];

export const teacherStudents = [
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