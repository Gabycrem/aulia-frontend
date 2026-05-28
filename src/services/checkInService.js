import { apiRequest } from './api';

export function saveCheckIn(checkInData) {
    return apiRequest('/api/checkIn/saveCheckIn', {
        method: 'POST',
        body: JSON.stringify(checkInData),
    });
}

export function getHelpRequests() {
    return apiRequest('/api/checkIn/helperRequest');
}

export function getDailyCheckInSummary() {
    return apiRequest('/api/checkIn/summary');
}