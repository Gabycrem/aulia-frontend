import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersPages } from "../../services/userService";
import { getAllAssignments } from "../../services/assignmentService";
import { getAllRoles } from "../../services/roleService";
import {
  countAssignmentsByTeacher,
  getTeacherRoleId,
  isTeacherUser,
  mapTeacherUserToRow,
  normalizeAssignmentsResponse,
} from "./adminTeacherMappers";
import {
  normalizeRolesResponse,
  normalizeUsersResponse,
  normalizeUsersPagesResponse,
} from "../../utils/userMappers";

function useAdminTeachers() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [teachersData, setTeachersData] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadTeachers() {
    try {
      setLoading(true);
      setError("");

      const [usersResponse, rolesResponse, assignmentsResponse] =
        await Promise.all([
          getAllUsersPages(),
          getAllRoles(1),
          getAllAssignments(1),
        ]);

      const users = normalizeUsersPagesResponse(usersResponse);
      const roles = normalizeRolesResponse(rolesResponse);
      const assignments = normalizeAssignmentsResponse(assignmentsResponse);

      const teacherRoleId = getTeacherRoleId(roles);

      if (!teacherRoleId) {
        throw new Error("No se encontró el rol Docente");
      }

      const assignmentCounts = countAssignmentsByTeacher(assignments);

      const mappedTeachers = users
        .filter((user) => isTeacherUser(user, teacherRoleId))
        .map((user) => mapTeacherUserToRow(user, assignmentCounts));

      setTeachersData(mappedTeachers);
    } catch (error) {
      setError(error.message || "Error al cargar docentes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return teachersData;
    }

    return teachersData.filter((teacher) =>
      [
        teacher.teacherName,
        teacher.username,
        teacher.email,
        teacher.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [teachersData, searchTerm]);

  const selectedTeacher = filteredTeachers.find(
    (teacher) => teacher.id === selectedTeacherId
  );

  function handleSelectTeacher(teacherId) {
    setSelectedTeacherId((currentSelectedTeacherId) =>
      currentSelectedTeacherId === teacherId ? null : teacherId
    );
  }

  function handleCreateTeacher() {
    navigate("/dashboard/admin/docentes/nuevo");
  }

  function handleViewTeacher() {
    if (!selectedTeacherId) return;
    navigate(`/dashboard/admin/docentes/${selectedTeacherId}`);
  }

  function handleEditTeacher() {
    if (!selectedTeacherId) return;
    navigate(`/dashboard/admin/docentes/${selectedTeacherId}/editar`);
  }

  function handleManageAssignments() {
    if (!selectedTeacherId) return;
    navigate(`/dashboard/admin/docentes/${selectedTeacherId}/asignaciones`);
  }

  return {
    searchTerm,
    setSearchTerm,

    filteredTeachers,
    selectedTeacherId,
    selectedTeacher,

    loading,
    error,

    handleSelectTeacher,
    handleCreateTeacher,
    handleViewTeacher,
    handleEditTeacher,
    handleManageAssignments,
  };
}

export default useAdminTeachers;