// Catálogos hardcodeados a falta de endpoint que exponga enums de cursos
/* Ejemplos que podrían ser:
GET /api/course/levels
GET /api/course/grades
GET /api/catalogs/courses
*/

export const courseLevelOptions = [
  { id: "Primaria", value: "Primaria", label: "Primaria" },
  { id: "Secundaria", value: "Secundaria", label: "Secundaria" },
  { id: "Jardín", value: "Jardín", label: "Jardín" },
];

export const schoolGradeOptions = [
  { id: "1° Año", value: "1° Año", label: "1° Año" },
  { id: "2° Año", value: "2° Año", label: "2° Año" },
  { id: "3° Año", value: "3° Año", label: "3° Año" },
  { id: "4° Año", value: "4° Año", label: "4° Año" },
  { id: "5° Año", value: "5° Año", label: "5° Año" },
  { id: "6° Año", value: "6° Año", label: "6° Año" },
  { id: "7° Año", value: "7° Año", label: "7° Año" },
];