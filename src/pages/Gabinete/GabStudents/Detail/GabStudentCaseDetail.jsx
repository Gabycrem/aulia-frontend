import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Badge from "../../../../components/Badge/Badge";
import useGabStudentCaseDetail from "../../../../hooks/Gabinete/useGabStudentCaseDetail";
import "./GabStudentCaseDetail.css";

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

    const user = student?.User || student?.user;

    const studentName = student
        ? `${user?.firstName || student.firstName || ""} ${user?.lastName || student.lastName || ""
            }`.trim()
        : "";

    const courseLabel = student?.Course
        ? `${student.Course.grade} ${student.Course.division}`
        : student?.course
            ? `${student.course.grade} ${student.course.division}`
            : student?.courseId
                ? `Curso ID ${student.courseId}`
                : "Sin curso";

    return (
        <DashboardLayout role="gab">
            <section className="gab-case-detail">
                <header className="gab-case-detail-header">
                    <div>
                        <h1>Detalle del caso</h1>
                        <p>Legajo y seguimiento del alumno seleccionado.</p>
                    </div>

                    <div className="gab-case-detail-actions">
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
                    </div>
                </header>

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
                                    {student.active ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>

                            <div className="gab-case-detail-grid">
                                <div className="gab-case-detail-field">
                                    <span>Alumno</span>
                                    <p>{studentName || "Sin nombre"}</p>
                                </div>

                                <div className="gab-case-detail-field">
                                    <span>ID alumno</span>
                                    <p>{student.id}</p>
                                </div>

                                <div className="gab-case-detail-field">
                                    <span>Fecha de nacimiento</span>
                                    <p>{student.birthDate || "-"}</p>
                                </div>

                                <div className="gab-case-detail-field">
                                    <span>Consentimiento familiar</span>
                                    <p>{student.familyConsent ? "Sí" : "No"}</p>
                                </div>

                                <div className="gab-case-detail-field">
                                    <span>Curso</span>
                                    <p>{courseLabel}</p>
                                </div>
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
                                        Este alumno todavía no tiene un legajo abierto. Para registrar
                                        intervenciones o hacer seguimiento, primero creá el legajo.
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
                                            {caseFile.status || "Sin estado"}
                                        </Badge>
                                    </div>

                                    <div className="gab-case-detail-grid">
                                        <div className="gab-case-detail-field">
                                            <span>ID caso</span>
                                            <p>{caseFile.id}</p>
                                        </div>

                                        <div className="gab-case-detail-field">
                                            <span>Prioridad</span>
                                            <p>{caseFile.priority || "-"}</p>
                                        </div>

                                        <div className="gab-case-detail-field">
                                            <span>Creado</span>
                                            <p>{caseFile.createdAt || "-"}</p>
                                        </div>

                                        <div className="gab-case-detail-field">
                                            <span>Última actualización</span>
                                            <p>{caseFile.updatedAt || "-"}</p>
                                        </div>
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
                                                    <strong>
                                                        {intervention.title || "Intervención sin título"}
                                                    </strong>
                                                    <span>
                                                        {intervention.type || "-"} ·{" "}
                                                        {intervention.interventionDate || "-"}
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