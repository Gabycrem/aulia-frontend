import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStudentById } from "../../services/studentService";
import { getUserById } from "../../services/userService";
import { normalizeUserResponse } from "../../utils/userMappers";
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

        const embeddedUser = studentData.User || studentData.user || null;
        const studentUserId = studentData.userId || studentData.UserId || embeddedUser?.id;

        let studentForDetail = studentData;

        if ((!embeddedUser?.username || !embeddedUser?.email) && studentUserId) {
          const userResponse = await getUserById(studentUserId);
          const user = normalizeUserResponse(userResponse);

          if (!user) {
            throw new Error("No se encontró el usuario del alumno");
          }

          const fullUser = {
            ...embeddedUser,
            ...user,
          };

          studentForDetail = {
            ...studentData,
            User: fullUser,
            user: fullUser,
          };
        }

        setStudent(mapStudentToDetail(studentForDetail));
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