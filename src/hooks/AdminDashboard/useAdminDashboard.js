import { useEffect, useState } from "react";

import { getActiveCourses } from "../../services/courseService";
import { getAllRoles } from "../../services/roleService";
import { getAllStudents } from "../../services/studentService";
import { getAllSubjects } from "../../services/subjectService";
import { getAllUsers } from "../../services/userService";
import {
  buildAdminMetrics,
  buildManagementCards,
  normalizeAdminDashboardData,
} from "./adminDashboardMappers";

function useAdminDashboard() {
  const [adminMetrics, setAdminMetrics] = useState([]);
  const [managementCards, setManagementCards] = useState([]);
  const [adminActivity, setAdminActivity] = useState([]);
  const [systemActivity, setSystemActivity] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          usersResponse,
          rolesResponse,
          studentsResponse,
          coursesResponse,
          subjectsResponse,
        ] = await Promise.all([
          getAllUsers(1),
          getAllRoles(1),
          getAllStudents(1),
          getActiveCourses(),
          getAllSubjects(),
        ]);

        const dashboardData = normalizeAdminDashboardData({
          usersResponse,
          rolesResponse,
          studentsResponse,
          coursesResponse,
          subjectsResponse,
        });

        setAdminMetrics(buildAdminMetrics(dashboardData));
        setManagementCards(buildManagementCards(dashboardData));

        setAdminActivity([
          {
            id: "students",
            description: `${dashboardData.totals.students} alumnos registrados`,
            createdAt: "Datos actuales",
          },
          {
            id: "users",
            description: `${dashboardData.totals.users} usuarios cargados`,
            createdAt: "Datos actuales",
          },
        ]);

        setSystemActivity([
          {
            id: "courses",
            time: "Cursos",
            description: `${dashboardData.totals.courses} cursos activos`,
          },
          {
            id: "subjects",
            time: "Materias",
            description: `${dashboardData.totals.subjects} materias cargadas`,
          },
        ]);
      } catch (error) {
        setError(error.message || "Error al cargar dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return {
    adminMetrics,
    managementCards,
    adminActivity,
    systemActivity,
    loading,
    error,
  };
}

export default useAdminDashboard;