import { apiRequest } from './api';

export function saveStudent(studentData) {
    return apiRequest('/api/student/saveStudent', {
        method: 'POST',
        body: JSON.stringify(studentData),
    });
}

export function getStudentById(id) {
    return apiRequest(`/api/student/studentId/${id}`);
}

export function getStudentByUserId(userId) {
    return apiRequest(`/api/student/byUser/${userId}`);
}

export function getStudentsWithoutActiveCase(page = 1) {
    return apiRequest(`/api/student/withoutActiveCase?page=${page}`);
}

export function getStudentsByTeacher(teacherId, page = 1) {
  return apiRequest(`/api/student/studentsByTeacher/${teacherId}?page=${page}`);
}

export function getActiveStudents(page = 1) {
    return apiRequest(`/api/student/activeStudents?page=${page}`);
}

export function getAllStudents(page = 1) {
    return apiRequest(`/api/student/students?page=${page}`);
}

export function updateStudent(id, studentData) {
    return apiRequest(`/api/student/updateStudent/${id}`, {
        method: 'PUT',
        body: JSON.stringify(studentData),
    });
}

export function deleteStudent(id) {
    return apiRequest(`/api/student/deleteStudent/${id}`, {
        method: 'DELETE',
    });
}