import { apiRequest } from './api';

export function saveSubject(subjectData) {
    return apiRequest('/api/subject/saveSubject', {
        method: 'POST',
        body: JSON.stringify(subjectData),
    });
}

export function getSubjectById(id) {
    return apiRequest(`/api/subject/subjectId/${id}`);
}

export function getAllSubjects(page = 1) {
    return apiRequest(`/api/subject/subjects?page=${page}`);
}

export function updateSubject(id, subjectData) {
    return apiRequest(`/api/subject/updateSubject/${id}`, {
        method: 'PUT',
        body: JSON.stringify(subjectData),
    });
}

export function deleteSubject(id) {
    return apiRequest(`/api/subject/deleteSubject/${id}`, {
        method: 'DELETE',
    });
}