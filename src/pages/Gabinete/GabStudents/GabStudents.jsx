import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import "./GabStudents.css";
import { Eye, Pencil, Search } from "lucide-react";
import useGabStudents from "../../../hooks/useGabStudents";

function createColumns(handleViewCase, handleEditCase){
  return [
    {
      key: "studentName",
      label: "Alumno",
    },
    {
      key: "course",
      label: "Curso",
    },
    {
      key: "source",
      label: "Origen",
    },
    {
      key: "reason",
      label: "Motivo",
    },
    {
      key: "priority",
      label: "Prioridad",
      render: (row) => <Badge variant="muted">{row.priority}</Badge>,
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => <Badge>{row.status}</Badge>,
    },
    {
      key: "lastUpdate",
      label: "Última actualización",
    },
    {
      key: "action",
      label: "Acción",
      render: (row) => (
        <div className="gab-students-actions">
          <button
            type="button"
            className="gab-students-icon-button"
            aria-label="Ver caso"
            title="Ver caso"
            onClick={() => handleViewCase(row)}
          >
            <Eye size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="gab-students-icon-button"
            aria-label="Editar caso"
            title="Editar caso"
            onClick={() => handleEditCase(row)}
          >
            <Pencil size={18} strokeWidth={2} />
          </button>
        </div>
      ),
    },
  ];
}

function GabStudents() {
  const {
    cases,
    handleSearch,
    handleViewCase,
    handleEditCase,
    handleCreateCase,
  } = useGabStudents();

  const columns = createColumns(handleViewCase, handleEditCase);

  return (
    <DashboardLayout role="gab">
      <section className="gab-students">
        <PageToolbar title="Alumnos">
          <div className="gab-students-search-field">
            <Input
              type="search"
              placeholder="Buscar alumno..."
              className="gab-students-search"
              oneKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button
              type="button"
              className="gab-students-search-button"
              aria-label="Buscar alumno"
              title="Buscar alumno"
              onClick={handleSearch}
            >
              <Search size={18} strokeWidth={2} />
            </button>
          </div>

          <Button
            className="gab-students-new-case-button"
            onClick={handleCreateCase}
          >
            + Nuevo caso
          </Button>
        </PageToolbar>

        <Card className="gab-students-table-card">
          <DataTable columns={columns} rows={cases} />
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default GabStudents;
