import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getCaseFileByStudentId } from "../../services/caseFileService";
import { saveReferral } from "../../services/referralService";
import { getStudentsByTeacher } from "../../services/studentService";
import { getSessionUser } from "../../utils/session";

import {
  referralCategories,
  REFERRAL_PENDING_STATUS,
} from "../../data/referralCategories";


function getStudentName(student) {
  const user = student.User || student.user;

  const firstName = user?.firstName || student.firstName || "";
  const lastName = user?.lastName || student.lastName || "";

  return `${firstName} ${lastName}`.trim() || `Alumno ${student.id}`;
}

function getStudentCourse(student) {
  const course = student.Course || student.course;

  if (course?.grade && course?.division) {
    return `${course.grade} ${course.division}`;
  }

  if (student.courseId) {
    return `Curso ID ${student.courseId}`;
  }

  return "Sin curso";
}

function normalizeStudentsResponse(response) {
  const students =
    response?.data ||
    response?.students ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(students) ? students : [];
}

function normalizeCaseFileResponse(response) {
  return response?.data || response?.caseFile || response || null;
}

function useTeacherReferralForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionUser = useMemo(() => getSessionUser(), []);

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: searchParams.get("studentId") || "",
    category: "",
    description: "",
  });

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadStudents() {
      if (!sessionUser?.id) {
        setError("No se pudo identificar al docente logueado.");
        return;
      }

      try {
        setLoadingStudents(true);
        setError("");

        const response = await getStudentsByTeacher(sessionUser.id);
        const mappedStudents = normalizeStudentsResponse(response).map(
          (student) => ({
            id: student.id,
            name: getStudentName(student),
            course: getStudentCourse(student),
          })
        );

        setStudents(mappedStudents);
      } catch (error) {
        setError(error.message || "Error al cargar los alumnos asignados.");
      } finally {
        setLoadingStudents(false);
      }
    }

    loadStudents();
  }, [sessionUser?.id]);

  const selectedStudent = students.find(
    (student) => String(student.id) === String(formData.studentId)
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!sessionUser?.id) {
      setError("No se pudo identificar al docente logueado.");
      return;
    }

    if (!formData.studentId || !formData.category || !formData.description.trim()) {
      setError("Completá alumno, categoría y descripción para enviar la solicitud.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccessMessage("");

      const caseFileResponse = await getCaseFileByStudentId(formData.studentId);
      const caseFile = normalizeCaseFileResponse(caseFileResponse);

      if (!caseFile?.id) {
        throw new Error("No se pudo obtener el legajo del alumno seleccionado.");
      }

      await saveReferral({
        studentId: Number(formData.studentId),
        referrerId: Number(sessionUser.id),
        caseFileId: Number(caseFile.id),
        category: formData.category,
        description: formData.description.trim(),
        status: REFERRAL_PENDING_STATUS,
      });

      setSuccessMessage("Solicitud de intervención enviada correctamente.");

      setFormData({
        studentId: "",
        category: "",
        description: "",
      });
    } catch (error) {
      setError(error.message || "Error al enviar la solicitud de intervención.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    navigate("/dashboard/docente");
  }

  return {
    students,
    referralCategories,
    selectedStudent,
    formData,
    loadingStudents,
    submitting,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}

export default useTeacherReferralForm;