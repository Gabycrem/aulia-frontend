import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import Badge from "../../../components/Badge/Badge";
import "./AdminDashboard.css";
import {
  adminMetrics,
  managementCards,
  adminActivity,
  systemActivity,
} from "../../../data/adminDashboardMock";

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
