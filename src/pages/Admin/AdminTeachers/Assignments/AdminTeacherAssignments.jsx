import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/CustomSelect/CustomSelect";
import DataTable from "../../../../components/DataTable/DataTable";
import useAdminTeacherAssignments from "../../../../hooks/AdminTeachers/useAdminTeacherAssignments";
import "./AdminTeacherAssignments.css";

function createColumns({ deletingId, handleDeleteAssignment }) {
  return [
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
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <Button
          type="button"
          className="admin-teacher-assignments-delete"
          disabled={deletingId === row.id}
          onClick={() => handleDeleteAssignment(row.id)}
        >
          {deletingId === row.id ? "Eliminando..." : "Eliminar"}
        </Button>
      ),
    },
  ];
}

function AdminTeacherAssignments() {
  const {
    teacher,
    assignments,
    courseOptions,
    subjectOptions,
    assignmentData,

    loading,
    saving,
    deletingId,
    error,

    handleAssignmentChange,
    handleCourseChange,
    handleSubjectChange,
    handleSaveAssignment,
    handleDeleteAssignment,
    handleBack,
  } = useAdminTeacherAssignments();

  const columns = createColumns({
    deletingId,
    handleDeleteAssignment,
  });

  return (
    <DashboardLayout role="admin">
      <section className="admin-teacher-assignments">
        <PageToolbar title="Asignaciones docentes">
          <Button type="button" onClick={handleBack}>
            Volver
          </Button>
        </PageToolbar>

        {loading && <p>Cargando asignaciones...</p>}

        {error && <p className="admin-teacher-assignments-error">{error}</p>}

        {!loading && teacher && (
          <>
            <Card className="admin-teacher-assignments-summary">
              <h2>{teacher.teacherName}</h2>
              <p>
                {teacher.username} - {teacher.email}
              </p>
            </Card>

            <Card className="admin-teacher-assignments-form-card">
              <form onSubmit={handleSaveAssignment}>
                <h2>Nueva asignación</h2>

                <div className="admin-teacher-assignments-grid">
                  <label>
                    Año académico
                    <Input
                      type="number"
                      name="academicYear"
                      value={assignmentData.academicYear}
                      onChange={handleAssignmentChange}
                      disabled={saving}
                      required
                    />
                  </label>

                  <label>
                    Curso
                    <Select
                      options={courseOptions}
                      placeholder="Seleccionar curso"
                      value={assignmentData.courseId}
                      onChange={handleCourseChange}
                      disabled={saving}
                    />
                  </label>

                  <label>
                    Materia
                    <Select
                      options={subjectOptions}
                      placeholder="Seleccionar materia"
                      value={assignmentData.subjectId}
                      onChange={handleSubjectChange}
                      disabled={saving}
                    />
                  </label>
                </div>

                <div className="admin-teacher-assignments-actions">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Guardando..." : "Agregar asignación"}
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="admin-teacher-assignments-table-card">
              <h2>Asignaciones cargadas</h2>

              <DataTable
                columns={columns}
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

export default AdminTeacherAssignments;