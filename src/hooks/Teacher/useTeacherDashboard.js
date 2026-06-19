import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAssignmentsByUser } from "../../services/assignmentService";
import { getReferralsByTeacher } from "../../services/referralService";
import { getStudentsByTeacher } from "../../services/studentService";
import { getSessionUser } from "../../utils/session";
import {
  buildTeacherMetrics,
  mapTeacherAssignmentToSummary,
  mapTeacherReferralToSummary,
  mergeStudentsWithLatestReferrals,
  normalizeTeacherAssignmentsResponse,
  normalizeTeacherReferralsResponse,
  mergeStudentsWithLatestReferrals,
} from "./teacherDashboardMappers";
import {
  mapTeacherStudentsWithAssignments,
} from "./teacherStudentsMappers";

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

        const [studentsResponse, assignmentsResponse, referralsResponse] =
          await Promise.all([
            getStudentsByTeacher(sessionUser.id),
            getAssignmentsByUser(sessionUser.id),
            getReferralsByTeacher(sessionUser.id),
          ]);

        const mappedStudents = mapTeacherStudentsWithAssignments(
          studentsResponse,
          assignmentsResponse
        );

        const mappedAssignments = normalizeTeacherAssignmentsResponse(
          assignmentsResponse
        ).map(mapTeacherAssignmentToSummary);

        const teacherReferrals = normalizeTeacherReferralsResponse(referralsResponse);

        const studentsWithRequests = mergeStudentsWithLatestReferrals(
          mappedStudents,
          teacherReferrals
        );
        
        setAssignedStudents(studentsWithRequests.slice(0, 5));
        setAssignments(mappedAssignments.slice(0, 4));
        setSentRequests(
          teacherReferrals.map(mapTeacherReferralToSummary).slice(0, 4)
        );
        setMetrics(
          buildTeacherMetrics({
            students: mappedStudents,
            referrals: teacherReferrals,
          })
        );
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