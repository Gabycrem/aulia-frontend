import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  courseOptions,
  statusOptions,
} from "../../data/adminStudentsMock";

import { getAllStudents } from "../../services/studentService";

function mapStudentToTableRow(student) {
  return {
    id: student.id,
    studentName: `${student.User?.firstName || ""} ${student.User?.lastName || ""}`.trim(),

    // Temporal hasta tener Course integrado
    course: student.courseId
      ? `Curso ID ${student.courseId}`
      : "Sin curso",

    // El endpoint actual no devuelve email
    email: "-",

    familyConsent: student.familyConsent ? "Sí" : "No",

    status: student.active
      ? "Activo"
      : "Inactivo",
  };
}

function useAdminStudents() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);
        setError("");

        const response = await getAllStudents(1);

        console.log("STUDENTS RESPONSE:", response);

        const mappedStudents = (response.data || []).map(
          mapStudentToTableRow
        );

        setStudentsData(mappedStudents);

      } catch (error) {
        setError(error.message || "Error al cargar alumnos");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourse === "Todos" ||
      student.course === selectedCourse;

    const matchesStatus =
      selectedStatus === "Todos" ||
      student.status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  function handleCreateStudent() {
    navigate("/dashboard/admin/alumnos/nuevo");
  }

  function handleViewStudent(studentId) {
    navigate(`/dashboard/admin/alumnos/${studentId}`);
  }

  function handleEditStudent(studentId) {
    navigate(`/dashboard/admin/alumnos/${studentId}/editar`);
  }

  return {
    searchTerm,
    setSearchTerm,

    selectedCourse,
    setSelectedCourse,

    selectedStatus,
    setSelectedStatus,

    courseOptions,
    statusOptions,

    filteredStudents,

    loading,
    error,

    handleCreateStudent,
    handleViewStudent,
    handleEditStudent,
  };
}

export default useAdminStudents;