import { useEffect, useState } from "react";

import useCalendarAgenda from "../useCalendarAgenda";
import { getMyInterventions } from "../../services/interventionService";
import {
  mapInterventionToAgendaItem,
  normalizeInterventionsResponse,
} from "./gabAgendaMappers";

function useGabAgenda() {
  const [agendaItems, setAgendaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  } = useCalendarAgenda(agendaItems, new Date());

  useEffect(() => {
    async function loadAgenda() {
      try {
        setLoading(true);
        setError("");

        const response = await getMyInterventions();
        const interventions = normalizeInterventionsResponse(response);

        setAgendaItems(interventions.map(mapInterventionToAgendaItem));
      } catch (error) {
        setError(error.message || "Error al cargar agenda");
        setAgendaItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadAgenda();
  }, []);

  return {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    loading,
    error,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  };
}

export default useGabAgenda;