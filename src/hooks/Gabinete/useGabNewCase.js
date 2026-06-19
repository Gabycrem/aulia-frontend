import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveCaseFile } from "../../services/caseFileService";
import { getStudentsWithoutActiveCase } from "../../services/studentService";
import {
  mapStudentToOption,
  normalizeStudentsResponse,
} from "./gabNewCaseMappers";

function useGabNewCase() {
  const navigate = useNavigate();

  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [existingCaseStudentId, setExistingCaseStudentId] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoadingStudents(true);
        setError("");

        const response = await getStudentsWithoutActiveCase();
        const students = normalizeStudentsResponse(response);

        setStudentOptions(students.map(mapStudentToOption));
      } catch (error) {
        setError(error.message || "Error al cargar alumnos");
        setStudentOptions([]);
      } finally {
        setLoadingStudents(false);
      }
    }

    loadStudents();
  }, []);

  function handleStudentChange(option) {
    setSelectedStudentId(option?.value || "");
    setExistingCaseStudentId(null);
    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedStudentId) {
      setError("Seleccioná un alumno para crear el caso");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setExistingCaseStudentId(null);

      await saveCaseFile({ studentId: Number(selectedStudentId) });

      navigate(`/dashboard/gabinete/alumnos/${selectedStudentId}/caso`);
    } catch (error) {
      const message = error.message || "No se pudo crear el caso";

      if (
        error.status === 409 ||
        message.toLowerCase().includes("already exists")
      ) {
        setExistingCaseStudentId(selectedStudentId);
        setError("El alumno seleccionado ya tiene un caso abierto.");
        return;
      }

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  function handleViewExistingCase() {
    if (!existingCaseStudentId) {
      return;
    }

    navigate(`/dashboard/gabinete/alumnos/${existingCaseStudentId}/caso`);
  }

  function handleCancel() {
    navigate("/dashboard/gabinete/alumnos");
  }

  return {
    studentOptions,
    selectedStudentId,
    loadingStudents,
    saving,
    error,
    existingCaseStudentId,
    handleStudentChange,
    handleSubmit,
    handleViewExistingCase,
    handleCancel,
  };
}

export default useGabNewCase;