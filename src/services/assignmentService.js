import { apiRequest } from './api';

export function saveAssignment(assignmentData) {
    return apiRequest('/api/assignment/saveAssignment', {
        method: 'POST',
        body: JSON.stringify(assignmentData),
    });
}

export function getAssignmentById(id) {
    return apiRequest(`/api/assignment/subjectId/${id}`);
}

export function getAllAssignments(page = 1) {
    return apiRequest(`/api/assignment/assignments?page=${page}`);
}

export function updateAssignment(id, assignmentData) {
    return apiRequest(`/api/assignment/updateAssignment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(assignmentData),
    });
}

export function deleteAssignment(id) {
    return apiRequest(`/api/assignment/deleteAssignment/${id}`, {
        method: 'DELETE',
    });
}