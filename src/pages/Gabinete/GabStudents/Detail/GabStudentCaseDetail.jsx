import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Badge from "../../../../components/Badge/Badge";
import useGabStudentCaseDetail from "../../../../hooks/Gabinete/useGabStudentCaseDetail";
import "./GabStudentCaseDetail.css";

function DetailField({ label, value }) {
  return (
    <div className="gab-case-detail-field">
      <span>{label}</span>
      <p>{value || "-"}</p>
    </div>
  );
}

function GabStudentCaseDetail() {
  const {
    student,
    caseFile,
    interventions,
    loading,
    error,
    creatingCaseFile,
    caseFileError,
    handleCreateCaseFile,
    handleBack,
    handleCreateIntervention,
  } = useGabStudentCaseDetail();

  return (
    <DashboardLayout role="gab">
      <section className="gab-case-detail">
        <PageToolbar title="Detalle del caso">
          <Button type="button" className="btn-secondary" onClick={handleBack}>
            Volver
          </Button>

          {caseFile && (
            <Button
              type="button"
              className="btn-primary"
              onClick={handleCreateIntervention}
            >
              Registrar intervención
            </Button>
          )}
        </PageToolbar>

        {loading && (
          <Card className="gab-case-detail-card">
            <p>Cargando caso...</p>
          </Card>
        )}

        {error && (
          <Card className="gab-case-detail-card">
            <p className="gab-case-detail-error">{error}</p>
          </Card>
        )}

        {!loading && !error && student && (
          <>
            <Card className="gab-case-detail-card">
              <div className="gab-case-detail-section-header">
                <h2>Datos del alumno</h2>
                <Badge variant={student.active ? "primary" : "muted"}>
                  {student.status}
                </Badge>
              </div>

              <div className="gab-case-detail-grid">
                <DetailField label="Alumno" value={student.studentName} />
                <DetailField label="Curso" value={student.course} />
                <DetailField
                  label="Fecha de nacimiento"
                  value={student.birthDate}
                />
                <DetailField
                  label="Consentimiento familiar"
                  value={student.familyConsent}
                />
              </div>
            </Card>

            {!caseFile && (
              <Card className="gab-case-detail-card">
                <div className="gab-case-detail-section-header">
                  <h2>Legajo / Caso</h2>
                  <Badge variant="muted">Sin legajo</Badge>
                </div>

                <div className="gab-case-detail-empty-state">
                  <p>
                    Este alumno todavía no tiene un legajo abierto. Para
                    registrar intervenciones o hacer seguimiento, primero creá
                    el legajo.
                  </p>

                  {caseFileError && (
                    <p className="gab-case-detail-error">{caseFileError}</p>
                  )}

                  <Button
                    type="button"
                    className="btn-primary"
                    onClick={handleCreateCaseFile}
                    disabled={creatingCaseFile}
                  >
                    {creatingCaseFile ? "Creando legajo..." : "Crear legajo"}
                  </Button>
                </div>
              </Card>
            )}

            {caseFile && (
              <>
                <Card className="gab-case-detail-card">
                  <div className="gab-case-detail-section-header">
                    <h2>Legajo / Caso</h2>
                    <Badge
                      variant={
                        caseFile.status === "Abierto" ? "primary" : "muted"
                      }
                    >
                      {caseFile.status}
                    </Badge>
                  </div>

                  <div className="gab-case-detail-grid">
                    <DetailField label="Estado" value={caseFile.status} />
                    <DetailField label="Prioridad" value={caseFile.priority} />
                    <DetailField label="Apertura" value={caseFile.createdAt} />
                    <DetailField
                      label="Última actualización"
                      value={caseFile.updatedAt}
                    />
                  </div>
                </Card>

                <Card className="gab-case-detail-card">
                  <div className="gab-case-detail-section-header">
                    <h2>Intervenciones</h2>
                    <span>{interventions.length} registradas</span>
                  </div>

                  {interventions.length === 0 ? (
                    <p>No hay intervenciones registradas para este caso.</p>
                  ) : (
                    <ul className="gab-case-detail-list">
                      {interventions.map((intervention) => (
                        <li key={intervention.id}>
                          <strong>{intervention.title}</strong>
                          <span>
                            {intervention.type} ·{" "}
                            {intervention.interventionDate}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </>
            )}
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default GabStudentCaseDetail;