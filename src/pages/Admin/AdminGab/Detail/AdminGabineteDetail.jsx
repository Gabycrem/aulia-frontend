import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import Badge from "../../../../components/Badge/Badge";
import useAdminGabineteDetail from "../../../../hooks/AdminGabinete/useAdminGabineteDetail";
import "./AdminGabineteDetail.css";

function AdminGabineteDetail() {
  const {
    gabineteUser,
    loading,
    error,
    handleBack,
    handleEdit,
  } = useAdminGabineteDetail();

  return (
    <DashboardLayout role="admin">
      <section className="admin-gabinete-detail">
        <PageToolbar title="Detalle integrante de gabinete">
          <Button type="button" onClick={handleBack}>
            Volver
          </Button>
        </PageToolbar>

        {loading && <p>Cargando integrante...</p>}

        {error && <p className="admin-gabinete-detail-error">{error}</p>}

        {!loading && !error && gabineteUser && (
          <Card className="admin-gabinete-detail-card">
            <div className="admin-gabinete-detail-header">
              <div>
                <h2>{gabineteUser.gabineteName}</h2>
                <p>{gabineteUser.email}</p>
              </div>

              <Badge variant={gabineteUser.status === "Activo" ? "primary" : "muted"}>
                {gabineteUser.status}
              </Badge>
            </div>

            <div className="admin-gabinete-detail-grid">
              <div>
                <span>Usuario</span>
                <strong>{gabineteUser.username}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{gabineteUser.email}</strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>{gabineteUser.status}</strong>
              </div>
            </div>

            <div className="admin-gabinete-detail-actions">
              <Button type="button" onClick={handleEdit}>
                Editar datos
              </Button>
            </div>
          </Card>
        )}
      </section>
    </DashboardLayout>
  );
}

export default AdminGabineteDetail;