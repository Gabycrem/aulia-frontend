import {apiRequest} from './api';

export function getRoleById(id){
    return apiRequest(`/api/role/findRole/${id}`);
}

export function getAllRoles(page = 1){
    return apiRequest(`/api/role/findAllRoles?page=${page}`);
}