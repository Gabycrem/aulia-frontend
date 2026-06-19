import { useEffect, useMemo, useState } from "react";

import {
  deleteSubject,
  getAllSubjects,
  saveSubject,
  updateSubject,
} from "../../services/subjectService";
import {
  initialSubjectData,
  mapSubjectFormToPayload,
  mapSubjectToRow,
  normalizeSubjectsResponse,
} from "./adminSettingsMappers";

function useAdminSubjects() {
  const [subjectData, setSubjectData] = useState(initialSubjectData);
  const [subjectsData, setSubjectsData] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const selectedSubject = subjectsData.find(
    (subject) => subject.id === selectedSubjectId
  );

  const isEditing = Boolean(selectedSubjectId);

  async function loadSubjects() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllSubjects(1);
      const subjects = normalizeSubjectsResponse(response).map(mapSubjectToRow);

      setSubjectsData(subjects);
    } catch (error) {
      setError(error.message || "Error al cargar materias");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return subjectsData;
    }

    return subjectsData.filter((subject) =>
      subject.name.toLowerCase().includes(normalizedSearch)
    );
  }, [subjectsData, searchTerm]);

  function handleSubjectChange(event) {
    const { name, value } = event.target;

    setSubjectData((currentSubjectData) => ({
      ...currentSubjectData,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSelectSubject(subjectId) {
    const subject = subjectsData.find((subject) => subject.id === subjectId);

    if (!subject) return;

    setSelectedSubjectId(subjectId);
    setSubjectData({
      name: subject.name,
    });
    setError("");
  }

  function handleClearSelection() {
    setSelectedSubjectId(null);
    setSubjectData(initialSubjectData);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!subjectData.name.trim()) {
      setError("Completá el nombre de la materia");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = mapSubjectFormToPayload(subjectData);

      if (isEditing) {
        await updateSubject(selectedSubjectId, payload);
      } else {
        await saveSubject(payload);
      }

      handleClearSelection();
      await loadSubjects();
    } catch (error) {
      setError(error.message || "Error al guardar la materia");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteSubject() {
    if (!selectedSubjectId) return;

    const confirmed = window.confirm("¿Querés eliminar esta materia?");

    if (!confirmed) return;

    try {
      setDeletingId(selectedSubjectId);
      setError("");

      await deleteSubject(selectedSubjectId);

      handleClearSelection();
      await loadSubjects();
    } catch (error) {
      setError(error.message || "Error al eliminar la materia");
    } finally {
      setDeletingId(null);
    }
  }

  return {
    subjectData,
    filteredSubjects,
    selectedSubjectId,
    selectedSubject,
    searchTerm,
    setSearchTerm,

    loading,
    saving,
    deletingId,
    error,
    isEditing,

    handleSubjectChange,
    handleSelectSubject,
    handleClearSelection,
    handleSubmit,
    handleDeleteSubject,
  };
}

export default useAdminSubjects;