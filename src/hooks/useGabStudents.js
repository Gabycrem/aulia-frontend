import { cases } from "../data/gabStudentsMock";

function useGabStudents() {
  /*
  DESCOMENTAR AL INTEGRAR

  const [casesData, setCasesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCases() {
      try {
        setLoading(true);

        // const data = await getGabCases();

        // setCasesData(data.cases || data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);
  */

  const handleSearch = () => {
    window.alert("Buscar alumno");
  };

  const handleViewCase = (caseItem) => {
    window.alert(`Ver caso de ${caseItem.studentName}`);
  };

  const handleEditCase = (caseItem) => {
    window.alert(`Editar caso de ${caseItem.studentName}`);
  };

  const handleCreateCase = () => {
    window.alert("Crear nuevo caso");
  };

  return {
    cases,
    handleSearch,
    handleViewCase,
    handleEditCase,
    handleCreateCase,
  };
}

export default useGabStudents;