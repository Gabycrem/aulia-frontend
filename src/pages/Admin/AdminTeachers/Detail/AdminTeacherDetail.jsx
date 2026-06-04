import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import DataTable from "../../../../components/DataTable/DataTable";
import Badge from "../../../../components/Badge/Badge";
import useAdminTeacherDetail from "../../../../hooks/AdminTeachers/useAdminTeacherDetail";
import "./AdminTeacherDetail.css";

const assignmentColumns = [
  {
    key: "course",
    label: "Curso",
  },
  {
    key: "subject",
    label: "Materia",
  },
  {
    key: "academicYear",
    label: "Año",
  },
];

function AdminTeacherDetail() {
  const {
    teacher,
    assignments,
    loading,
    error,
    handleBack,
    handleEdit,
    handleManageAssignments,
  } = useAdminTeacherDetail();

  return (
    <DashboardLayout role="admin">
      <section className="admin-teacher-detail">
        <PageToolbar title="Detalle docente">
          <Button type="button" onClick={handleBack}>
            Volver
          </Button>
        </PageToolbar>

        {loading && <p>Cargando docente...</p>}

        {error && <p className="admin-teacher-detail-error">{error}</p>}

        {!loading && !error && teacher && (
          <>
            <Card className="admin-teacher-detail-card">
              <div className="admin-teacher-detail-header">
                <div>
                  <h2>{teacher.teacherName}</h2>
                  <p>{teacher.email}</p>
                </div>

                <Badge variant={teacher.status === "Activo" ? "primary" : "muted"}>
                  {teacher.status}
                </Badge>
              </div>

              <div className="admin-teacher-detail-grid">
                <div>
                  <span>Usuario</span>
                  <strong>{teacher.username}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{teacher.email}</strong>
                </div>

                <div>
                  <span>Asignaciones</span>
                  <strong>{assignments.length}</strong>
                </div>
              </div>

              <div className="admin-teacher-detail-actions">
                <Button type="button" onClick={handleEdit}>
                  Editar datos
                </Button>

                <Button type="button" onClick={handleManageAssignments}>
                  Gestionar asignaciones
                </Button>
              </div>
            </Card>

            <Card className="admin-teacher-detail-card">
              <h2>Asignaciones</h2>

              <DataTable
                columns={assignmentColumns}
                rows={assignments}
                emptyMessage="Este docente no tiene asignaciones cargadas"
              />
            </Card>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminTeacherDetail;