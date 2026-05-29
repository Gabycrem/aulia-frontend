import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../services/studentService";

function mapStudentDetail(student) {
  return {
    id: student.id,
    userId: student.userId,
    courseId: student.courseId,
    firstName: student.User?.firstName || "",
    lastName: student.User?.lastName || "",
    birthDate: student.birthDate || "",
    familyConsent: student.familyConsent ? "Sí" : "No",
    active: student.active ? "Activo" : "Inactivo",
    createdAt: student.createdAt || "",
    updatedAt: student.updatedAt || "",
  };
}

function useAdminStudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        setError("");

        const response = await getStudentById(id);

        console.log("STUDENT DETAIL RESPONSE:", response);

        const studentData = response.data || response.student || response;

        setStudent(mapStudentDetail(studentData));
      } catch (error) {
        setError(error.message || "Error al cargar el alumno");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id]);

  function handleBack() {
    navigate("/dashboard/admin/gestionar-alumnos");
  }

  function handleEdit() {
    navigate(`/dashboard/admin/alumnos/${id}/editar`);
  }

  return {
    student,
    loading,
    error,
    handleBack,
    handleEdit,
  };
}

export default useAdminStudentDetail;