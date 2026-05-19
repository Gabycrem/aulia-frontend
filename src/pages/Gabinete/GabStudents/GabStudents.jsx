import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import "./GabStudents.css";

const cases = [
  {
    id: 1,
    studentName: "Juan Pérez",
    course: "3° B",
    source: "Alerta",
    reason: "Ausentismo",
    priority: "Alta",
    status: "En revisión",
    lastUpdate: "Hace 2 hs.",
  },
  {
    id: 2,
    studentName: "Martina Gómez",
    course: "3° B",
    source: "Derivación",
    reason: "Dificultades de Aprendizaje",
    priority: "Alta",
    status: "Pendiente de aceptación",
    lastUpdate: "Hace 25 min.",
  },
  {
    id: 3,
    studentName: "Lucas Fernández",
    course: "3° B",
    source: "Legajo",
    reason: "Conducta y Convivencia",
    priority: "Baja",
    status: "Abierto",
    lastUpdate: "Hoy",
  },
  {
    id: 4,
    studentName: "Sofía Ramírez",
    course: "2° A",
    source: "Check-in",
    reason: "Socioemocional",
    priority: "Alta",
    status: "Pendiente",
    lastUpdate: "Hoy",
  },
  {
    id: 5,
    studentName: "Valentina Ruiz",
    course: "4° C",
    source: "Derivación",
    reason: "Socioemocional/Familiar",
    priority: "Alta",
    status: "Aceptado - En curso",
    lastUpdate: "Ayer",
  },
];

const columns = [
  {
    key: "studentName",
    label: "Alumno",
    width: "12%",
  },
  {
    key: "course",
    label: "Curso",
    width: "8%",
  },
  {
    key: "source",
    label: "Origen",
    width: "12%",
  },
  {
    key: "reason",
    label: "Motivo",
    width: "22%",
  },
  {
    key: "priority",
    label: "Prioridad",
    width: "12%",
    render: (row) => <Badge variant="muted">{row.priority}</Badge>,
  },
  {
    key: "status",
    label: "Estado",
    width: "18%",
    render: (row) => <Badge>{row.status}</Badge>,
  },
  {
    key: "lastUpdate",
    label: "Última actualización",
    width: "10%",
  },
  {
    key: "action",
    label: "Acción",
    width: "10%",
    render: () => (
      <button type="button" className="gab-students-table-action">
        Ver/Editar
      </button>
    ),
  },
];


function GabStudents() {
  return (
    <DashboardLayout role="gab">
      <section className="gab-students">
        <PageToolbar title="Alumnos">
          <Input
            type="search"
            placeholder="Buscar alumno..."
            className="gab-students-search"
          />

          <Button className="gab-students-new-case-button">
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
