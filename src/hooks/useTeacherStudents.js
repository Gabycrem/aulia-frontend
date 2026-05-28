import { useState } from "react";
import {
  courseOptions,
  subjectOptions,
  teacherStudents,
} from "../data/teacherStudentsMock";

function useTeacherStudents() {
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedSubject, setSelectedSubject] = useState("Todas");

  /*
  DESCOMENTAR AL INTEGRAR

  const [teacherStudentsData, setTeacherStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeacherStudents() {
      try {
        setLoading(true);

        // const data = await getTeacherStudents();

        // setTeacherStudentsData(data.students || data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeacherStudents();
  }, []);
  */

  const filteredStudents = teacherStudents.filter((student) => {
    const matchesCourse =
      selectedCourse === "Todos" || student.course === selectedCourse;

    const matchesSubject =
      selectedSubject === "Todas" || student.subject === selectedSubject;

    return matchesCourse && matchesSubject;
  });

  return {
    selectedCourse,
    setSelectedCourse,
    selectedSubject,
    setSelectedSubject,
    courseOptions,
    subjectOptions,
    filteredStudents,
  };
}

export default useTeacherStudents;