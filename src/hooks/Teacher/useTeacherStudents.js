import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignmentsByUser } from "../../services/assignmentService";
import { getStudentsByTeacher } from "../../services/studentService";
import { getSessionUser } from "../../utils/session";
import { getReferralsByTeacher } from "../../services/referralService";
import {
  buildCourseOptions,
  buildSubjectOptions,
  mapTeacherStudentsWithAssignments,
} from "./teacherStudentsMappers";
import {
  mergeStudentsWithLatestReferrals,
  normalizeTeacherReferralsResponse,
} from "./teacherDashboardMappers";

function useTeacherStudents() {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentsData, setStudentsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sessionUser = useMemo(() => getSessionUser(), []);

  useEffect(() => {
    async function loadTeacherStudents() {
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

        const teacherReferrals = normalizeTeacherReferralsResponse(referralsResponse);

        const studentsWithRequests = mergeStudentsWithLatestReferrals(
          mappedStudents,
          teacherReferrals
        );

        setStudentsData(studentsWithRequests);
      } catch (error) {
        setError(error.message || "Error al cargar alumnos asignados");
      } finally {
        setLoading(false);
      }
    }

    loadTeacherStudents();
  }, [sessionUser?.id]);

  const courseOptions = useMemo(
    () => buildCourseOptions(studentsData),
    [studentsData]
  );

  const subjectOptions = useMemo(
    () => buildSubjectOptions(studentsData),
    [studentsData]
  );

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesCourse =
        !selectedCourse || String(student.courseId || student.course) === String(selectedCourse);

      const matchesSubject =
        !selectedSubject ||
        String(student.subjectId || student.subject) === String(selectedSubject);

      return matchesCourse && matchesSubject;
    });
  }, [studentsData, selectedCourse, selectedSubject]);

  function handleCourseChange(option) {
    setSelectedCourse(option?.value || "");
  }

  function handleSubjectChange(option) {
    setSelectedSubject(option?.value || "");
  }

  function handleRequestIntervention(studentId) {
    navigate(`/dashboard/docente/solicitar-intervencion?studentId=${studentId}`, {
      state: {
        returnTo: "/dashboard/docente/mis-alumnos",
      },
    });
  }

  return {
    selectedCourse,
    selectedSubject,
    courseOptions,
    subjectOptions,
    filteredStudents,
    loading,
    error,
    handleCourseChange,
    handleSubjectChange,
    handleRequestIntervention,
  };
}

export default useTeacherStudents;