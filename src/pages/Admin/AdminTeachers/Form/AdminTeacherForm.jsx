import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import UserForm from "../../../../components/UserForm/UserForm";
import useAdminTeacherForm from "../../../../hooks/AdminTeachers/useAdminTeacherForm";
import "./AdminTeacherForm.css";

function AdminTeacherForm() {
  const {
    isEditing,
    userData,
    loading,
    loadingUser,
    error,
    handleUserChange,
    handleSubmit,
    handleCancel,
  } = useAdminTeacherForm();

  return (
    <DashboardLayout role="admin">
      <section className="admin-teacher-form">
        <PageToolbar title={isEditing ? "Editar docente" : "Nuevo docente"} />

        {loadingUser && <p>Cargando docente...</p>}

        {error && <p className="admin-teacher-form-error">{error}</p>}

        {!loadingUser && (
          <UserForm
            mode={isEditing ? "edit" : "create"}
            title="Datos del usuario"
            description={
              isEditing
                ? "Modificá los datos del usuario docente."
                : "Completá los datos del usuario docente."
            }
            userData={userData}
            loading={loading}
            submitLabel={isEditing ? "Guardar cambios" : "Crear docente"}
            onChange={handleUserChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminTeacherForm;