import DashboardLayout from "../../../../layouts/DashboardLayout/DashboardLayout";
import PageToolbar from "../../../../components/PageToolbar/PageToolbar";
import Card from "../../../../components/Card/Card";
import DataTable from "../../../../components/DataTable/DataTable";
import Button from "../../../../components/Button/Button";
import Badge from "../../../../components/Badge/Badge";
import useGabInterventions from "../../../../hooks/Gabinete/useGabInterventions";
import "./GabInterventions.css";

const columns = [
  { key: "title", label: "Título" },
  { key: "type", label: "Tipo" },
  { key: "studentId", label: "Alumno" },
  { key: "interventionDate", label: "Fecha" },
  {
    key: "status",
    label: "Estado",
    render: (row) => <Badge>{row.status}</Badge>,
  },
];

function GabInterventions() {
  const {
    interventions,
    loading,
    error,
    handleCreateIntervention,
  } = useGabInterventions();

  return (
    <DashboardLayout role="gab">
      <section className="gab-interventions">
        <PageToolbar title="Intervenciones">
          <Button type="button" onClick={handleCreateIntervention}>
            Nueva intervención
          </Button>
        </PageToolbar>

        {error && <p className="gab-interventions-error">{error}</p>}

        <Card className="gab-interventions-table-card">
          <DataTable
            columns={columns}
            rows={interventions}
            emptyMessage={
              loading ? "Cargando intervenciones..." : "No hay intervenciones registradas"
            }
          />
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default GabInterventions;