import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getUserById,
  saveUser,
  updateUser,
} from "../../services/userService";
import {
  initialUserData,
  normalizeUserResponse,
} from "../../utils/userMappers";
import {
  mapGabineteFormDataToCreatePayload,
  mapGabineteFormDataToUpdatePayload,
  mapUserToGabineteFormData,
} from "./adminGabineteMappers";

function useAdminGabineteForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGabineteUser() {
      if (!isEditing) return;

      try {
        setLoadingUser(true);
        setError("");

        const response = await getUserById(id);
        const user = normalizeUserResponse(response);

        if (!user) {
          throw new Error("No se encontró el usuario de gabinete");
        }

        setUserData(mapUserToGabineteFormData(user));
      } catch (error) {
        setError(error.message || "Error al cargar usuario de gabinete");
      } finally {
        setLoadingUser(false);
      }
    }

    loadGabineteUser();
  }, [id, isEditing]);

  function handleUserChange(event) {
    const { name, value, type, checked } = event.target;

    setUserData((currentUserData) => ({
      ...currentUserData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (isEditing) {
        await updateUser(id, mapGabineteFormDataToUpdatePayload(userData));
      } else {
        await saveUser(mapGabineteFormDataToCreatePayload(userData));
      }

      navigate("/dashboard/admin/gestionar-gabinete");
    } catch (error) {
      setError(error.message || "Error al guardar usuario de gabinete");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/dashboard/admin/gestionar-gabinete");
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

export default useAdminGabineteForm;