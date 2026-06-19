import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/CustomSelect/CustomSelect";
import useGabNewCase from "../../../../hooks/Gabinete/useGabNewCase";
import "./GabNewCase.css";

function GabNewCase() {
  const {
    studentOptions,
    selectedStudentId,
    loadingStudents,
    saving,
    error,
    existingCaseStudentId,
    handleStudentChange,
    handleSubmit,
    handleViewExistingCase,
    handleCancel,
  } = useGabNewCase();

  return (
    <DashboardLayout role="gab">
      <section className="gab-new-case">
        <PageToolbar title="Nuevo caso">
          <Button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={saving}
          >
            Volver
          </Button>
        </PageToolbar>

        {error && <p className="gab-new-case-error">{error}</p>}

        <Card className="gab-new-case-card">
          <form onSubmit={handleSubmit}>
            <label className="gab-new-case-field">
              Alumno
              <Select
                options={studentOptions}
                placeholder={
                  loadingStudents ? "Cargando alumnos..." : "Seleccionar alumno"
                }
                value={selectedStudentId}
                onChange={handleStudentChange}
                disabled={loadingStudents || saving}
              />
            </label>

            <div className="gab-new-case-actions">
              {existingCaseStudentId && (
                <Button
                  type="button"
                  className="btn-secondary"
                  onClick={handleViewExistingCase}
                  disabled={saving}
                >
                  Ver caso existente
                </Button>
              )}

              <Button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={saving || loadingStudents}
              >
                {saving ? "Creando..." : "Crear caso"}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default GabNewCase;