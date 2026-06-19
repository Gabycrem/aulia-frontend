import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteAssignment,
  getAllAssignments,
  saveAssignment,
} from "../../services/assignmentService";
import { getActiveCourses } from "../../services/courseService";
import { getAllSubjects } from "../../services/subjectService";
import { getUserById } from "../../services/userService";
import {
  initialAssignmentData,
  mapAssignmentFormToPayload,
  mapAssignmentToRow,
  mapCourseToOption,
  mapSubjectToOption,
  mapTeacherToSummary,
  normalizeAssignmentsResponse,
  normalizeCoursesResponse,
  normalizeSubjectsResponse,
} from "./adminTeacherMappers";
import { normalizeUserResponse } from "../../utils/userMappers";

function useAdminTeacherAssignments() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [assignmentData, setAssignmentData] = useState(initialAssignmentData);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  async function loadAssignments() {
    const assignmentsResponse = await getAllAssignments(1);
    const allAssignments = normalizeAssignmentsResponse(assignmentsResponse);

    setAssignments(
      allAssignments
        .filter((assignment) => Number(assignment.teacherId) === Number(id))
        .map(mapAssignmentToRow)
    );
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [userResponse, coursesResponse, subjectsResponse] =
          await Promise.all([
            getUserById(id),
            getActiveCourses(),
            getAllSubjects(),
          ]);

        const user = normalizeUserResponse(userResponse);

        if (!user) {
          throw new Error("No se encontró el docente");
        }

        setTeacher(mapTeacherToSummary(user));
        setCourseOptions(
          normalizeCoursesResponse(coursesResponse).map(mapCourseToOption)
        );
        setSubjectOptions(
          normalizeSubjectsResponse(subjectsResponse).map(mapSubjectToOption)
        );

        await loadAssignments();
      } catch (error) {
        setCourseOptions([]);
        setSubjectOptions([]);
        setError(
          error.message ||
          "No se pudieron cargar los datos necesarios para asignar el docente"
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  function handleAssignmentChange(event) {
    const { name, value } = event.target;

    setAssignmentData((currentAssignmentData) => ({
      ...currentAssignmentData,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleCourseChange(option) {
    setAssignmentData((currentAssignmentData) => ({
      ...currentAssignmentData,
      courseId: option.id,
    }));

    if (error) setError("");
  }

  function handleSubjectChange(option) {
    setAssignmentData((currentAssignmentData) => ({
      ...currentAssignmentData,
      subjectId: option.id,
    }));

    if (error) setError("");
  }

  async function handleSaveAssignment(event) {
    event.preventDefault();

        if (courseOptions.length === 0) {
      setError("No hay cursos activos disponibles para crear asignaciones");
      return;
    }

    if (subjectOptions.length === 0) {
      setError("No hay materias disponibles para crear asignaciones");
      return;
    }

    if (
      !assignmentData.academicYear ||
      !assignmentData.courseId ||
      !assignmentData.subjectId
    ) {
      setError("Completá año académico, curso y materia");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await saveAssignment(mapAssignmentFormToPayload(assignmentData, id));
      setAssignmentData(initialAssignmentData);
      await loadAssignments();
    } catch (error) {
      setError(error.message || "Error al guardar la asignación");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAssignment(assignmentId) {
    const confirmed = window.confirm("¿Querés eliminar esta asignación?");

    if (!confirmed) return;

    try {
      setDeletingId(assignmentId);
      setError("");

      await deleteAssignment(assignmentId);
      await loadAssignments();
    } catch (error) {
      setError(error.message || "Error al eliminar la asignación");
    } finally {
      setDeletingId(null);
    }
  }

  function handleBack() {
    navigate("/dashboard/admin/gestionar-docentes");
  }

  return {
    teacher,
    assignments,
    courseOptions,
    subjectOptions,
    assignmentData,

    loading,
    saving,
    deletingId,
    error,

    handleAssignmentChange,
    handleCourseChange,
    handleSubjectChange,
    handleSaveAssignment,
    handleDeleteAssignment,
    handleBack,
  };
}

export default useAdminTeacherAssignments;