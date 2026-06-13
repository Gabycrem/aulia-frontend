import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllRoles } from "../../services/roleService";
import { getAllUsersPages } from "../../services/userService";
import {
  normalizeRolesResponse,
  normalizeUsersResponse,
  normalizeUsersPagesResponse,
} from "../../utils/userMappers";
import {
  getGabineteRoleId,
  isGabineteUser,
  mapGabineteUserToRow,
} from "./adminGabineteMappers";

function useAdminGabinete() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [gabineteData, setGabineteData] = useState([]);
  const [selectedGabineteId, setSelectedGabineteId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadGabineteUsers() {
    try {
      setLoading(true);
      setError("");

      const [usersResponse, rolesResponse] = await Promise.all([
        getAllUsersPages(),
        getAllRoles(1),
      ]);

      const users = normalizeUsersPagesResponse(usersResponse);
      const roles = normalizeRolesResponse(rolesResponse);
      const gabineteRoleId = getGabineteRoleId(roles);

      if (!gabineteRoleId) {
        throw new Error("No se encontró el rol Gabinete");
      }

      const mappedUsers = users
        .filter((user) => isGabineteUser(user, gabineteRoleId))
        .map(mapGabineteUserToRow);

      setGabineteData(mappedUsers);
    } catch (error) {
      setError(error.message || "Error al cargar gabinete");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGabineteUsers();
  }, []);

  const filteredGabinete = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return gabineteData;
    }

    return gabineteData.filter((user) =>
      [user.gabineteName, user.username, user.email, user.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [gabineteData, searchTerm]);

  const selectedGabinete = filteredGabinete.find(
    (user) => user.id === selectedGabineteId
  );

  function handleSelectGabinete(gabineteId) {
    setSelectedGabineteId((currentSelectedGabineteId) =>
      currentSelectedGabineteId === gabineteId ? null : gabineteId
    );
  }

  function handleCreateGabinete() {
    navigate("/dashboard/admin/gabinete/nuevo");
  }

  function handleViewGabinete() {
    if (!selectedGabineteId) return;
    navigate(`/dashboard/admin/gabinete/${selectedGabineteId}`);
  }

  function handleEditGabinete() {
    if (!selectedGabineteId) return;
    navigate(`/dashboard/admin/gabinete/${selectedGabineteId}/editar`);
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredGabinete,
    selectedGabineteId,
    selectedGabinete,
    loading,
    error,
    handleSelectGabinete,
    handleCreateGabinete,
    handleViewGabinete,
    handleEditGabinete,
  };
}

export default useAdminGabinete;