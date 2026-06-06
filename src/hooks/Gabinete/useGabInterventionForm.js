import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionUser } from "../../utils/session";
import { getCaseFileByStudentId } from "../../services/caseFileService";
import { saveIntervention } from "../../services/interventionService";
import { getActiveStudents, getStudentById } from "../../services/studentService";

import {
  initialInterventionData,
  interventionTypeOptions,
  mapInterventionFormToPayload,
  mapStudentToOption,
  mapStudentToSummary,
  normalizeCaseFileResponse,
  normalizeStudentResponse,
  normalizeStudentsResponse,
} from "./gabInterventionMappers";

function useGabInterventionForm() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const sessionUser = useMemo(() => getSessionUser(), []);
  const [student, setStudent] = useState(null);
  const [studentOptions, setStudentOptions] = useState([]);
  const [caseFile, setCaseFile] = useState(null);
  const [interventionData, setInterventionData] = useState({
    ...initialInterventionData,
    studentId: studentId || "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const hasPreselectedStudent = Boolean(studentId);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        if (studentId) {
          const [studentResponse, caseFileResponse] = await Promise.all([
            getStudentById(studentId),
            getCaseFileByStudentId(studentId),
          ]);

          const studentData = normalizeStudentResponse(studentResponse);
          const caseFileData = normalizeCaseFileResponse(caseFileResponse);

          if (!studentData) throw new Error("No se encontró el alumno");
          if (!caseFileData?.id) throw new Error("El alumno no tiene legajo abierto");

          setStudent(mapStudentToSummary(studentData));
          setCaseFile(caseFileData);
          return;
        }

        const studentsResponse = await getActiveStudents();
        setStudentOptions(normalizeStudentsResponse(studentsResponse).map(mapStudentToOption));
      } catch (error) {
        setError(error.message || "Error al cargar datos de intervención");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [studentId]);

  function handleInterventionChange(event) {
    const { name, value } = event.target;
    setInterventionData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  }

  async function handleStudentChange(option) {
    const selectedStudentId = option?.value || "";

    setInterventionData((current) => ({
      ...current,
      studentId: selectedStudentId,
    }));

    setCaseFile(null);
    setStudent(null);

    if (!selectedStudentId) return;

    try {
      const [studentResponse, caseFileResponse] = await Promise.all([
        getStudentById(selectedStudentId),
        getCaseFileByStudentId(selectedStudentId),
      ]);

      setStudent(mapStudentToSummary(normalizeStudentResponse(studentResponse)));
      setCaseFile(normalizeCaseFileResponse(caseFileResponse));
    } catch {
      setError("El alumno seleccionado no tiene legajo abierto");
    }
  }

  function handleTypeChange(option) {
    setInterventionData((current) => ({
      ...current,
      type: option?.value || "",
    }));
    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !interventionData.studentId ||
      !interventionData.title.trim() ||
      !interventionData.type ||
      !interventionData.description.trim() ||
      !interventionData.interventionDate
    ) {
      setError("Completá alumno, título, tipo, descripción y fecha");
      return;
    }

    if (!caseFile?.id) {
      setError("El alumno seleccionado no tiene legajo abierto");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = mapInterventionFormToPayload({
        interventionData,
        caseFile,
      });

      console.log("INTERVENTION PAYLOAD:", payload);

      await saveIntervention(
        mapInterventionFormToPayload({
          interventionData,
          caseFile,
          professionalId: sessionUser.id,
        })
      );

      navigate("/dashboard/gabinete/intervenciones");
    } catch (error) {
      setError(error.message || "Error al registrar la intervención");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (studentId) {
      navigate(`/dashboard/gabinete/alumnos/${studentId}/caso`);
      return;
    }

    navigate("/dashboard/gabinete/intervenciones");
  }

  return {
    student,
    studentOptions,
    interventionData,
    interventionTypeOptions,
    hasPreselectedStudent,
    loading,
    saving,
    error,
    handleStudentChange,
    handleInterventionChange,
    handleTypeChange,
    handleSubmit,
    handleCancel,
  };
}

export default useGabInterventionForm;