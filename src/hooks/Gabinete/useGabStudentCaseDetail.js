import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../services/studentService";
import {
  getCaseFileByStudentId,
  saveCaseFile,
} from "../../services/caseFileService";
import { getInterventionsByCaseFile } from "../../services/interventionService";

function normalizeResponse(response, key) {
  return response?.data || response?.[key] || response || null;
}

function normalizeListResponse(response, key) {
  const data =
    response?.data ||
    response?.[key] ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(data) ? data : [];
}

function useGabStudentCaseDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [caseFile, setCaseFile] = useState(null);
  const [interventions, setInterventions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [creatingCaseFile, setCreatingCaseFile] = useState(false);
  const [error, setError] = useState("");
  const [caseFileError, setCaseFileError] = useState("");

  async function loadInterventions(caseFileId) {
    const interventionsResponse = await getInterventionsByCaseFile(caseFileId);

    const interventionsData = normalizeListResponse(
      interventionsResponse,
      "interventions"
    );

    setInterventions(interventionsData);
  }

  useEffect(() => {
    async function loadCaseDetail() {
      if (!studentId) {
        setError("No se encontró el alumno solicitado");
        return;
      }

      try {
        setLoading(true);
        setError("");
        setCaseFileError("");
        setStudent(null);
        setCaseFile(null);
        setInterventions([]);

        const studentResponse = await getStudentById(studentId);
        const studentData = normalizeResponse(studentResponse, "student");

        setStudent(studentData);

        try {
          const caseFileResponse = await getCaseFileByStudentId(studentId);
          const caseFileData = normalizeResponse(caseFileResponse, "caseFile");

          setCaseFile(caseFileData || null);

          if (caseFileData?.id) {
            try {
              await loadInterventions(caseFileData.id);
            } catch {
              setInterventions([]);
            }
          }
        } catch (error) {
          setCaseFile(null);
          setInterventions([]);

          if (error.status === 404) {
            setCaseFileError("");
            return;
          }

          setCaseFileError(
            error.message || "No se pudo cargar el legajo del alumno"
          );
        }
      } catch (error) {
        setError(error.message || "Error al cargar el caso del alumno");
      } finally {
        setLoading(false);
      }
    }

    loadCaseDetail();
  }, [studentId]);

  async function handleCreateCaseFile() {
    if (!studentId) {
      setCaseFileError("No se encontró el alumno para crear el legajo");
      return;
    }

    try {
      setCreatingCaseFile(true);
      setCaseFileError("");

      const response = await saveCaseFile({ studentId: Number(studentId) });
      const createdCaseFile = normalizeResponse(response, "caseFile");

      setCaseFile(createdCaseFile || null);
      setInterventions([]);

      if (createdCaseFile?.id) {
        try {
          await loadInterventions(createdCaseFile.id);
        } catch {
          setInterventions([]);
        }
      }
    } catch (error) {
      setCaseFileError(error.message || "No se pudo crear el legajo");
    } finally {
      setCreatingCaseFile(false);
    }
  }

  function handleBack() {
    navigate("/dashboard/gabinete/alumnos");
  }

  function handleCreateIntervention() {
    navigate(`/dashboard/gabinete/alumnos/${studentId}/intervencion/nueva`);
  }

  return {
    student,
    caseFile,
    interventions,
    loading,
    creatingCaseFile,
    error,
    caseFileError,
    handleBack,
    handleCreateCaseFile,
    handleCreateIntervention,
  };
}

export default useGabStudentCaseDetail;