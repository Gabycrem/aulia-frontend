import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStudentById } from "../../services/studentService";
import {
  mapStudentToDetail,
  normalizeStudentResponse,
} from "./adminStudentMappers";

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
        const studentData = normalizeStudentResponse(response);

        if (!studentData) {
          throw new Error("No se encontró el alumno");
        }

        setStudent(mapStudentToDetail(studentData));
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