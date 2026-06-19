import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import useGabReferrals from "../../../hooks/Gabinete/useGabReferrals";
import "./GabReferrals.css";

function createColumns({ selectedReferralId, handleSelectReferral }) {
  return [
    {
      key: "selected",
      label: "",
      width: "56px",
      render: (row) => (
        <input
          type="radio"
          name="selectedReferral"
          checked={String(selectedReferralId) === String(row.referralId)}
          onChange={() => handleSelectReferral(row.referralId)}
        />
      ),
    },
    { key: "studentName", label: "Alumno" },
    { key: "category", label: "Categoría" },
    {
      key: "status",
      label: "Estado",
      render: (row) => <Badge>{row.status}</Badge>,
    },
    { key: "createdAt", label: "Fecha" },
  ];
}

function GabReferrals() {
  const {
    referrals,
    selectedReferralId,
    selectedReferral,
    notes,
    loading,
    loadingDetail,
    saving,
    error,
    successMessage,
    handleSelectReferral,
    handleNotesChange,
    handleAcceptReferral,
    handleRejectReferral,
    handleRequestInfo,
  } = useGabReferrals();

  const columns = createColumns({
    selectedReferralId,
    handleSelectReferral,
  });

  const hasSelectedReferral = Boolean(selectedReferralId);

  return (
    <DashboardLayout role="gab">
      <section className="gab-referrals">
        <PageToolbar title="Derivaciones" />

        {error && <p className="gab-referrals-error">{error}</p>}
        {successMessage && (
          <p className="gab-referrals-success">{successMessage}</p>
        )}

        <Card className="gab-referrals-table-card">
          <DataTable
            columns={columns}
            rows={referrals}
            emptyMessage={
              loading
                ? "Cargando derivaciones..."
                : "No hay derivaciones pendientes"
            }
          />
        </Card>

        <Card className="gab-referrals-context-card">
          {loadingDetail && <p>Cargando detalle...</p>}

          {!loadingDetail && selectedReferral ? (
            <>
              <div className="gab-referrals-detail">
                <h2>Detalle de la derivación</h2>

                <p>
                  <strong>Alumno:</strong> {selectedReferral.studentName}
                </p>
                <p>
                  <strong>Categoría:</strong> {selectedReferral.category}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedReferral.description}
                </p>
              </div>

              <label className="gab-referrals-notes">
                Observaciones
                <textarea
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Agregá una observación opcional..."
                  disabled={saving}
                />
              </label>
            </>
          ) : (
            <p>Seleccioná una derivación para habilitar acciones.</p>
          )}

          <div className="gab-referrals-actions">
            <Button
              type="button"
              disabled={!hasSelectedReferral || saving}
              onClick={handleAcceptReferral}
            >
              Aceptar
            </Button>

            <Button
              type="button"
              disabled={!hasSelectedReferral || saving}
              onClick={handleRequestInfo}
            >
              Pedir información
            </Button>

            <Button
              type="button"
              className="btn-secondary"
              disabled={!hasSelectedReferral || saving}
              onClick={handleRejectReferral}
            >
              Rechazar
            </Button>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default GabReferrals;