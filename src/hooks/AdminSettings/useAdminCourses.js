import { useEffect, useMemo, useState } from "react";

import {
  deactivateCourse,
  getActiveCourses,
  saveCourse,
} from "../../services/courseService";
import {
  initialCourseData,
  mapCourseFormToPayload,
  mapCourseToRow,
  normalizeCoursesResponse,
} from "./adminSettingsMappers";

function useAdminCourses() {
  const [courseData, setCourseData] = useState(initialCourseData);
  const [coursesData, setCoursesData] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const selectedCourse = coursesData.find(
    (course) => course.id === selectedCourseId
  );

  async function loadCourses() {
    try {
      setLoading(true);
      setError("");

      const response = await getActiveCourses();
      const courses = normalizeCoursesResponse(response).map(mapCourseToRow);

      setCoursesData(courses);
    } catch (error) {
      setError(error.message || "Error al cargar cursos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return coursesData;
    }

    return coursesData.filter((course) =>
      [
        course.academicYear,
        course.level,
        course.grade,
        course.division,
        course.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [coursesData, searchTerm]);

  function handleCourseChange(event) {
    const { name, value } = event.target;

    setCourseData((currentCourseData) => ({
      ...currentCourseData,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleLevelChange(option) {
    setCourseData((currentCourseData) => ({
      ...currentCourseData,
      level: option.value,
    }));

    if (error) setError("");
  }

  function handleGradeChange(option) {
    setCourseData((currentCourseData) => ({
      ...currentCourseData,
      grade: option.value,
    }));

    if (error) setError("");
  }

  function handleSelectCourse(courseId) {
    setSelectedCourseId((currentSelectedCourseId) =>
      currentSelectedCourseId === courseId ? null : courseId
    );
  }

  function handleClearForm() {
    setCourseData(initialCourseData);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !courseData.academicYear ||
      !courseData.level ||
      !courseData.grade ||
      !courseData.division.trim()
    ) {
      setError("Completá año académico, nivel, grado y división");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await saveCourse(mapCourseFormToPayload(courseData));

      handleClearForm();
      await loadCourses();
    } catch (error) {
      setError(error.message || "Error al guardar el curso");
    } finally {
      setSaving(false);
    }
  }

  function handleOpenDeactivateConfirm() {
    if (!selectedCourseId) return;

    setShowDeactivateConfirm(true);
  }

  function handleCloseDeactivateConfirm() {
    if (deletingId) return;

    setShowDeactivateConfirm(false);
  }

  async function handleConfirmDeactivateCourse() {
    if (!selectedCourseId) return;

    try {
      setDeletingId(selectedCourseId);
      setError("");

      await deactivateCourse(selectedCourseId);

      setSelectedCourseId(null);
      setShowDeactivateConfirm(false);
      await loadCourses();
    } catch (error) {
      setShowDeactivateConfirm(false);
      setError(error.message || "Error al desactivar el curso");
    } finally {
      setDeletingId(null);
    }
  }
  return {
    courseData,
    filteredCourses,
    selectedCourseId,
    selectedCourse,
    searchTerm,
    setSearchTerm,

    loading,
    saving,
    deletingId,
    error,

    handleCourseChange,
    handleLevelChange,
    handleGradeChange,
    handleSelectCourse,
    handleClearForm,
    handleSubmit,
    showDeactivateConfirm,
    handleOpenDeactivateConfirm,
    handleCloseDeactivateConfirm,
    handleConfirmDeactivateCourse,
  };
}

export default useAdminCourses;