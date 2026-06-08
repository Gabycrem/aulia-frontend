import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAssignmentsByUser } from "../../services/assignmentService";
import { getStudentsByTeacher } from "../../services/studentService";
import { getSessionUser } from "../../utils/session";
import {
  buildTeacherMetricsFromStudents,
  mapTeacherAssignmentToSummary,
  mapTeacherDashboardStudents,
  normalizeTeacherAssignmentsResponse,
} from "./teacherDashboardMappers";

function useTeacherDashboard() {
  const navigate = useNavigate();
  const sessionUser = useMemo(() => getSessionUser(), []);

  const [metrics, setMetrics] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      if (!sessionUser?.id) {
        setError("No se pudo identificar al docente logueado.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [studentsResponse, assignmentsResponse] = await Promise.all([
          getStudentsByTeacher(sessionUser.id),
          getAssignmentsByUser(sessionUser.id),
        ]);

        const mappedStudents = mapTeacherDashboardStudents(studentsResponse);
        const mappedAssignments = normalizeTeacherAssignmentsResponse(
          assignmentsResponse
        ).map(mapTeacherAssignmentToSummary);

        setAssignedStudents(mappedStudents.slice(0, 5));
        setAssignments(mappedAssignments.slice(0, 4));
        setSentRequests([]);
        setMetrics(buildTeacherMetricsFromStudents(mappedStudents));
      } catch (error) {
        setError(error.message || "Error al cargar el dashboard docente");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [sessionUser?.id]);

  function handleRequestIntervention(studentId) {
    navigate(`/dashboard/docente/solicitar-intervencion?studentId=${studentId}`);
  }

  return {
    metrics,
    assignedStudents,
    sentRequests,
    assignments,
    loading,
    error,
    handleRequestIntervention,
  };
}

export default useTeacherDashboard;