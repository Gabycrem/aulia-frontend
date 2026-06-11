import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import Select from "../../../components/CustomSelect/CustomSelect";
import useTeacherStudents from "../../../hooks/Teacher/useTeacherStudents";
import "./TeacherStudents.css";

function createColumns({ handleRequestIntervention }) {
  return [
    { key: "studentName", label: "Alumno" },
    { key: "course", label: "Curso" },
    { key: "subject", label: "Materia" },
    {
      key: "lastRequest",
      label: "Última solicitud",
      render: (row) => <Badge>{row.lastRequest}</Badge>,
    },
    {
      key: "action",
      label: "Acción",
      render: (row) => (
        <Button
          type="button"
          className="teacher-students-action"
          onClick={() => handleRequestIntervention(row.studentId || row.id)}
        >
          Solicitar intervención
        </Button>
      ),
    },
  ];
}

function TeacherStudents() {
  const {
    selectedCourse,
    selectedSubject,
    courseOptions,
    subjectOptions,
    filteredStudents,
    loading,
    error,
    handleCourseChange,
    handleSubjectChange,
    handleRequestIntervention,
  } = useTeacherStudents();

  const columns = createColumns({ handleRequestIntervention });

  return (
    <DashboardLayout role="teacher">
      <section className="teacher-students">
        <PageToolbar title="Mis alumnos" />

        <Card className="teacher-students-filters-card">
          <div className="teacher-students-filters">
            <label>
              Curso
              <Select
                options={courseOptions}
                placeholder="Todos los cursos"
                value={selectedCourse}
                onChange={handleCourseChange}
                allowEmpty
              />
            </label>

            <label>
              Materia
              <Select
                options={subjectOptions}
                placeholder="Todas las materias"
                value={selectedSubject}
                onChange={handleSubjectChange}
                allowEmpty
              />
            </label>
          </div>
        </Card>

        <Card className="teacher-students-card">
          {loading && <p>Cargando alumnos...</p>}

          {error && <p className="teacher-students-error">{error}</p>}

          {!loading && !error && (
            <DataTable
              columns={columns}
              rows={filteredStudents}
              emptyMessage="No tenés alumnos asignados"
            />
          )}
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default TeacherStudents;