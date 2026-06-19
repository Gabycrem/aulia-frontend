import { apiRequest } from "./api";

export function getActiveCourses() {
  return apiRequest("/api/course/activeCourses");
}

export function getCourseById(id) {
  return apiRequest(`/api/course/findCourse/${id}`);
}

export function getCourseWithTeachers(id) {
  return apiRequest(`/api/course/findWithTeachers/${id}`);
}

export function getCourseWithStudents(id) {
  return apiRequest(`/api/course/findWithStudents/${id}`);
}

export function saveCourse(courseData) {
  return apiRequest("/api/course/saveCourse", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
}

export function deactivateCourse(id) {
  return apiRequest(`/api/course/desactiveCourse/${id}`, {
    method: "PATCH",
  });
}