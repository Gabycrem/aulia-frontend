import { useCallback, useState } from "react";
import {
  getActiveStudents,
  getAllStudents,
  getStudentById,
} from "../services/studentService";

function normalizeStudentsResponse(response) {
  const students =
    response?.data ||
    response?.students ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(students) ? students : [];
}

function normalizeStudentResponse(response) {
  return response?.data || response?.student || response || null;
}

function useStudents() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadActiveStudents = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getActiveStudents(page);
      const data = normalizeStudentsResponse(response);

      setStudents(data);
      return data;
    } catch (error) {
      setError(error.message || "Error al cargar los alumnos");
      setStudents([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllStudents = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllStudents(page);
      const data = normalizeStudentsResponse(response);

      setStudents(data);
      return data;
    } catch (error) {
      setError(error.message || "Error al cargar los alumnos");
      setStudents([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStudentById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await getStudentById(id);
      const data = normalizeStudentResponse(response);

      setStudent(data);
      return data;
    } catch (error) {
      setError(error.message || "Error al cargar el alumno");
      setStudent(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    student,
    loading,
    error,
    loadActiveStudents,
    loadAllStudents,
    loadStudentById,
  };
}

export default useStudents;