import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../components/Card/Card";
import DashboardMetric from "../../components/DashboardMetric/DashboardMetric";
import Badge from "../../components/Badge/Badge";
import "./AdminDashboard.css";

const adminSummary = {
  registeredStudents: 350,
  activeTeachers: 32,
  cabinetMembers: 4,
  activeCourses: 18,
};

const adminMetrics = [
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

const managementCards = [
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

const adminActivity = [
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

const systemActivity = [
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

function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <section className="admin-dashboard">
        <div className="admin-dashboard-metrics">
          {adminMetrics.map((metric) => (
            <DashboardMetric
              key={metric.id}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>

        <div className="admin-dashboard-management">
          {managementCards.map((card) => (
            <Card key={card.id} className="admin-dashboard-management-card">
              <div className="admin-dashboard-card-header">
                <h2>{card.title}</h2>

                <button type="button" className="admin-dashboard-link-button">
                  {card.actionLabel}
                </button>
              </div>

              <ul className="admin-dashboard-user-list">
                {card.items.map((item) => (
                  <li key={item.id}>
                    <div className="admin-dashboard-user-info">
                      <span>{item.name}</span>
                      <small>{item.detail}</small>
                    </div>

                    <Badge variant={item.status === "Activo" ? "primary" : "muted"}>
                      {item.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="admin-dashboard-bottom">
          <Card className="admin-dashboard-panel">
            <h2>Actividad administrativa</h2>

            <ul className="admin-dashboard-activity-list">
              {adminActivity.map((activity) => (
                <li key={activity.id}>
                  <span>{activity.description}</span>
                  <small>{activity.createdAt}</small>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="admin-dashboard-panel">
            <h2>Actividad del sistema</h2>

            <ul className="admin-dashboard-system-list">
              {systemActivity.map((activity) => (
                <li key={activity.id}>
                  <strong>{activity.time}</strong>
                  <span>{activity.description}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AdminDashboard;
