import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import useAdminStudentDetail from "../../../../hooks/AdminStudents/useAdminStudentDetail";
import "./AdminStudentDetail.css";

function AdminStudentDetail() {
  const {
    student,
    loading,
    error,
    handleBack,
    handleEdit,
  } = useAdminStudentDetail();

  return (
    <DashboardLayout role="admin">
      <section className="admin-student-detail">
        <PageToolbar title="Detalle del alumno">
          <Button type="button" className="btn-secondary" onClick={handleBack}>
            Volver
          </Button>

          {student && (
            <Button type="button" className="btn-primary" onClick={handleEdit}>
              Editar
            </Button>
          )}
        </PageToolbar>
        {loading && (
          <Card className="admin-student-detail-card">
            <p>Cargando alumno...</p>
          </Card>
        )}

        {error && (
          <Card className="admin-student-detail-card">
            <p className="admin-student-detail-error">{error}</p>
          </Card>
        )}

        {!loading && !error && !student && (
          <Card className="admin-student-detail-card">
            <p>No se encontró el alumno.</p>
          </Card>
        )}

        {!loading && !error && student && (
          <Card className="admin-student-detail-card">
            <form className="admin-student-detail-form">
              <div className="admin-student-detail-section">
                <h2>Datos identificatorios</h2>

                <div className="admin-student-detail-grid">
                  <label>
                    ID alumno
                    <Input value={student.id} disabled readOnly />
                  </label>

                  <label>
                    ID usuario
                    <Input value={student.userId} disabled readOnly />
                  </label>

                  <label>
                    Nombre
                    <Input value={student.firstName} disabled readOnly />
                  </label>

                  <label>
                    Apellido
                    <Input value={student.lastName} disabled readOnly />
                  </label>
                </div>
              </div>

              <div className="admin-student-detail-section">
                <h2>Datos del alumno</h2>

                <div className="admin-student-detail-grid">
                  <label>
                    Fecha de nacimiento
                    <Input type="date" value={student.birthDate} disabled readOnly />
                  </label>

                  <label>
                    Curso
                    <Input value={`Curso ID ${student.courseId}`} disabled readOnly />
                  </label>

                  <label>
                    Consentimiento familiar
                    <Input value={student.familyConsent} disabled readOnly />
                  </label>

                  <label>
                    Estado
                    <Input value={student.active} disabled readOnly />
                  </label>
                </div>
              </div>
            </form>
          </Card>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminStudentDetail;