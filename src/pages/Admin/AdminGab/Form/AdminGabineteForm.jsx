import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import UserForm from "../../../../components/UserForm/UserForm";
import useAdminGabineteForm from "../../../../hooks/AdminGabinete/useAdminGabineteForm";
import "./AdminGabineteForm.css";

function AdminGabineteForm() {
  const {
    isEditing,
    userData,
    loading,
    loadingUser,
    error,
    handleUserChange,
    handleSubmit,
    handleCancel,
  } = useAdminGabineteForm();

  return (
    <DashboardLayout role="admin">
      <section className="admin-gabinete-form">
        <PageToolbar
          title={isEditing ? "Editar integrante de gabinete" : "Nuevo integrante de gabinete"}
        />

        {loadingUser && <p>Cargando integrante...</p>}

        {error && <p className="admin-gabinete-form-error">{error}</p>}

        {!loadingUser && (
          <UserForm
            mode={isEditing ? "edit" : "create"}
            title="Datos del usuario"
            description={
              isEditing
                ? "Modificá los datos del usuario de gabinete."
                : "Completá los datos del usuario de gabinete."
            }
            userData={userData}
            loading={loading}
            submitLabel={isEditing ? "Guardar cambios" : "Crear integrante"}
            onChange={handleUserChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminGabineteForm;