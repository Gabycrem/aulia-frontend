import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import "./GabDashboard.css";

const dashboardSummary = {
  openCaseFiles: 12,
  activeAlerts: 5,
  pendingReferrals: 3,
  todayInterventions: 4,
};

const dashboardMetrics = [
  {
    id: "open-case-files",
    title: "Legajos abiertos",
    value: dashboardSummary.openCaseFiles,
  },
  {
    id: "active-alerts",
    title: "Alertas activas",
    value: dashboardSummary.activeAlerts,
  },
  {
    id: "pending-referrals",
    title: "Derivaciones pendientes",
    value: dashboardSummary.pendingReferrals,
  },
  {
    id: "today-interventions",
    title: "Intervenciones de hoy",
    value: dashboardSummary.todayInterventions,
  },
];

const priorityCases = [
  {
    id: 1,
    studentName: "Juan Pérez",
    source: "Alerta",
    reason: "Ausentismo",
    priority: "Alta",
    status: "En revisión",
    lastUpdate: "Hace 2 hs.",
  },
  {
    id: 2,
    studentName: "Martina Gómez",
    source: "Derivación",
    reason: "Dificultades de Aprendizaje",
    priority: "Alta",
    status: "Pendiente de aceptación",
    lastUpdate: "Hace 25 min.",
  },
  {
    id: 3,
    studentName: "Lucas Fernández",
    source: "Legajo",
    reason: "Conducta y Convivencia",
    priority: "Baja",
    status: "Abierto",
    lastUpdate: "Hoy",
  },
  {
    id: 4,
    studentName: "Sofía Ramírez",
    source: "Check-in",
    reason: "Socioemocional",
    priority: "Alta",
    status: "Pendiente",
    lastUpdate: "Hoy",
  },
  {
    id: 5,
    studentName: "Valentina Ruiz",
    source: "Derivación",
    reason: "Socioemocional/Familiar",
    priority: "Alta",
    status: "Aceptado - En curso",
    lastUpdate: "Ayer",
  },
];

const recentActivity = [
  {
    id: 1,
    description: "Derivación creada para Martina Gómez",
    detail: "Creado",
    createdAt: "Hace 25 min.",
  },
  {
    id: 2,
    description: "Alerta de ausentismo asignada a Juan Pérez",
    detail: "En revisión",
    createdAt: "Hace 2 hs.",
  },
  {
    id: 3,
    description: "Intervención registrada para Sofía Ramírez",
    detail: "Entrevista Individual con Alumno",
    createdAt: "Hoy",
  },
  {
    id: 4,
    description: "Legajo actualizado para Lucas Fernández",
    detail: "Abierto",
    createdAt: "Hoy",
  },
];

const todayAgenda = [
  {
    id: 1,
    time: "10:00",
    studentName: "Juan Pérez",
    type: "Entrevista Individual con Alumno",
  },
  {
    id: 2,
    time: "11:30",
    studentName: "Martina Gómez",
    type: "Reunión Familiar",
  },
  {
    id: 3,
    time: "14:00",
    studentName: "Lucas Fernández",
    type: "Observación de Aula",
  },
  {
    id: 4,
    time: "16:00",
    studentName: "Sofía Ramírez",
    type: "Reunión de Equipo / Articulación Interna",
  },
];

const columns = [
  {
    key: "studentName",
    label: "Alumno",
  },
  {
    key: "source",
    label: "Origen",
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
    render: (row) => <Badge>{row.status}</Badge>,
  },
  {
    key: "lastUpdate",
    label: "Última actualización",
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
              key={metric.id}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>

        <Card className="gab-dashboard-table-card">
          <DataTable columns={columns} rows={priorityCases} />
        </Card>

        <div className="gab-dashboard-bottom">
          <Card className="gab-dashboard-panel">
            <h2>Actividad reciente</h2>

            <ul className="gab-dashboard-activity-list">
              {recentActivity.map((activity) => (
                <li key={activity.id}>
                  <span>{activity.description}</span>
                  <small>
                    {activity.detail} · {activity.createdAt}
                  </small>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="gab-dashboard-panel">
            <h2>Agenda de hoy</h2>

            <ul className="gab-dashboard-agenda-list">
              {todayAgenda.map((agendaItem) => (
                <li key={agendaItem.id}>
                  <strong>{agendaItem.time}</strong>
                  <span>
                    {agendaItem.type} - {agendaItem.studentName}
                  </span>
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