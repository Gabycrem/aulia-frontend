import { useState } from "react";

import {
  contextOptions,
  emotionOptions,
} from "../data/checkInOptions";
import { saveCheckIn } from "../services/checkInService";
import { getSessionUser } from "../utils/session";
import {
  initialCheckInData,
  mapCheckInFormToPayload,
} from "./studentDashboardMappers";

function useStudentDashboard() {
  const sessionUser = getSessionUser();

  const [formData, setFormData] = useState(initialCheckInData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleEmotionSelect(emotionalState) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emotionalState,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  function handleContextChange(option) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      context: option,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  function handleCommentChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      comment: event.target.value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  function handleHelpRequestedChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      helpRequested: event.target.checked,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  function handleCancel() {
    setFormData(initialCheckInData);
    setError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.emotionalState) {
      setError("Seleccioná cómo te sentís hoy");
      return;
    }

    // if (!formData.comment.trim()) {
    //   setError("Escribí un comentario para guardar el check-in");
    //   return;
    // }

    const studentData = {
      studentId: sessionUser?.studentId,
      courseId: sessionUser?.courseId,
    };

    if (!studentData.studentId || !studentData.courseId) {
      setError("No se pudo identificar el alumno o curso para guardar el check-in");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      await saveCheckIn(mapCheckInFormToPayload(formData, studentData));

      setSuccessMessage("Check-in guardado correctamente");
      setFormData(initialCheckInData);
    } catch (error) {
      setError(error.message || "Error al guardar el check-in");
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    emotionOptions,
    contextOptions,
    loading,
    error,
    successMessage,
    handleEmotionSelect,
    handleContextChange,
    handleCommentChange,
    handleHelpRequestedChange,
    handleCancel,
    handleSubmit,
  };
}

export default useStudentDashboard;