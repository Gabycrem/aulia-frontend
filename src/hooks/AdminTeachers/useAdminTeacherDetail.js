import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAllAssignments } from "../../services/assignmentService";
import { getUserById } from "../../services/userService";
import {
  mapAssignmentToRow,
  mapTeacherToDetail,
  normalizeAssignmentsResponse,
} from "./adminTeacherMappers";
import { normalizeUserResponse } from "../../utils/userMappers";

function useAdminTeacherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeacherDetail() {
      try {
        setLoading(true);
        setError("");

        const [userResponse, assignmentsResponse] = await Promise.all([
          getUserById(id),
          getAllAssignments(1),
        ]);

        const user = normalizeUserResponse(userResponse);
        const allAssignments = normalizeAssignmentsResponse(assignmentsResponse);

        setTeacher(mapTeacherToDetail(user));
        setAssignments(
          allAssignments
            .filter((assignment) => Number(assignment.teacherId) === Number(id))
            .map(mapAssignmentToRow)
        );
      } catch (error) {
        setError(error.message || "Error al cargar el detalle del docente");
      } finally {
        setLoading(false);
      }
    }

    loadTeacherDetail();
  }, [id]);

  function handleBack() {
    navigate("/dashboard/admin/gestionar-docentes");
  }

  function handleEdit() {
    navigate(`/dashboard/admin/docentes/${id}/editar`);
  }

  function handleManageAssignments() {
    navigate(`/dashboard/admin/docentes/${id}/asignaciones`);
  }

  return {
    teacher,
    assignments,
    loading,
    error,
    handleBack,
    handleEdit,
    handleManageAssignments,
  };
}

export default useAdminTeacherDetail;