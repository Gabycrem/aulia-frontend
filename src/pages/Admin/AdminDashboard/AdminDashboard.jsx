import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import Badge from "../../../components/Badge/Badge";
import useAdminDashboard from "../../../hooks/AdminDashboard/useAdminDashboard";
import "./AdminDashboard.css";

function AdminDashboard() {
  const {
    adminMetrics,
    managementCards,
    adminActivity,
    systemActivity,
    loading,
    error,
  } = useAdminDashboard();

  return (
    <DashboardLayout role="admin">
      <section className="admin-dashboard">
        {loading && <p>Cargando dashboard...</p>}

        {error && <p className="admin-dashboard-error">{error}</p>}

        {!loading && !error && (
          <>
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
                  </div>

                  <ul className="admin-dashboard-user-list">
                    {card.items.length > 0 ? (
                      card.items.map((item) => (
                        <li key={item.id}>
                          <div className="admin-dashboard-user-info">
                            <span>{item.name}</span>
                            <small>{item.detail}</small>
                          </div>

                          <Badge
                            variant={item.status === "Activo" ? "primary" : "muted"}
                          >
                            {item.status}
                          </Badge>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="admin-dashboard-user-info">
                          <span>No hay datos cargados</span>
                          <small>Gestioná registros desde esta sección</small>
                        </div>
                      </li>
                    )}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="admin-dashboard-bottom">
              <Card className="admin-dashboard-panel">
                <h2>Resumen administrativo</h2>

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
                <h2>Datos del sistema</h2>

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
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminDashboard;