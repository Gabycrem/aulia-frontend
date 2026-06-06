import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import Card from "../../../components/Card/Card";
import "./GabAlerts.css";

function GabAlerts() {
  return (
    <DashboardLayout role="gab">
      <section className="gab-alerts">
        <PageToolbar title="Alertas" />

        <Card className="gab-alerts-card">
          <h2>Alertas por check-in</h2>
          <p>
            En desarrollo...
          </p>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default GabAlerts;