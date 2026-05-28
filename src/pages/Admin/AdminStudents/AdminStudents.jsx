import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import useAdminStudents from "../../../hooks/useAdminStudents";
import "./AdminStudents.css";

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
    render: () => (
      <div className="admin-students-actions">
        <button type="button">Ver</button>
        <button type="button">Editar</button>
        <button type="button">Desactivar</button>
      </div>
    ),
  },
];

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
  } = useAdminStudents();

  return (
    <DashboardLayout role="admin">
      <section className="admin-students">
        <header className="admin-students-header">
          <div>
            <h1>Gestión de alumnos</h1>
            <p>Alta, edición y administración de alumnos del sistema.</p>
          </div>

          <button type="button" className="admin-students-primary-button">
            Nuevo alumno
          </button>
        </header>

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
          <DataTable columns={columns} rows={filteredStudents} />

          {/*
          <DataTable columns={columns} rows={studentsData} />
          */}
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminStudents;