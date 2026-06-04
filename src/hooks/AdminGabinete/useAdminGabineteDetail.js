import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUserById } from "../../services/userService";
import { normalizeUserResponse } from "../../utils/userMappers";
import { mapGabineteToDetail } from "./adminGabineteMappers";

function useAdminGabineteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gabineteUser, setGabineteUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGabineteDetail() {
      try {
        setLoading(true);
        setError("");

        const response = await getUserById(id);
        const user = normalizeUserResponse(response);

        if (!user) {
          throw new Error("No se encontró el usuario de gabinete");
        }

        setGabineteUser(mapGabineteToDetail(user));
      } catch (error) {
        setError(error.message || "Error al cargar detalle de gabinete");
      } finally {
        setLoading(false);
      }
    }

    loadGabineteDetail();
  }, [id]);

  function handleBack() {
    navigate("/dashboard/admin/gestionar-gabinete");
  }

  function handleEdit() {
    navigate(`/dashboard/admin/gabinete/${id}/editar`);
  }

  return {
    gabineteUser,
    loading,
    error,
    handleBack,
    handleEdit,
  };
}

export default useAdminGabineteDetail;