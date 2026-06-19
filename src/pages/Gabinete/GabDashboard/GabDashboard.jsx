import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import TodayAgenda from "../../../components/TodayAgenda/TodayAgenda";
import useGabDashboard from "../../../hooks/Gabinete/useGabDashboard";
import "./GabDashboard.css";

function createColumns(handleViewCase) {
  return [
    { key: "studentName", label: "Alumno" },
    { key: "source", label: "Origen" },
    { key: "reason", label: "Motivo" },
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
    { key: "lastUpdate", label: "Última actualización" },
    {
      key: "action",
      label: "Acción",
      render: (row) => (
        <button
          type="button"
          className="gab-dashboard-table-action"
          onClick={() => handleViewCase(row)}
        >
          Ver
        </button>
      ),
    },
  ];
}

function GabDashboard() {
  const {
    dashboardMetrics,
    priorityCases,
    recentActivity,
    todayAgenda,
    loading,
    error,
    handleViewCase,
    handleSelectAgendaItem,
  } = useGabDashboard();

  const columns = createColumns(handleViewCase);

  return (
    <DashboardLayout role="gab">
      <section className="gab-dashboard">
        {loading && <p>Cargando dashboard...</p>}

        {error && <p className="gab-dashboard-error">{error}</p>}

        {!loading && !error && (
          <>
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
              <DataTable
                columns={columns}
                rows={priorityCases}
                emptyMessage="No hay derivaciones pendientes"
              />
            </Card>

            <div className="gab-dashboard-bottom">
              <Card className="gab-dashboard-panel">
                <h2>Actividad reciente</h2>

                {recentActivity.length === 0 ? (
                  <p>No hay actividad reciente.</p>
                ) : (
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
                )}
              </Card>

              <Card className="gab-dashboard-panel">
                <TodayAgenda
                  items={todayAgenda}
                  onSelectItem={handleSelectAgendaItem}
                />
              </Card>
            </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default GabDashboard;