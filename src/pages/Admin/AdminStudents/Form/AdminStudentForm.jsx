import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/CustomSelect/CustomSelect";
import UserForm from "../../../../components/UserForm/UserForm";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import useAdminStudentForm from "../../../../hooks/AdminStudents/useAdminStudentForm";
import "./AdminStudentForm.css";

function AdminStudentForm() {
  const {
    isEditing,
    currentStep,

    userData,
    editUserData,
    handleUserChange,
    handleEditUserChange,
    handleContinueToStudentStep,

    studentData,
    courseOptions,
    loadingCourses,
    loadingStudent,
    loadingCurrentStudent,
    studentError,
    handleStudentChange,
    handleCourseChange,
    handleCreateStudent,
    handleUpdateStudent,

    handleCancel,
    handleBackToUserStep,
  } = useAdminStudentForm();

  if (isEditing) {
    return (
      <DashboardLayout role="admin">
        <section className="admin-student-form">
          <PageToolbar title="Editar alumno" />

          {loadingCurrentStudent && <p>Cargando alumno...</p>}

          {studentError && (
            <p className="admin-student-form-error">{studentError}</p>
          )}

          {!loadingCurrentStudent && editUserData && (
            <Card className="admin-student-form-card">
              <form onSubmit={handleUpdateStudent}>
                <h2>Datos del usuario</h2>

                <div className="admin-student-form-grid">
                  <label>
                    Usuario
                    <Input
                      name="username"
                      value={editUserData.username}
                      onChange={handleEditUserChange}
                      placeholder="Usuario"
                      disabled={loadingStudent}
                      required
                    />
                  </label>

                  <label>
                    Nombre
                    <Input
                      name="firstName"
                      value={editUserData.firstName}
                      onChange={handleEditUserChange}
                      placeholder="Nombre"
                      disabled={loadingStudent}
                      required
                    />
                  </label>

                  <label>
                    Apellido
                    <Input
                      name="lastName"
                      value={editUserData.lastName}
                      onChange={handleEditUserChange}
                      placeholder="Apellido"
                      disabled={loadingStudent}
                      required
                    />
                  </label>

                  <label>
                    Email
                    <Input
                      type="email"
                      name="email"
                      value={editUserData.email}
                      onChange={handleEditUserChange}
                      placeholder="email@ejemplo.com"
                      disabled={loadingStudent}
                      required
                    />
                  </label>

                  <label>
                    Contraseña
                    <Input
                      type="password"
                      name="password"
                      value={editUserData.password}
                      onChange={handleEditUserChange}
                      placeholder="Dejar vacío para mantener la actual"
                      disabled={loadingStudent}
                    />
                  </label>

                  <label className="admin-student-form-checkbox">
                    <input
                      type="checkbox"
                      name="active"
                      checked={editUserData.active}
                      onChange={handleEditUserChange}
                      disabled={loadingStudent}
                    />
                    Usuario activo
                  </label>
                </div>

                <div className="admin-student-form-section">
                  <h2>Datos escolares</h2>

                  <div className="admin-student-form-grid">
                    <label>
                      Fecha de nacimiento
                      <Input
                        type="date"
                        name="birthDate"
                        value={studentData.birthDate}
                        onChange={handleStudentChange}
                        disabled={loadingStudent}
                        required
                      />
                    </label>

                    <label>
                      Curso
                      <Select
                        options={courseOptions}
                        placeholder={
                          loadingCourses ? "Cargando cursos..." : "Seleccionar curso"
                        }
                        value={studentData.courseId}
                        onChange={handleCourseChange}
                        disabled={loadingCourses || loadingStudent}
                      />
                    </label>

                    <label className="admin-student-form-checkbox">
                      <input
                        type="checkbox"
                        name="familyConsent"
                        checked={studentData.familyConsent}
                        onChange={handleStudentChange}
                        disabled={loadingStudent}
                      />
                      Tiene consentimiento familiar para usar la app
                    </label>
                  </div>
                </div>

                <div className="admin-student-form-actions">
                  <Button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={loadingStudent || loadingCourses}
                  >
                    {loadingStudent ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </section>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <section className="admin-student-form">
        <PageToolbar title="Nuevo alumno" />

        {/* <p className="admin-student-form-description">
          {currentStep === 1
            ? "Primero completá los datos de acceso del alumno."
            : "Ahora completá los datos escolares del alumno."}
        </p> */}

        <div className="admin-student-form-steps">
          <span className={currentStep === 1 ? "step-active" : ""}>
            1. Usuario
          </span>
          <span className={currentStep === 2 ? "step-active" : ""}>
            2. Alumno
          </span>
        </div>

        {currentStep === 1 && (
          <>
            {studentError && (
              <p className="admin-student-form-error">{studentError}</p>
            )}

            <UserForm
              mode="create"
              title="Datos de acceso"
              description="Completá los datos del usuario que usará el alumno para ingresar al sistema."
              userData={userData}
              loading={false}
              submitLabel="Continuar"
              onChange={handleUserChange}
              onSubmit={handleContinueToStudentStep}
              onCancel={handleCancel}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            {studentError && (
              <p className="admin-student-form-error">{studentError}</p>
            )}

            <Card className="admin-student-form-card">
              <form onSubmit={handleCreateStudent}>
                <h2>Datos del alumno</h2>
                <div className="admin-student-form-grid">
                  <label>
                    Fecha de nacimiento
                    <Input
                      type="date"
                      name="birthDate"
                      value={studentData.birthDate}
                      onChange={handleStudentChange}
                      disabled={loadingStudent}
                      required
                    />
                  </label>

                  <label>
                    Curso
                    <Select
                      options={courseOptions}
                      placeholder={
                        loadingCourses ? "Cargando cursos..." : "Seleccionar curso"
                      }
                      value={studentData.courseId}
                      onChange={handleCourseChange}
                      disabled={loadingCourses || loadingStudent}
                    />
                  </label>

                  <label className="admin-student-form-checkbox">
                    <input
                      type="checkbox"
                      name="familyConsent"
                      checked={studentData.familyConsent}
                      onChange={handleStudentChange}
                      disabled={loadingStudent}
                    />
                    Tiene consentimiento familiar para usar la app
                  </label>
                </div>

                <div className="admin-student-form-actions">
                  <Button
                    type="button"
                    className="btn-secondary"
                    onClick={handleBackToUserStep}
                  >
                    Volver
                  </Button>

                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={loadingStudent || loadingCourses}
                  >
                    {loadingStudent ? "Guardando..." : "Crear alumno"}
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminStudentForm;