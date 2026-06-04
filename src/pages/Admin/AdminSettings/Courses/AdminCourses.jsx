import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/CustomSelect/CustomSelect";
import DataTable from "../../../../components/DataTable/DataTable";
import Badge from "../../../../components/Badge/Badge";
import {
  courseLevelOptions,
  schoolGradeOptions,
} from "../../../../data/courseCatalog";
import useAdminCourses from "../../../../hooks/AdminSettings/useAdminCourses";
import "./AdminCourses.css";

function createColumns({ selectedCourseId, handleSelectCourse }) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedCourse"
          checked={selectedCourseId === row.id}
          onChange={() => handleSelectCourse(row.id)}
        />
      ),
    },
    {
      key: "academicYear",
      label: "Año académico",
    },
    {
      key: "level",
      label: "Nivel",
    },
    {
      key: "grade",
      label: "Grado",
    },
    {
      key: "division",
      label: "División",
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

function AdminCourses() {
  const {
    courseData,
    filteredCourses,
    selectedCourseId,
    selectedCourse,
    searchTerm,
    setSearchTerm,

    loading,
    saving,
    deletingId,
    error,

    handleCourseChange,
    handleLevelChange,
    handleGradeChange,
    handleSelectCourse,
    handleClearForm,
    handleSubmit,
    handleDeactivateCourse,
  } = useAdminCourses();

  const columns = createColumns({
    selectedCourseId,
    handleSelectCourse,
  });

  return (
    <DashboardLayout role="admin">
      <section className="admin-courses">
        <PageToolbar title="Cursos" />

        {error && <p className="admin-courses-error">{error}</p>}

        <Card className="admin-courses-form-card">
          <form onSubmit={handleSubmit}>
            <h2>Nuevo curso</h2>

            <div className="admin-courses-form-grid">
              <label>
                Año académico
                <Input
                  type="number"
                  name="academicYear"
                  value={courseData.academicYear}
                  onChange={handleCourseChange}
                  disabled={saving}
                  required
                />
              </label>

              <label>
                Nivel
                <Select
                  options={courseLevelOptions}
                  placeholder="Seleccionar nivel"
                  value={courseData.level}
                  onChange={handleLevelChange}
                  disabled={saving}
                />
              </label>

              <label>
                Grado
                <Select
                  options={schoolGradeOptions}
                  placeholder="Seleccionar grado"
                  value={courseData.grade}
                  onChange={handleGradeChange}
                  disabled={saving}
                />
              </label>

              <label>
                División
                <Input
                  name="division"
                  placeholder="Ej: A"
                  value={courseData.division}
                  onChange={handleCourseChange}
                  disabled={saving}
                  required
                />
              </label>
            </div>

            <div className="admin-courses-form-actions">
              <Button
                type="button"
                className="btn-secondary admin-courses-form-button"
                onClick={handleClearForm}
              >
                Limpiar
              </Button>

              <Button 
              type="submit" 
              className="admin-courses-form-button"
              disabled={saving}>
                {saving ? "Guardando..." : "Crear curso"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="admin-courses-filters-card">
          <label className="admin-courses-search">
            Buscar curso
            <Input
              placeholder="Buscar por año, nivel, grado o división..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </Card>

        <Card className="admin-courses-table-card">
          {loading && <p>Cargando cursos...</p>}

          {!loading && (
            <div className="admin-courses-table-scroll">
              <DataTable
                columns={columns}
                rows={filteredCourses}
                emptyMessage="No hay cursos cargados"
              />
            </div>
          )}
        </Card>

        <Card className="admin-courses-context-card">
          <div className="admin-courses-selected">
            {selectedCourse ? (
              <>
                Curso seleccionado:{" "}
                <strong>
                  {selectedCourse.grade} {selectedCourse.division} -{" "}
                  {selectedCourse.level}
                </strong>
              </>
            ) : (
              "Seleccioná un curso para habilitar acciones."
            )}
          </div>

          <div className="admin-courses-context-actions">
            <Button
              type="button"
              disabled={!selectedCourse || deletingId === selectedCourseId}
              onClick={handleDeactivateCourse}
            >
              {deletingId === selectedCourseId ? "Desactivando..." : "Desactivar"}
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminCourses;