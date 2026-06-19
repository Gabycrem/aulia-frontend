import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Badge from "../../../../components/Badge/Badge";
import useAdminTeachers from "../../../../hooks/AdminTeachers/useAdminTeachers";
import "./AdminTeachers.css";

function createColumns({
  selectedTeacherId,
  handleSelectTeacher,
}) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedTeacher"
          checked={selectedTeacherId === row.id}
          onChange={() => handleSelectTeacher(row.id)}
        />
      ),
    },
    {
      key: "teacherName",
      label: "Docente",
    },
    {
      key: "username",
      label: "Usuario",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "assignmentCount",
      label: "Asignaciones",
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

function AdminTeachers() {
  const {
    searchTerm,
    setSearchTerm,

    filteredTeachers,
    selectedTeacherId,
    selectedTeacher,

    loading,
    error,

    handleSelectTeacher,
    handleCreateTeacher,
    handleViewTeacher,
    handleEditTeacher,
    handleManageAssignments,
  } = useAdminTeachers();

  const columns = createColumns({
    selectedTeacherId,
    handleSelectTeacher,
  });

  const hasSelectedTeacher = Boolean(selectedTeacher);

  return (
    <DashboardLayout role="admin">
      <section className="admin-teachers">
        <PageToolbar title="Gestión de docentes">
          <Button
            type="button"
            className="admin-teachers-primary-button"
            onClick={handleCreateTeacher}
          >
            Nuevo docente
          </Button>
        </PageToolbar>

        <Card className="admin-teachers-filters-card">
          <label className="admin-teachers-search">
            Buscar docente
            <Input
              placeholder="Buscar por nombre, usuario o email..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </Card>

        <Card className="admin-teachers-table-card">
          {loading && <p>Cargando docentes...</p>}

          {error && <p className="admin-teachers-error">{error}</p>}

          {!loading && !error && (
            <DataTable
              columns={columns}
              rows={filteredTeachers}
              emptyMessage="No hay docentes cargados"
            />
          )}
        </Card>

        <Card className="admin-teachers-context-card">
          <div className="admin-teachers-selected">
            {selectedTeacher ? (
              <>
                Docente seleccionado:{" "}
                <strong>{selectedTeacher.teacherName}</strong>
              </>
            ) : (
              "Seleccioná un docente para habilitar acciones."
            )}
          </div>

          <div className="admin-teachers-context-actions">
            <Button
              type="button"
              disabled={!hasSelectedTeacher}
              onClick={handleViewTeacher}
            >
              Ver detalle
            </Button>

            <Button
              type="button"
              disabled={!hasSelectedTeacher}
              onClick={handleEditTeacher}
            >
              Editar
            </Button>

            <Button
              type="button"
              disabled={!hasSelectedTeacher}
              onClick={handleManageAssignments}
            >
              Gestionar asignaciones
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminTeachers;