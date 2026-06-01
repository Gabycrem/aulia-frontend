import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import Badge from "../../../../components/Badge/Badge";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import useAdminStudents from "../../../../hooks/AdminStudents/useAdminStudents";
import "./AdminStudents.css";

function createColumns({
  handleViewStudent,
  handleEditStudent,
}) {
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
    {
      key: "action",
      label: "Acciones",
      render: (row) => (
        <div className="admin-students-actions">
          <button type="button" onClick={() => handleViewStudent(row.id)}>
            Ver
          </button>

          <button type="button" onClick={() => handleEditStudent(row.id)}>
            Editar
          </button>

          <button type="button">
            Desactivar
          </button>
        </div>
      ),
    },
  ];
}

function AdminStudents() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCourse,
    setSelectedCourse,
    selectedStatus,
    setSelectedStatus,
    courseOptions,
    statusOptions,
    filteredStudents,
    handleCreateStudent,
    handleViewStudent,
    handleEditStudent,
    loading,
    error,
  } = useAdminStudents();

  const columns = createColumns({
    handleViewStudent,
    handleEditStudent,
  });

  return (
    <DashboardLayout role="admin">
      <section className="admin-students">
        <PageToolbar title="Gestión de alumnos">
          <button
            type="button"
            className="admin-students-primary-button"
            onClick={handleCreateStudent}
          >
            Nuevo alumno
          </button>
        </PageToolbar>

        <Card className="admin-students-filters-card">
          <div className="admin-students-filters">
            <label>
              Buscar alumno
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label>
              Curso
              <select
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value)}
              >
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Estado
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Card>

        <Card className="admin-students-table-card">
          {loading && <p>Cargando alumnos...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && (
            <DataTable
              columns={columns}
              rows={filteredStudents}
            />
          )}
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminStudents;