import { useState } from "react";
import {
  emotionOptions,
  subjectOptions,
} from "../data/studentDashboardOptions";

/*
DESCOMENTAR AL INTEGRAR

import { saveCheckIn } from "../services/checkInService";
*/

function useStudentDashboard() {
  const [formData, setFormData] = useState({
    emotionalState: "",
    subject: null,
    comment: "",
    helpRequested: false,
  });

  /*
  DESCOMENTAR AL INTEGRAR

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  */

  function handleEmotionSelect(emotionalState) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      emotionalState,
    }));
  }

  function handleSubjectChange(option) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: option,
    }));
  }

  function handleCommentChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      comment: event.target.value,
    }));
  }

  function handleHelpRequestedChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      helpRequested: event.target.checked,
    }));
  }

  function handleCancel() {
    setFormData({
      emotionalState: "",
      subject: "",
      comment: "",
      helpRequested: false,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    window.alert("Check-in guardado");

    /*
    DESCOMENTAR AL INTEGRAR

    try {
      setLoading(true);

      await saveCheckIn({
        ...formData,
        studentId: 1,
        courseId: 1,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    */
  }

  return {
    formData,
    emotionOptions,
    subjectOptions,
    handleEmotionSelect,
    handleSubjectChange,
    handleCommentChange,
    handleHelpRequestedChange,
    handleCancel,
    handleSubmit,
  };
}

export default useStudentDashboard;