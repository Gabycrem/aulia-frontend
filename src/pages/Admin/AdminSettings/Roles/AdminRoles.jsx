import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import useAdminRoles from "../../../../hooks/AdminSettings/useAdminRoles";
import "./AdminRoles.css";

const columns = [
  {
    key: "name",
    label: "Rol",
  },
];

function AdminRoles() {
  const {
    roles,
    loading,
    error,
  } = useAdminRoles();

  return (
    <DashboardLayout role="admin">
      <section className="admin-roles">
        <PageToolbar title="Roles del sistema" />

        {error && <p className="admin-roles-error">{error}</p>}

        <Card className="admin-roles-card">
          {loading && <p>Cargando roles...</p>}

          {!loading && (
            <DataTable
              columns={columns}
              rows={roles}
              emptyMessage="No hay roles cargados"
            />
          )}
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminRoles;