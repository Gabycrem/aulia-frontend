import { apiRequest } from "./api";

export function saveReferral(referralData) {
  return apiRequest("/api/referrals", {
    method: "POST",
    body: JSON.stringify(referralData),
  });
}

export function getReferrals() {
  return apiRequest('/api/referrals');
}

export function getReferralById(id) {
  return apiRequest(`/api/referrals/${id}`);
}

export function acceptReferral(id, notes) {
  return apiRequest(`/api/referrals/${id}/accept`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });
}

export function rejectReferral(id, notes) {
  return apiRequest(`/api/referrals/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });
}

export function requestReferralInfo(id, notes) {
  return apiRequest(`/api/referrals/${id}/request-info`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });
}

export function getReferralsByTeacher(teacherId) {
  return apiRequest(`/api/referrals/byTeacher/${teacherId}`);
}