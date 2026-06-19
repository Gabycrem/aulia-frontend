import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { normalizeUserResponse } from "../../utils/userMappers";
import { getAllStudents } from "../../services/studentService";
import {
  mapStudentToTableRow,
  normalizeStudentsResponse,
} from "./adminStudentMappers";

const statusOptions = ["Todos", "Activo", "Inactivo"];

function useAdminStudents() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllStudents(1);
      const students = normalizeStudentsResponse(response);

      const studentsWithUsers = await Promise.all(
        students.map(async (student) => {
          const embeddedUser = student.User || student.user;
          const studentUserId = student.userId || student.UserId || embeddedUser?.id;

          if (embeddedUser?.email || !studentUserId) {
            return student;
          }

          try {
            const userResponse = await getUserById(studentUserId);
            const user = normalizeUserResponse(userResponse);

            return {
              ...student,
              User: {
                ...embeddedUser,
                ...user,
              },
              user: {
                ...embeddedUser,
                ...user,
              },
            };
          } catch {
            return student;
          }
        })
      );

      const mappedStudents = studentsWithUsers.map(mapStudentToTableRow);

      setStudentsData(mappedStudents);
    } catch (error) {
      setError(error.message || "Error al cargar alumnos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const courseOptions = useMemo(() => {
    const courses = studentsData.map((student) => student.course);
    return ["Todos", ...new Set(courses)];
  }, [studentsData]);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return studentsData.filter((student) => {
      const matchesSearch =
        !normalizedSearch ||
        [student.studentName, student.email, student.course]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCourse =
        selectedCourse === "Todos" ||
        student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "Todos" ||
        student.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [studentsData, searchTerm, selectedCourse, selectedStatus]);

  const selectedStudent = filteredStudents.find(
    (student) => student.id === selectedStudentId
  );

  function handleSelectStudent(studentId) {
    setSelectedStudentId((currentSelectedStudentId) =>
      currentSelectedStudentId === studentId ? null : studentId
    );
  }

  function handleCreateStudent() {
    navigate("/dashboard/admin/alumnos/nuevo");
  }

  function handleViewStudent() {
    if (!selectedStudentId) return;
    navigate(`/dashboard/admin/alumnos/${selectedStudentId}`);
  }

  function handleEditStudent() {
    if (!selectedStudentId) return;
    navigate(`/dashboard/admin/alumnos/${selectedStudentId}/editar`);
  }

  return {
    searchTerm,
    setSearchTerm,

    selectedCourse,
    setSelectedCourse,

    selectedStatus,
    setSelectedStatus,

    selectedStudentId,
    selectedStudent,

    courseOptions,
    statusOptions,

    filteredStudents,

    loading,
    error,

    handleSelectStudent,
    handleCreateStudent,
    handleViewStudent,
    handleEditStudent,
  };
}

export default useAdminStudents;