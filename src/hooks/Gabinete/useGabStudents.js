import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cases as mockCases } from "../../data/gabStudentsMock";
import useStudents from "../useStudents";

function getStudentName(student) {
  const user = student.User || student.user;

  const firstName = user?.firstName || student.firstName || "";
  const lastName = user?.lastName || student.lastName || "";

  return `${firstName} ${lastName}`.trim() || "Alumno sin nombre";
}

function getStudentCourse(student) {
  const course = student.Course || student.course;

  if (course?.grade && course?.division) {
    return `${course.grade} ${course.division}`;
  }

  if (student.courseId) {
    return `Curso ID ${student.courseId}`;
  }

  return "Sin curso";
}

function mapStudentToCase(student) {
  return {
    id: student.id,
    studentId: student.id,
    studentName: getStudentName(student),
    course: getStudentCourse(student),
    source: "Legajo",
    reason: "Sin motivo asignado",
    priority: "Normal",
    status: "Sin legajo cargado",
    lastUpdate: student.updatedAt || "-",
  };
}

function useGabStudents() {
  const navigate = useNavigate();
  const { loading, error, loadActiveStudents } = useStudents();

  const [casesData, setCasesData] = useState(mockCases);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadGabStudents() {
      const students = await loadActiveStudents();
      const mappedCases = students.map(mapStudentToCase);

      setCasesData(mappedCases.length > 0 ? mappedCases : mockCases);
    }

    loadGabStudents();
  }, [loadActiveStudents]);

  const cases = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return casesData;
    }

    return casesData.filter((caseItem) =>
      caseItem.studentName.toLowerCase().includes(normalizedSearch)
    );
  }, [casesData, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    return cases;
  };

  const handleViewCase = (caseItem) => {
    navigate(`/dashboard/gabinete/alumnos/${caseItem.studentId || caseItem.id}/caso`);
  };

  const handleEditCase = (caseItem) => {
    window.alert(`Editar caso de ${caseItem.studentName}`);
  };

  const handleCreateCase = () => {
    window.alert("Crear nuevo caso");
  };

  return {
    cases,
    searchTerm,
    loading,
    error,
    handleSearchChange,
    handleSearch,
    handleViewCase,
    handleEditCase,
    handleCreateCase,
  };
}

export default useGabStudents;