import { useEffect, useState } from "react";

import { getAllRoles } from "../../services/roleService";
import { normalizeRolesResponse } from "../../utils/userMappers";

function mapRoleToRow(role) {
  return {
    id: role.id,
    name: role.name || "Rol sin nombre",
  };
}

function useAdminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoles() {
      try {
        setLoading(true);
        setError("");

        const response = await getAllRoles(1);
        const mappedRoles = normalizeRolesResponse(response).map(mapRoleToRow);

        setRoles(mappedRoles);
      } catch (error) {
        setError(error.message || "Error al cargar roles");
      } finally {
        setLoading(false);
      }
    }

    loadRoles();
  }, []);

  return {
    roles,
    loading,
    error,
  };
}

export default useAdminRoles;