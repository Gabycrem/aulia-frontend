// Mock temporal pendiente de integración con backend.
// Gabinete ya tiene endpoints relacionados para derivaciones, solicitudes de ayuda y legajos,
// pero esta vista todavía no los consume.
// Se elimina cuando useGabStudents use services reales y mappers propios.

export const cases = [
  {
    id: 1,
    studentName: "Juan Pérez",
    course: "3° B",
    source: "Alerta",
    reason: "Ausentismo",
    priority: "Alta",
    status: "En revisión",
    lastUpdate: "Hace 2 hs.",
  },
  {
    id: 2,
    studentName: "Martina Gómez",
    course: "3° B",
    source: "Derivación",
    reason: "Dificultades de Aprendizaje",
    priority: "Alta",
    status: "Pendiente de aceptación",
    lastUpdate: "Hace 25 min.",
  },
  {
    id: 3,
    studentName: "Lucas Fernández",
    course: "3° B",
    source: "Legajo",
    reason: "Conducta y Convivencia",
    priority: "Baja",
    status: "Abierto",
    lastUpdate: "Hoy",
  },
  {
    id: 4,
    studentName: "Sofía Ramírez",
    course: "2° A",
    source: "Check-in",
    reason: "Socioemocional",
    priority: "Alta",
    status: "Pendiente",
    lastUpdate: "Hoy",
  },
  {
    id: 5,
    studentName: "Valentina Ruiz",
    course: "4° C",
    source: "Derivación",
    reason: "Socioemocional/Familiar",
    priority: "Alta",
    status: "Aceptado - En curso",
    lastUpdate: "Ayer",
  },
];