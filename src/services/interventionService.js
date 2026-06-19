import { apiRequest } from "./api";

export function saveIntervention(interventionData) {
  return apiRequest("/api/interventions", {
    method: "POST",
    body: JSON.stringify(interventionData),
  });
}

export function getInterventionById(id) {
  return apiRequest(`/api/interventions/${id}`);
}

export function getInterventionsByCaseFile(caseFileId) {
  return apiRequest(`/api/interventions/casefile/${caseFileId}`);
}

export function getMyInterventions() {
  return apiRequest("/api/interventions/professional/me");
}

export function getInterventionsByStudent(studentId) {
  return apiRequest(`/api/interventions/student/${studentId}`);
}