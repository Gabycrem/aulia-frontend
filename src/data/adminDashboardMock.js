export const adminSummary = {
  registeredStudents: 350,
  activeTeachers: 32,
  cabinetMembers: 4,
  activeCourses: 18,
};

export const adminMetrics = [
  {
    id: "registered-students",
    title: "Alumnos registrados",
    value: adminSummary.registeredStudents,
  },
  {
    id: "active-teachers",
    title: "Docentes",
    value: adminSummary.activeTeachers,
  },
  {
    id: "cabinet-members",
    title: "Gabinete",
    value: adminSummary.cabinetMembers,
  },
  {
    id: "active-courses",
    title: "Cursos activos",
    value: adminSummary.activeCourses,
  },
];

export const managementCards = [
  {
    id: "students",
    title: "Gestión alumnos",
    actionLabel: "Gestionar",
    items: [
      {
        id: 1,
        name: "Juan Pérez",
        detail: "3° B",
        status: "Activo",
      },
      {
        id: 2,
        name: "Martina Gómez",
        detail: "3° B",
        status: "Activo",
      },
      {
        id: 3,
        name: "Lucas Fernández",
        detail: "4° A",
        status: "Inactivo",
      },
    ],
  },
  {
    id: "teachers",
    title: "Gestión docentes",
    actionLabel: "Gestionar",
    items: [
      {
        id: 1,
        name: "Nilda Gómez",
        detail: "Matemática",
        status: "Activo",
      },
      {
        id: 2,
        name: "Sergio Ramos",
        detail: "Historia",
        status: "Activo",
      },
      {
        id: 3,
        name: "Verónica Sánchez",
        detail: "Lengua",
        status: "Inactivo",
      },
    ],
  },
  {
    id: "cabinet",
    title: "Gestión gabinete",
    actionLabel: "Gestionar",
    items: [
      {
        id: 1,
        name: "Andrea Gonzales",
        detail: "Psicopedagoga",
        status: "Activo",
      },
      {
        id: 2,
        name: "Celeste Berges",
        detail: "Psicóloga",
        status: "Activo",
      },
      {
        id: 3,
        name: "Analía Martínez",
        detail: "Orientadora",
        status: "Activo",
      },
    ],
  },
];

export const adminActivity = [
  {
    id: 1,
    description: "Nuevo alumno registrado",
    createdAt: "Hace 10 min.",
  },
  {
    id: 2,
    description: "Docente asignado a curso",
    createdAt: "Hace 25 min.",
  },
  {
    id: 3,
    description: "Usuario de gabinete actualizado",
    createdAt: "Hoy",
  },
  {
    id: 4,
    description: "Curso creado",
    createdAt: "Ayer",
  },
];

export const systemActivity = [
  {
    id: 1,
    time: "10:27",
    description: "Verónica Sánchez - Docente",
  },
  {
    id: 2,
    time: "10:34",
    description: "Celeste Berges - Gabinete",
  },
  {
    id: 3,
    time: "11:15",
    description: "Analía Martínez - Gabinete",
  },
  {
    id: 4,
    time: "11:38",
    description: "Sergio Ramos - Docente",
  },
];
