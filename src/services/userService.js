import {apiRequest} from './api';

export function saveUser(userData){
    return apiRequest('/api/user/saveUser',{
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export function getUserById(id) {
    return apiRequest(`/api/user/findUser/${id}`);
}

export function getActiveUsers(page = 1) {
    return apiRequest(`/api/user/activeUsers?page=${page}`);
}

export function getAllUsers(page = 1) {
    return apiRequest(`/api/user/findUsers?page=${page}`);
}

export function updateUser(id, userData) {
    return apiRequest(`/api/user/updateUser/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
}

export function deleteUser(id) {
    return apiRequest(`/api/user/deleteUser/${id}`, {
        method: 'DELETE',
    });
}