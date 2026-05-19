import Card from "../Card/Card";
import "./DashboardMetric.css";

function DashboardMetric({ title, value, helper, className = "" }) {
  return (
    <Card className={`dashboard-metric ${className}`}>
      <span className="dashboard-metric-title">{title}</span>
      <strong className="dashboard-metric-value">{value}</strong>
      {helper && <span className="dashboard-metric-helper">{helper}</span>}
    </Card>
  );
}

export default DashboardMetric;
