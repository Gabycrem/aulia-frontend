import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import Badge from "../../../../components/Badge/Badge";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/CustomSelect/CustomSelect";
import useAdminStudents from "../../../../hooks/AdminStudents/useAdminStudents";
import "./AdminStudents.css";

function createColumns({
  selectedStudentId,
  handleSelectStudent,
}) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedStudent"
          checked={selectedStudentId === row.id}
          onChange={() => handleSelectStudent(row.id)}
        />
      ),
    },
    {
      key: "studentName",
      label: "Alumno",
    },
    {
      key: "course",
      label: "Curso",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "familyConsent",
      label: "Consentimiento",
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <Badge variant={row.status === "Activo" ? "primary" : "muted"}>
          {row.status}
        </Badge>
      ),
    },
  ];
}

function mapFilterOptions(options) {
  return options.map((option) => ({
    id: option,
    value: option,
    label: option,
  }));
}

function AdminStudents() {
  const {
    searchTerm,
    setSearchTerm,

    selectedCourse,
    setSelectedCourse,

    selectedStatus,
    setSelectedStatus,

    selectedStudentId,
    selectedStudent,

    courseOptions,
    statusOptions,

    filteredStudents,

    loading,
    error,

    handleSelectStudent,
    handleCreateStudent,
    handleViewStudent,
    handleEditStudent,
  } = useAdminStudents();

  const columns = createColumns({
    selectedStudentId,
    handleSelectStudent,
  });

  const hasSelectedStudent = Boolean(selectedStudent);

  return (
    <DashboardLayout role="admin">
      <section className="admin-students">
        <PageToolbar title="Gestión de alumnos">
          <Button
            type="button"
            className="admin-students-primary-button"
            onClick={handleCreateStudent}
          >
            Nuevo alumno
          </Button>
        </PageToolbar>

        <Card className="admin-students-filters-card">
          <div className="admin-students-filters">
            <label>
              Buscar alumno
              <Input
                placeholder="Buscar por nombre, email o curso..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label>
              Curso
              <Select
                options={mapFilterOptions(courseOptions)}
                value={selectedCourse}
                placeholder="Seleccionar curso"
                onChange={(option) => setSelectedCourse(option.value)}
              />
            </label>

            <label>
              Estado
              <Select
                options={mapFilterOptions(statusOptions)}
                value={selectedStatus}
                placeholder="Seleccionar estado"
                onChange={(option) => setSelectedStatus(option.value)}
              />
            </label>
          </div>
        </Card>

        <Card className="admin-students-table-card">
          {loading && <p>Cargando alumnos...</p>}

          {error && <p className="admin-students-error">{error}</p>}

          {!loading && !error && (
            <div className="admin-students-table-scroll">
              <DataTable
                columns={columns}
                rows={filteredStudents}
                emptyMessage="No hay alumnos cargados"
              />
            </div>
          )}
        </Card>

        <Card className="admin-students-context-card">
          <div className="admin-students-selected">
            {selectedStudent ? (
              <>
                Alumno seleccionado:{" "}
                <strong>{selectedStudent.studentName}</strong>
              </>
            ) : (
              "Seleccioná un alumno para habilitar acciones."
            )}
          </div>

          <div className="admin-students-context-actions">
            <Button
              type="button"
              disabled={!hasSelectedStudent}
              onClick={handleViewStudent}
            >
              Ver detalle
            </Button>

            <Button
              type="button"
              disabled={!hasSelectedStudent}
              onClick={handleEditStudent}
            >
              Editar
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminStudents;