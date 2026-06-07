import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getActiveCourses } from "../../services/courseService";
import {
  getStudentById,
  saveStudent,
  updateStudent,
} from "../../services/studentService";
import { getUserById, updateUser } from "../../services/userService";
import { normalizeUserResponse } from "../../utils/userMappers";
import useUserForm from "../useUserForm";
import {
  initialStudentData,
  mapCoursesToOptions,
  mapStudentFormToPayload,
  mapStudentFormToUpdatePayload,
  mapStudentToEditFormData,
  mapStudentUserFormToUpdatePayload,
  normalizeCoursesResponse,
  normalizeStudentResponse,
} from "./adminStudentMappers";

function useAdminStudentForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [editUserData, setEditUserData] = useState(null);
  const [originalEditData, setOriginalEditData] = useState(null);
  const [studentData, setStudentData] = useState(initialStudentData);
  const [courseOptions, setCourseOptions] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingCurrentStudent, setLoadingCurrentStudent] = useState(false);
  const [studentError, setStudentError] = useState("");

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

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoadingCourses(true);
        setStudentError("");

        const response = await getActiveCourses();
        const courses = normalizeCoursesResponse(response);

        setCourseOptions(mapCoursesToOptions(courses));
      } catch (error) {
        setStudentError(error.message || "Error al cargar cursos");
      } finally {
        setLoadingCourses(false);
      }
    }

    loadCourses();
  }, []);

  useEffect(() => {
    async function loadStudentForEdit() {
      if (!isEditing) {
        return;
      }

      try {
        setLoadingCurrentStudent(true);
        setStudentError("");

        const response = await getStudentById(id);
        const student = normalizeStudentResponse(response);

        if (!student) {
          throw new Error("No se encontró el alumno");
        }

        const embeddedUser = student.User || student.user || null;
        const studentUserId = student.userId || student.UserId || embeddedUser?.id;

        let studentForForm = student;

        if ((!embeddedUser?.username || !embeddedUser?.email) && studentUserId) {
          const userResponse = await getUserById(studentUserId);
          const user = normalizeUserResponse(userResponse);

          if (!user) {
            throw new Error("No se encontró el usuario del alumno");
          }

          const fullUser = {
            ...embeddedUser,
            ...user,
          };

          studentForForm = {
            ...student,
            User: fullUser,
            user: fullUser,
          };
        }

        const mappedData = mapStudentToEditFormData(studentForForm);

        setEditUserData(mappedData.userData);
        setStudentData(mappedData.studentData);
        setOriginalEditData(mappedData);
      } catch (error) {
        setStudentError(error.message || "Error al cargar el alumno");
      } finally {
        setLoadingCurrentStudent(false);
      }
    }

    loadStudentForEdit();
  }, [id, isEditing]);

  function handleEditUserChange(event) {
    const { name, value, type, checked } = event.target;

    setEditUserData((currentUserData) => ({
      ...currentUserData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (studentError) setStudentError("");
  }

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

  function hasUserChanges() {
    if (!originalEditData || !editUserData) {
      return false;
    }

    return (
      editUserData.username !== originalEditData.userData.username ||
      editUserData.firstName !== originalEditData.userData.firstName ||
      editUserData.lastName !== originalEditData.userData.lastName ||
      editUserData.email !== originalEditData.userData.email ||
      editUserData.active !== originalEditData.userData.active ||
      Boolean(editUserData.password.trim())
    );
  }

  function hasStudentChanges() {
    if (!originalEditData) {
      return false;
    }

    return (
      studentData.birthDate !== originalEditData.studentData.birthDate ||
      studentData.familyConsent !== originalEditData.studentData.familyConsent ||
      Number(studentData.courseId) !== Number(originalEditData.studentData.courseId)
    );
  }

  async function handleCreateStudent(event) {
    event.preventDefault();

    if (!createdUser?.id) {
      setStudentError("Primero tenés que crear el usuario del alumno");
      setCurrentStep(1);
      return;
    }

    if (!studentData.birthDate || !studentData.courseId) {
      setStudentError("Completá fecha de nacimiento y curso");
      return;
    }

    try {
      setLoadingStudent(true);
      setStudentError("");

      await saveStudent(mapStudentFormToPayload(studentData, createdUser.id));

      navigate("/dashboard/admin/gestionar-alumnos");
    } catch (error) {
      setStudentError(error.message || "Error al crear el alumno");
    } finally {
      setLoadingStudent(false);
    }
  }

  async function handleUpdateStudent(event) {
    event.preventDefault();

    if (!editUserData) {
      setStudentError("No se pudieron cargar los datos del usuario");
      return;
    }

    if (!studentData.birthDate || !studentData.courseId) {
      setStudentError("Completá fecha de nacimiento y curso");
      return;
    }

    const shouldUpdateUser = hasUserChanges();
    const shouldUpdateStudent = hasStudentChanges();

    if (!shouldUpdateUser && !shouldUpdateStudent) {
      navigate("/dashboard/admin/gestionar-alumnos");
      return;
    }

    try {
      setLoadingStudent(true);
      setStudentError("");

      const response = await getStudentById(id);
      const currentStudent = normalizeStudentResponse(response);

      if (!currentStudent?.userId) {
        throw new Error("No se pudo identificar el usuario del alumno");
      }

      if (shouldUpdateUser) {
        await updateUser(
          currentStudent.userId,
          mapStudentUserFormToUpdatePayload(editUserData)
        );
      }

      if (shouldUpdateStudent) {
        await updateStudent(
          id,
          mapStudentFormToUpdatePayload(studentData)
        );
      }

      navigate("/dashboard/admin/gestionar-alumnos");
    } catch (error) {
      setStudentError(error.message || "Error al actualizar el alumno");
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
    isEditing,
    currentStep,

    userData,
    editUserData,
    createdUser,
    loadingUser,
    userError,
    handleUserChange,
    handleEditUserChange,
    handleCreateUser,

    studentData,
    courseOptions,
    loadingCourses,
    loadingStudent,
    loadingCurrentStudent,
    studentError,
    handleStudentChange,
    handleCourseChange,
    handleCreateStudent,
    handleUpdateStudent,

    handleCancel,
    handleBackToUserStep,
  };
}

export default useAdminStudentForm;