import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveStudent } from "../../services/studentService";
import useUserForm from "../useUserForm";

const initialStudentData = {
  birthDate: "",
  familyConsent: false,
  courseId: "",
};

const courseOptions = [
  {
    id: 1,
    value: 1,
    label: "3° Año A",
  },
];

function useAdminStudentForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [studentData, setStudentData] = useState(initialStudentData);
  const [studentError, setStudentError] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);

  const {
    userData,
    createdUser,
    loadingUser,
    userError,
    handleUserChange,
    handleCreateUser,
  } = useUserForm({
    role: "Alumno",
    onSuccess: () => setCurrentStep(2),
  });

  function handleStudentChange(event) {
    const { name, value, type, checked } = event.target;

    setStudentData((currentStudentData) => ({
      ...currentStudentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (studentError) setStudentError("");
  }

  function handleCourseChange(option) {
    setStudentData((currentStudentData) => ({
      ...currentStudentData,
      courseId: option.id,
    }));

    if (studentError) setStudentError("");
  }

  async function handleCreateStudent(event) {
    event.preventDefault();

    if (!createdUser?.id) {
      setStudentError("Primero tenés que crear el usuario del alumno");
      setCurrentStep(1);
      return;
    }

    try {
      setLoadingStudent(true);
      setStudentError("");

      const newStudentData = {
        userId: Number(createdUser.id),
        birthDate: studentData.birthDate,
        familyConsent: studentData.familyConsent,
        courseId: Number(studentData.courseId),
      };

      await saveStudent(newStudentData);

      navigate("/dashboard/admin/gestionar-alumnos");
    } catch (error) {
      setStudentError(error.message || "Error al crear el alumno");
    } finally {
      setLoadingStudent(false);
    }
  }

  function handleCancel() {
    navigate("/dashboard/admin/gestionar-alumnos");
  }

  function handleBackToUserStep() {
    setCurrentStep(1);
  }

  return {
    currentStep,

    userData,
    createdUser,
    loadingUser,
    userError,
    handleUserChange,
    handleCreateUser,

    studentData,
    courseOptions,
    loadingStudent,
    studentError,
    handleStudentChange,
    handleCourseChange,
    handleCreateStudent,

    handleCancel,
    handleBackToUserStep,
  };
}

export default useAdminStudentForm;