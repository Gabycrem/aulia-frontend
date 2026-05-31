import { apiRequest } from "./api";

export function saveReferralMessage(referralId, messageData) {
  return apiRequest(`/api/referrals/${referralId}/messages`, {
    method: "POST",
    body: JSON.stringify(messageData),
  });
}

export function getReferralMessages(referralId) {
  return apiRequest(`/api/referrals/${referralId}/messages`);
}

export function deleteReferralMessage(messageId) {
  return apiRequest(`/api/referrals/messages/${messageId}`, {
    method: "DELETE",
  });
}