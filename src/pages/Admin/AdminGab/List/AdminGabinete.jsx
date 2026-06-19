import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Badge from "../../../../components/Badge/Badge";
import useAdminGabinete from "../../../../hooks/AdminGabinete/useAdminGabinete";
import "./AdminGabinete.css";

function createColumns({
  selectedGabineteId,
  handleSelectGabinete,
}) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedGabinete"
          checked={selectedGabineteId === row.id}
          onChange={() => handleSelectGabinete(row.id)}
        />
      ),
    },
    {
      key: "gabineteName",
      label: "Integrante",
    },
    {
      key: "username",
      label: "Usuario",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <Badge variant={row.status === "Activo" ? "primary" : "muted"}>
          {row.status}
        </Badge>
      ),
    },
  ];
}

function AdminGabinete() {
  const {
    searchTerm,
    setSearchTerm,
    filteredGabinete,
    selectedGabineteId,
    selectedGabinete,
    loading,
    error,
    handleSelectGabinete,
    handleCreateGabinete,
    handleViewGabinete,
    handleEditGabinete,
  } = useAdminGabinete();

  const columns = createColumns({
    selectedGabineteId,
    handleSelectGabinete,
  });

  const hasSelectedGabinete = Boolean(selectedGabinete);

  return (
    <DashboardLayout role="admin">
      <section className="admin-gabinete">
        <PageToolbar title="Gestión de gabinete">
          <Button
            type="button"
            className="admin-gabinete-primary-button"
            onClick={handleCreateGabinete}
          >
            Nuevo integrante
          </Button>
        </PageToolbar>

        <Card className="admin-gabinete-filters-card">
          <label className="admin-gabinete-search">
            Buscar integrante
            <Input
              placeholder="Buscar por nombre, usuario o email..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </Card>

        <Card className="admin-gabinete-table-card">
          {loading && <p>Cargando gabinete...</p>}

          {error && <p className="admin-gabinete-error">{error}</p>}

          {!loading && !error && (
            <DataTable
              columns={columns}
              rows={filteredGabinete}
              emptyMessage="No hay integrantes de gabinete cargados"
            />
          )}
        </Card>

        <Card className="admin-gabinete-context-card">
          <div className="admin-gabinete-selected">
            {selectedGabinete ? (
              <>
                Integrante seleccionado:{" "}
                <strong>{selectedGabinete.gabineteName}</strong>
              </>
            ) : (
              "Seleccioná un integrante para habilitar acciones."
            )}
          </div>

          <div className="admin-gabinete-context-actions">
            <Button
              type="button"
              disabled={!hasSelectedGabinete}
              onClick={handleViewGabinete}
            >
              Ver detalle
            </Button>

            <Button
              type="button"
              disabled={!hasSelectedGabinete}
              onClick={handleEditGabinete}
            >
              Editar
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default AdminGabinete;