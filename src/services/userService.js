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

export async function getAllUsersPages() {
  const firstResponse = await getAllUsers(1);
  const totalPages = firstResponse?.totalPages || 1;

  if (totalPages <= 1) {
    return [firstResponse];
  }

  const pageRequests = [];

  for (let page = 2; page <= totalPages; page += 1) {
    pageRequests.push(getAllUsers(page));
  }

  const responses = await Promise.all(pageRequests);

  return [firstResponse, ...responses];
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