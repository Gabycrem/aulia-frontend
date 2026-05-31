import { apiRequest } from "./api";

export function saveReferralHistory(historyData) {
  return apiRequest("/api/referral-history", {
    method: "POST",
    body: JSON.stringify(historyData),
  });
}

export function getReferralHistoryByReferral(referralId) {
  return apiRequest(`/api/referral-history/referral/${referralId}`);
}