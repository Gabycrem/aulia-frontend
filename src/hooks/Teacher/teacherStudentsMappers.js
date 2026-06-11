export function normalizeTeacherStudentsResponse(response) {
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

function getStudentSource(studentItem) {
  return studentItem.Student || studentItem.student || studentItem;
}

function getStudentUser(studentItem) {
  const student = getStudentSource(studentItem);

  return student.User || student.user || studentItem.User || studentItem.user;
}

function getStudentCourse(studentItem) {
  const student = getStudentSource(studentItem);

  return (
    student.Course ||
    student.course ||
    studentItem.Course ||
    studentItem.course ||
    null
  );
}

function getStudentSubject(studentItem) {
  return (
    studentItem.Subject ||
    studentItem.subject ||
    studentItem.Assignment?.Subject ||
    studentItem.assignment?.subject ||
    null
  );
}

export function mapTeacherStudentToRow(studentItem) {
  const student = getStudentSource(studentItem);
  const user = getStudentUser(studentItem);
  const course = getStudentCourse(studentItem);
  const subject = getStudentSubject(studentItem);

  const firstName = user?.firstName || student.firstName || "";
  const lastName = user?.lastName || student.lastName || "";

  const courseLabel = course
    ? [course.grade, course.division, course.level].filter(Boolean).join(" ")
    : student.courseId || studentItem.courseId
      ? `Curso ID ${student.courseId || studentItem.courseId}`
      : "Sin curso";

  return {
    id: student.id || studentItem.studentId || studentItem.id,
    studentName: `${firstName} ${lastName}`.trim() || "Alumno sin nombre",
    courseId: course?.id || student.courseId || studentItem.courseId || "",
    course: courseLabel,
    subjectId: subject?.id || studentItem.subjectId || "",
    subject: subject?.name || "Sin materia",
    lastRequest: "Sin solicitud",
  };
}

export function buildCourseOptions(students) {
  const courses = students
    .filter((student) => student.courseId || student.course)
    .map((student) => ({
      id: student.courseId || student.course,
      value: student.courseId || student.course,
      label: student.course,
    }));

  return getUniqueOptions(courses);
}

export function buildSubjectOptions(students) {
  const subjects = students
    .filter((student) => student.subjectId || student.subject)
    .map((student) => ({
      id: student.subjectId || student.subject,
      value: student.subjectId || student.subject,
      label: student.subject,
    }));

  return getUniqueOptions(subjects);
}

function getUniqueOptions(options) {
  const uniqueOptions = new Map();

  options.forEach((option) => {
    if (!uniqueOptions.has(String(option.value))) {
      uniqueOptions.set(String(option.value), option);
    }
  });

  return Array.from(uniqueOptions.values());
}

export function normalizeTeacherAssignmentsResponse(response) {
  const assignments =
    response?.foundAssignments ||
    response?.assignments?.rows ||
    response?.assignments?.data ||
    response?.assignments ||
    response?.data?.rows ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(assignments) ? assignments : [];
}

export function mapTeacherAssignmentToSummary(assignment) {
  const course = assignment.Course || assignment.course;
  const subject = assignment.Subject || assignment.subject;

  const courseLabel = course
    ? [course.grade, course.division, course.level].filter(Boolean).join(" ")
    : assignment.courseId
      ? `Curso ID ${assignment.courseId}`
      : "Sin curso";

  return {
    id: assignment.id,
    courseId: assignment.courseId,
    subjectId: assignment.subjectId,
    course: courseLabel,
    subject: subject?.name || "Sin materia",
  };
}

export function mapTeacherStudentsWithAssignments(studentsResponse, assignmentsResponse) {
  const students = normalizeTeacherStudentsResponse(studentsResponse).map(
    mapTeacherStudentToRow
  );

  const assignments = normalizeTeacherAssignmentsResponse(assignmentsResponse).map(
    mapTeacherAssignmentToSummary
  );

  if (!assignments.length) {
    return students;
  }

  return students.flatMap((student) => {
    const studentAssignments = assignments.filter(
      (assignment) => String(assignment.courseId) === String(student.courseId)
    );

    if (!studentAssignments.length) {
      return [student];
    }

    return studentAssignments.map((assignment) => ({
      ...student,
      id: `${student.id}-${assignment.id}`,
      studentId: student.id,
      courseId: assignment.courseId,
      course: assignment.course,
      subjectId: assignment.subjectId,
      subject: assignment.subject,
    }));
  });
}