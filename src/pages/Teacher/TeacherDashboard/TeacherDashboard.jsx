import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DashboardMetric from "../../../components/DashboardMetric/DashboardMetric";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import useTeacherDashboard from "../../../hooks/Teacher/useTeacherDashboard";
import "./TeacherDashboard.css";

function createColumns({ handleRequestIntervention }) {
  return [
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
      render: (row) => (
        <Badge variant="muted">
          {row.lastRequest || "Sin solicitud"}
        </Badge>
      ),
    },
    {
      key: "action",
      label: "Acción",
      render: (row) => (
        <Button
          type="button"
          className="teacher-dashboard-table-action"
          onClick={() => handleRequestIntervention(row.studentId || row.id)}
        >
          Solicitar intervención
        </Button>
      ),
    },
  ];
}

function TeacherDashboard() {
  const {
    metrics,
    assignedStudents,
    sentRequests,
    assignments,
    loading,
    error,
    handleRequestIntervention,
  } = useTeacherDashboard();

  const columns = createColumns({ handleRequestIntervention });

  return (
    <DashboardLayout role="teacher">
      <section className="teacher-dashboard">
        {loading && <p>Cargando dashboard...</p>}

        {error && <p className="teacher-dashboard-error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="teacher-dashboard-metrics">
              {metrics.map((metric) => (
                <DashboardMetric
                  key={metric.id}
                  title={metric.title}
                  value={metric.value}
                />
              ))}
            </div>

            <Card className="teacher-dashboard-table-card">
              <DataTable
                columns={columns}
                rows={assignedStudents}
                emptyMessage="No tenés alumnos asignados"
              />
            </Card>

            <div className="teacher-dashboard-bottom">
              <Card className="teacher-dashboard-panel">
                <h2>Solicitudes enviadas</h2>

                {sentRequests.length === 0 ? (
                  <p>No hay solicitudes enviadas.</p>
                ) : (
                  <ul className="teacher-dashboard-request-list">
                    {sentRequests.map((request) => (
                      <li key={request.id}>
                        <strong>{request.studentName}</strong>
                        <span>{request.reason}</span>
                        <small>
                          {request.status} · {request.createdAt}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              <Card className="teacher-dashboard-panel">
                <h2>Asignaciones</h2>

                {assignments.length === 0 ? (
                  <p>No hay asignaciones cargadas.</p>
                ) : (
                  <ul className="teacher-dashboard-class-list">
                    {assignments.map((assignment) => (
                      <li key={assignment.id}>
                        <strong>{assignment.subject}</strong>
                        <span>{assignment.course}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default TeacherDashboard;