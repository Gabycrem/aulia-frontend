import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import "./GabDashboard.css";
import useGabDashboard from "../../../hooks/useGabDashboard";

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
  const {
    dashboardMetrics,
    priorityCases,
    recentActivity,
    todayAgenda,
  } = useGabDashboard();
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
          {/*
          {dashboardMetricsData.map((metric) => (
            <DashboardMetric
              key={metric.id}
              title={metric.title}
              value={metric.value}
            />
          ))}
            */}
        </div>

        <Card className="gab-dashboard-table-card">
          <DataTable columns={columns} rows={priorityCases} />
          {/* <DataTable columns={columns} rows={priorityCasesData} /> */}
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
              {/*
              {recentActivityData.map((activity) => (
                <li key={activity.id}>
                  <span>{activity.description}</span>
                  <small>
                    {activity.detail} · {activity.createdAt}
                  </small>
                </li>
              ))}
              */}
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
              {/*
              {todayAgendaData.map((agendaItem) => (
                <li key={agendaItem.id}>
                  <strong>{agendaItem.time}</strong>
                  <span>
                    {agendaItem.type} - {agendaItem.studentName}
                  </span>
                </li>
              ))}
              */}
            </ul>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default GabDashboard;