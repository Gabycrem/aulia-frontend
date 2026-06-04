import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import useTeacherReferralForm from "../../../hooks/Teacher/useTeacherReferralForm";
import "./TeacherReferral.css";

function TeacherReferral() {
  const {
    students,
    referralCategories,
    selectedStudent,
    formData,
    loadingStudents,
    submitting,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useTeacherReferralForm();

  return (
    <DashboardLayout role="teacher">
      <section className="teacher-referral">
        <PageToolbar title="Solicitar intervención" />

        <p className="teacher-referral-description">
          Enviá una derivación al equipo de gabinete para iniciar el seguimiento.
        </p>

        <Card className="teacher-referral-card">
          <form className="teacher-referral-form" onSubmit={handleSubmit}>
            <div className="teacher-referral-grid">
              <label className="teacher-referral-field">
                Alumno
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  disabled={loadingStudents || submitting}
                  required
                >
                  <option value="">
                    {loadingStudents ? "Cargando alumnos..." : "Seleccionar alumno"}
                  </option>

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.course}
                    </option>
                  ))}
                </select>
              </label>

              <label className="teacher-referral-field">
                Categoría
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                >
                  <option value="">Seleccionar categoría</option>

                  {referralCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedStudent && (
              <p className="teacher-referral-selected">
                Alumno seleccionado: <strong>{selectedStudent.name}</strong>
              </p>
            )}

            <label className="teacher-referral-field">
              Descripción
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describí la situación observada, antecedentes relevantes y motivo de la solicitud."
                rows="8"
                disabled={submitting}
                required
              />
            </label>

            {error && <p className="teacher-referral-error">{error}</p>}

            {successMessage && (
              <p className="teacher-referral-success">{successMessage}</p>
            )}

            <div className="teacher-referral-actions">
              <Button
                type="button"
                className="teacher-referral-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={submitting || loadingStudents}>
                {submitting ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default TeacherReferral;