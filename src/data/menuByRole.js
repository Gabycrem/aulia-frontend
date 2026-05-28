export const menuByRole = {
  student: [
    { label: 'Check-in de emociones', path: '/dashboard/estudiante' },
  ],

  gab: [
    { label: 'Dashboard', path: '/dashboard/gabinete' },
    { label: 'Alumnos', path: '/dashboard/gabinete/alumnos' },
    { label: 'Alertas', path: '/dashboard/gabinete/alertas' },
    { label: 'Intervenciones', path: '/dashboard/gabinete/intervenciones' },
    { label: 'Agenda', path: '/dashboard/gabinete/agenda' },
    { label: 'Reporte', path: '/dashboard/gabinete/reporte' },
  ],

  teacher: [
    { label: 'Dashboard', path: '/dashboard/docente' },
    { label: 'Mis Alumnos', path: '/dashboard/docente/mis-alumnos' },
    { label: 'Solicitar Intervención', path: '/dashboard/docente/solicitar-intervencion' },
    { label: 'Agenda', path: '/dashboard/docente/agenda' },
  ],

  admin: [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Gestionar Alumnos', path: '/dashboard/admin/gestionar-alumnos' },
    { label: 'Gestionar Gabinete', path: '/dashboard/admin/gestionar-gabinete' },
    { label: 'Gestionar Docentes', path: '/dashboard/admin/gestionar-docentes' },
    { label: 'Configuración', path: '/dashboard/admin/configuración' },
  ],
};