import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReferrals } from "../../services/referralService";
import { getStudentById } from "../../services/studentService";
import {
  mapReferralToGabCaseRow,
  normalizeReferralsResponse,
} from "./gabStudentsMappers";

function useGabStudents() {
  const navigate = useNavigate();

  const [casesData, setCasesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGabStudents() {
      try {
        setLoading(true);
        setError("");

        const response = await getReferrals();
        const referrals = normalizeReferralsResponse(response);

        const mappedCases = await Promise.all(
          referrals.map(async (referral) => {
            if (!referral.studentId) {
              return mapReferralToGabCaseRow(referral);
            }

            try {
              const studentResponse = await getStudentById(referral.studentId);
              const student =
                studentResponse?.student ||
                studentResponse?.data ||
                studentResponse;

              return mapReferralToGabCaseRow(referral, student);
            } catch {
              return mapReferralToGabCaseRow(referral);
            }
          })
        );

        setCasesData(mappedCases);
      } catch (error) {
        setError(error.message || "Error al cargar alumnos y derivaciones");
        setCasesData([]);
      } finally {
        setLoading(false);
      }
    }

    loadGabStudents();
  }, []);

  const cases = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return casesData;
    }

    return casesData.filter((caseItem) =>
      [
        caseItem.studentName,
        caseItem.course,
        caseItem.source,
        caseItem.reason,
        caseItem.priority,
        caseItem.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [casesData, searchTerm]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearch() {
    return cases;
  }

  function handleViewCase(caseItem) {
    if (!caseItem.studentId) {
      setError("No se pudo identificar el alumno asociado");
      return;
    }

    navigate(`/dashboard/gabinete/alumnos/${caseItem.studentId}/caso`);
  }

  function handleEditCase(caseItem) {
    if (!caseItem.referralId) {
      setError("No se pudo identificar la derivación asociada");
      return;
    }

    navigate(`/dashboard/gabinete/derivaciones?referralId=${caseItem.referralId}`);
  }

  function handleCreateCase() {
    navigate("/dashboard/gabinete/casos/nuevo");
  }

  return {
    cases,
    searchTerm,
    loading,
    error,
    handleSearchChange,
    handleSearch,
    handleViewCase,
    handleEditCase,
    handleCreateCase,
  };
}

export default useGabStudents;