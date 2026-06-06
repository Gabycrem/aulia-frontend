// Configuración local de navegación por rol.
// No representa datos del backend: define qué opciones ve cada rol en el Sidebar.
// Se mantiene en el frontend salvo que más adelante el backend exponga permisos/rutas dinámicas.
// Posible endpoint futuro:
// GET /api/navigation/menu-by-role

export const menuByRole = {
  student: [
    { label: 'Check-in de emociones', path: '/dashboard/estudiante' },
  ],

  gab: [
    { label: 'Dashboard', path: '/dashboard/gabinete' },
    { label: 'Alumnos', path: '/dashboard/gabinete/alumnos' },
    { label: 'Derivaciones', path: '/dashboard/gabinete/derivaciones' },
    { label: 'Alertas', path: '/dashboard/gabinete/alertas' },
    { label: 'Intervenciones', path: '/dashboard/gabinete/intervenciones' },
    { label: 'Agenda', path: '/dashboard/gabinete/agenda' },
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
    {
      label: 'Configuración',
      children: [
        {
          label: 'Materias',
          path: '/dashboard/admin/configuracion/materias',
        },
        {
          label: 'Cursos',
          path: '/dashboard/admin/configuracion/cursos',
        },
        {
          label: 'Roles del sistema',
          path: '/dashboard/admin/configuracion/roles',
        },
      ],
    },
  ],
};