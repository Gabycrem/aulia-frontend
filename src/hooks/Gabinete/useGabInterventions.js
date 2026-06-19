import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyInterventions } from "../../services/interventionService";
import {
  mapInterventionToRow,
  normalizeInterventionsResponse,
} from "./gabInterventionMappers";

function useGabInterventions() {
  const navigate = useNavigate();

  const [interventionsData, setInterventionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInterventions() {
      try {
        setLoading(true);
        setError("");

        const response = await getMyInterventions();
        const interventions = normalizeInterventionsResponse(response);

        setInterventionsData(interventions.map(mapInterventionToRow));
      } catch (error) {
        setError(error.message || "Error al cargar intervenciones");
        setInterventionsData([]);
      } finally {
        setLoading(false);
      }
    }

    loadInterventions();
  }, []);

  function handleCreateIntervention() {
    navigate("/dashboard/gabinete/intervenciones/nueva");
  }

  return {
    interventions: interventionsData,
    loading,
    error,
    handleCreateIntervention,
  };
}

export default useGabInterventions;