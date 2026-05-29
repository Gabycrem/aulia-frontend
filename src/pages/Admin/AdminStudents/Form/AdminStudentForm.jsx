import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/CustomSelect/CustomSelect";
import UserForm from "../../../../components/UserForm/UserForm";
import useAdminStudentForm from "../../../../hooks/AdminStudents/useAdminStudentForm";
import "./AdminStudentForm.css";

function AdminStudentForm() {
  const {
    currentStep,

    userData,
    createdUser,
    loadingUser,
    userError,
    handleUserChange,
    handleCreateUser,

    studentData,
    courseOptions,
    loadingStudent,
    studentError,
    handleStudentChange,
    handleCourseChange,
    handleCreateStudent,

    handleCancel,
    handleBackToUserStep,
  } = useAdminStudentForm();

  return (
    <DashboardLayout role="admin">
      <section className="admin-student-form">
        <header className="admin-student-form-header">
          <div>
            <h1>Nuevo alumno</h1>
            <p>
              {currentStep === 1
                ? "Primero creá el usuario del alumno."
                : "Ahora completá los datos escolares del alumno."}
            </p>
          </div>
        </header>

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
            {userError && (
              <p className="admin-student-form-error">{userError}</p>
            )}

            <UserForm
              title="Datos de acceso"
              description="Completá los datos del usuario que usará el alumno para ingresar al sistema."
              userData={userData}
              loading={loadingUser}
              submitLabel="Continuar"
              onChange={handleUserChange}
              onSubmit={handleCreateUser}
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

                <div className="admin-student-form-created-user">
                  Usuario creado:{" "}
                  <strong>
                    {createdUser?.firstName} {createdUser?.lastName}
                  </strong>
                </div>

                <div className="admin-student-form-grid">
                  <label>
                    Fecha de nacimiento
                    <Input
                      type="date"
                      name="birthDate"
                      value={studentData.birthDate}
                      onChange={handleStudentChange}
                    />
                  </label>

                  <label>
                    Curso
                    <Select
                      options={courseOptions}
                      placeholder="Seleccionar curso"
                      onChange={handleCourseChange}
                    />
                  </label>

                  <label className="admin-student-form-checkbox">
                    <input
                      type="checkbox"
                      name="familyConsent"
                      checked={studentData.familyConsent}
                      onChange={handleStudentChange}
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
                    disabled={loadingStudent}
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