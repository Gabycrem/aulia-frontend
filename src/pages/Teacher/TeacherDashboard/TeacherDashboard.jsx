import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import "./TeacherDashboard.css";
import {
  teacherMetrics,
  assignedStudents,
  sentRequests,
  todayClasses,
} from "../../../data/teacherDashboardMock";

const columns = [
  {
    key: "studentName",
    label: "Alumno",
  },
  {
    key: "course",
    label: "Curso",
  },
  {
    key: "subject",
    label: "Materia",
  },
  {
    key: "lastRequest",
    label: "Última solicitud",
    render: (row) => <Badge>{row.lastRequest}</Badge>,
  },
  {
    key: "action",
    label: "Acción",
    render: () => (
      <button type="button" className="teacher-dashboard-table-action">
        Solicitar intervención
      </button>
    ),
  },
];

function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <section className="teacher-dashboard">
        <div className="teacher-dashboard-metrics">
          {teacherMetrics.map((metric) => (
            <DashboardMetric
              key={metric.id}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>

        <Card className="teacher-dashboard-table-card">
          <DataTable columns={columns} rows={assignedStudents} />
        </Card>

        <div className="teacher-dashboard-bottom">
          <Card className="teacher-dashboard-panel">
            <h2>Solicitudes enviadas</h2>

            <ul className="teacher-dashboard-request-list">
              {sentRequests.map((request) => (
                <li key={request.id}>
                  <span>{request.studentName}</span>
                  <small>
                    {request.reason} · {request.status} · {request.createdAt}
                  </small>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="teacher-dashboard-panel">
            <h2>Clases de hoy</h2>

            <ul className="teacher-dashboard-class-list">
              {todayClasses.map((classItem) => (
                <li key={classItem.id}>
                  <strong>{classItem.time}</strong>
                  <span>
                    {classItem.subject} - {classItem.course}
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

export default TeacherDashboard;