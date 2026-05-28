import { useState } from "react";
//import { useEffect, useState } from "react"; CAMBIAR AL INTEGRAR
import {
  students,
  courseOptions,
  statusOptions,
} from "../data/adminStudentsMock";
/*
import { getAllStudents } from "../services/studentService";
*/

function useAdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  /* DESCOMENTAR AL INTEGRAR
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const data = await getAllStudents(1);

        // setStudentsData(data.students || data.data || []);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);
  */

  //MODIFICAR students por studentsData al integrar
  const filteredStudents = students.filter((student) => {  
    const matchesSearch = student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourse === "Todos" || student.course === selectedCourse;

    const matchesStatus =
      selectedStatus === "Todos" || student.status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCourse,
    setSelectedCourse,
    selectedStatus,
    setSelectedStatus,
    courseOptions,
    statusOptions,
    filteredStudents,
  };
}

export default useAdminStudents;