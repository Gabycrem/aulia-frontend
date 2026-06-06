import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/CustomSelect/CustomSelect";
import useGabInterventionForm from "../../../../hooks/Gabinete/useGabInterventionForm";
import "./GabInterventionForm.css";

function GabInterventionForm() {
  const {
    student,
    studentOptions,
    interventionData,
    interventionTypeOptions,
    hasPreselectedStudent,
    loading,
    saving,
    error,
    handleStudentChange,
    handleInterventionChange,
    handleTypeChange,
    handleSubmit,
    handleCancel,
  } = useGabInterventionForm();

  return (
    <DashboardLayout role="gab">
      <section className="gab-intervention-form">
        <PageToolbar title="Registrar intervención" />

        {loading && <p>Cargando datos...</p>}
        {error && <p className="gab-intervention-form-error">{error}</p>}

        {!loading && (
          <Card className="gab-intervention-form-card">
            <form onSubmit={handleSubmit}>
              {hasPreselectedStudent ? (
                <div className="gab-intervention-form-student">
                  Alumno: <strong>{student?.studentName}</strong>
                </div>
              ) : (
                <label className="gab-intervention-form-student-select">
                  Alumno
                  <Select
                    options={studentOptions}
                    placeholder="Seleccionar alumno"
                    value={interventionData.studentId}
                    onChange={handleStudentChange}
                    disabled={saving}
                  />
                </label>
              )}

              <div className="gab-intervention-form-grid">
                <label>
                  Título
                  <Input name="title" value={interventionData.title} onChange={handleInterventionChange} disabled={saving} />
                </label>

                <label>
                  Tipo
                  <Select options={interventionTypeOptions} placeholder="Seleccionar tipo" value={interventionData.type} onChange={handleTypeChange} disabled={saving} />
                </label>

                <label>
                  Fecha y hora
                  <Input type="datetime-local" name="interventionDate" value={interventionData.interventionDate} onChange={handleInterventionChange} disabled={saving} />
                </label>

                <label className="gab-intervention-form-full">
                  Descripción
                  <textarea name="description" value={interventionData.description} onChange={handleInterventionChange} disabled={saving} />
                </label>
              </div>

              <div className="gab-intervention-form-actions">
                <Button type="button" className="btn-secondary" onClick={handleCancel} disabled={saving}>
                  Cancelar
                </Button>

                <Button type="submit" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar intervención"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </section>
    </DashboardLayout>
  );
}

export default GabInterventionForm;