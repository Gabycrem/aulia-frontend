import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getUserById,
  saveUser,
  updateUser,
} from "../../services/userService";
import {
  mapTeacherFormDataToCreatePayload,
  mapTeacherFormDataToUpdatePayload,
  mapUserToTeacherFormData,
} from "./adminTeacherMappers";
import {
  initialUserData, 
  normalizeUserResponse,
 } from "../../utils/userMappers";

function useAdminTeacherForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeacher() {
      if (!isEditing) {
        return;
      }

      try {
        setLoadingUser(true);
        setError("");

        const response = await getUserById(id);
        const user = normalizeUserResponse(response);

        if (!user) {
          throw new Error("No se encontró el docente");
        }

        setUserData(mapUserToTeacherFormData(user));
      } catch (error) {
        setError(error.message || "Error al cargar el docente");
      } finally {
        setLoadingUser(false);
      }
    }

    loadTeacher();
  }, [id, isEditing]);

  function handleUserChange(event) {
    const { name, value, type, checked } = event.target;

    setUserData((currentUserData) => ({
      ...currentUserData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (isEditing) {
        await updateUser(id, mapTeacherFormDataToUpdatePayload(userData));
      } else {
        await saveUser(mapTeacherFormDataToCreatePayload(userData));
      }

      navigate("/dashboard/admin/gestionar-docentes");
    } catch (error) {
      setError(error.message || "Error al guardar el docente");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/dashboard/admin/gestionar-docentes");
  }

  return {
    isEditing,
    userData,
    loading,
    loadingUser,
    error,
    handleUserChange,
    handleSubmit,
    handleCancel,
  };
}

export default useAdminTeacherForm;