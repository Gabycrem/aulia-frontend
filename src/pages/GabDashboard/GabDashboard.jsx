import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../components/Card/Card";
import DashboardMetric from "../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../components/DataTable/DataTable";
import Badge from "../../components/Badge/Badge";
import "./GabDashboard.css";

const dashboardMetrics = [
  {
    title: "Alumnos en seguimiento",
    value: "12",
  },
  {
    title: "Alertas activas",
    value: "5",
  },
  {
    title: "Clima emocional",
    value: "Regular",
  },
  {
    title: "Intervenciones de hoy",
    value: "3",
  },
];

const cases = [
  {
    id: 1,
    student: "Juan Pérez",
    reason: "Inasistencias reiteradas",
    priority: "Baja",
    status: "Resuelta",
    lastActivity: "Hace 2 hs.",
  },
  {
    id: 2,
    student: "Martina Gómez",
    reason: "Bajo rendimiento académico",
    priority: "Alta",
    status: "En revisión",
    lastActivity: "Hace 25 min.",
  },
  {
    id: 3,
    student: "Lucas Fernández",
    reason: "Problemas de conducta",
    priority: "Media",
    status: "Activo",
    lastActivity: "Hoy",
  },
  {
    id: 4,
    student: "Sofía Ramírez",
    reason: "Dificultades de aprendizaje",
    priority: "Alta",
    status: "Activo",
    lastActivity: "Ayer",
  },
  {
    id: 5,
    student: "Valentina Ruiz",
    reason: "Situación familiar compleja",
    priority: "Alta",
    status: "En revisión",
    lastActivity: "Ayer",
  },
];

const activityItems = [
  "Juan cargó un check-in emocional",
  "Nueva derivación creada para Martina Gómez",
  "Intervención registrada para Sofía Ramírez",
  "Estado actualizado a En revisión",
  "Seguimiento programado para mañana",
];

const agendaItems = [
  {
    time: "10:00",
    title: "Intervención con Juan",
  },
  {
    time: "11:30",
    title: "Reunión con familia",
  },
  {
    time: "14:00",
    title: "Seguimiento Lucas",
  },
  {
    time: "16:00",
    title: "Entrevista individual",
  },
];

const columns = [
  {
    key: "student",
    label: "Alumno",
  },
  {
    key: "reason",
    label: "Motivo",
  },
  {
    key: "priority",
    label: "Prioridad",
    render: (row) => <Badge variant="muted">{row.priority}</Badge>,
  },
  {
    key: "status",
    label: "Estado",
    render: (row) => <Badge variant="default">{row.status}</Badge>,
  },
  {
    key: "lastActivity",
    label: "Última actividad",
  },
  {
    key: "action",
    label: "Acción",
    render: () => (
      <button type="button" className="gab-dashboard-table-action">
        Ver
      </button>
    ),
  },
];

function GabDashboard() {
  return (
    <DashboardLayout role="gab">
      <section className="gab-dashboard">

        <div className="gab-dashboard-metrics">
          {dashboardMetrics.map((metric) => (
            <DashboardMetric
              key={metric.title}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>

        <Card className="gab-dashboard-table-card">
          <DataTable columns={columns} rows={cases} />
        </Card>

        <div className="gab-dashboard-bottom">
          <Card className="gab-dashboard-panel">
            <h2>Actividad reciente</h2>

            <ul className="gab-dashboard-activity-list">
              {activityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="gab-dashboard-panel">
            <h2>Agenda de hoy</h2>

            <ul className="gab-dashboard-agenda-list">
              {agendaItems.map((item) => (
                <li key={`${item.time}-${item.title}`}>
                  <strong>{item.time}</strong>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default GabDashboard;
