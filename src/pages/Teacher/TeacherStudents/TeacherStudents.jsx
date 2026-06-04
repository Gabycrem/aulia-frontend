import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import DataTable from "../../../components/DataTable/DataTable";
import Badge from "../../../components/Badge/Badge";
import "./TeacherStudents.css";
import useTeacherStudents from "../../../hooks/Teacher/useTeacherStudents";


const columns = [
    { key: "studentName", label: "Alumno" },
    { key: "course", label: "Curso" },
    { key: "subject", label: "Materia" },
    {
        key: "lastRequest",
        label: "Última solicitud",
        render: (row) => <Badge>{row.lastRequest}</Badge>,
    },
    {
        key: "action",
        label: "Acción",
        render: () => (
            <button type="button" className="teacher-students-action">
                Solicitar intervención
            </button>
        ),
    },
];

function TeacherStudents() {
    const {
        selectedCourse,
        setSelectedCourse,
        selectedSubject,
        setSelectedSubject,
        courseOptions,
        subjectOptions,
        filteredStudents,
    } = useTeacherStudents();
    return (
        <DashboardLayout role="teacher">
            <section className="teacher-students">
                <header className="teacher-students-header">
                    <h1>Mis alumnos</h1>
                    <p>Listado de alumnos asignados al docente.</p>
                </header>

                <div className="teacher-students-filters">
                    <label>
                        Curso
                        <select
                            value={selectedCourse}
                            onChange={(event) => setSelectedCourse(event.target.value)}
                        >
                            {courseOptions.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Materia
                        <select
                            value={selectedSubject}
                            onChange={(event) => setSelectedSubject(event.target.value)}
                        >
                            {subjectOptions.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <Card className="teacher-students-card">
                    <DataTable columns={columns} rows={filteredStudents} />
                </Card>
            </section>
        </DashboardLayout>
    );
}

export default TeacherStudents;