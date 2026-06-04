import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import DataTable from "../../../../components/DataTable/DataTable";
import useAdminSubjects from "../../../../hooks/AdminSettings/useAdminSubjects";
import "./AdminSubjects.css";

function createColumns({ selectedSubjectId, handleSelectSubject }) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedSubject"
          checked={selectedSubjectId === row.id}
          onChange={() => handleSelectSubject(row.id)}
        />
      ),
    },
    {
      key: "name",
      label: "Materia",
    },
  ];
}

function AdminSubjects() {
  const {
    subjectData,
    filteredSubjects,
    selectedSubjectId,
    selectedSubject,
    searchTerm,
    setSearchTerm,

    loading,
    saving,
    deletingId,
    error,
    isEditing,

    handleSubjectChange,
    handleSelectSubject,
    handleClearSelection,
    handleSubmit,
    handleDeleteSubject,
  } = useAdminSubjects();

  const columns = createColumns({
    selectedSubjectId,
    handleSelectSubject,
  });

  return (
    <DashboardLayout role="admin">
      <section className="admin-subjects">
        <PageToolbar title="Materias" />

        {error && <p className="admin-subjects-error">{error}</p>}

        <Card className="admin-subjects-form-card">
          <form onSubmit={handleSubmit}>
            <h2>{isEditing ? "Editar materia" : "Nueva materia"}</h2>

            <div className="admin-subjects-form-grid">
              <label>
                Nombre
                <Input
                  name="name"
                  placeholder="Ej: Matemática"
                  value={subjectData.name}
                  onChange={handleSubjectChange}
                  disabled={saving}
                  required
                />
              </label>
            </div>

            <div className="admin-subjects-form-actions">
              {isEditing && (
                <Button
                  type="button"
                  className="btn-secondary admin-subjects-form-button"
                  onClick={handleClearSelection}
                >
                  Cancelar edición
                </Button>
              )}

              <Button type="submit" className="admin-subjects-form-button" disabled={saving}>
                {saving
                  ? "Guardando..."
                  : isEditing
                    ? "Guardar cambios"
                    : "Crear materia"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="admin-subjects-filters-card">
          <label className="admin-subjects-search">
            Buscar materia
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </Card>

        <Card className="admin-subjects-table-card">
          {loading && <p>Cargando materias...</p>}

          {!loading && (
            <div className="admin-subjects-table-scroll">
              <DataTable
                columns={columns}
                rows={filteredSubjects}
                emptyMessage="No hay materias cargadas"
              />
            </div>
          )}
        </Card>

        <Card className="admin-subjects-context-card">
          <div className="admin-subjects-selected">
            {selectedSubject ? (
              <>
                Materia seleccionada: <strong>{selectedSubject.name}</strong>
              </>
            ) : (
              "Seleccioná una materia para habilitar acciones."
            )}
          </div>

          <div className="admin-subjects-context-actions">
            <Button
              type="button"
              disabled={!selectedSubject || deletingId === selectedSubjectId}
              onClick={handleDeleteSubject}
            >
              {deletingId === selectedSubjectId ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminSubjects;