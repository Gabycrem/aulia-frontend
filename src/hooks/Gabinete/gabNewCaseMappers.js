export function normalizeStudentsResponse(response) {
  const students =
    response?.students?.rows ||
    response?.students?.data ||
    response?.students ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(students) ? students : [];
}

export function mapStudentToOption(student) {
  const user = student.User || student.user;

  const studentName =
    `${user?.firstName || student.firstName || ""} ${
      user?.lastName || student.lastName || ""
    }`.trim() || `Alumno ${student.id}`;

  return {
    id: student.id,
    value: student.id,
    label: studentName,
  };
}