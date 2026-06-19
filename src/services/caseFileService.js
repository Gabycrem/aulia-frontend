import { apiRequest } from "./api";

export function saveCaseFile(caseFileData) {
  return apiRequest("/api/casefiles", {
    method: "POST",
    body: JSON.stringify(caseFileData),
  });
}

export function getOpenCaseFiles() {
  return apiRequest("/api/caseFiles");
}

export function getCaseFileByStudentId(studentId) {
  return apiRequest(`/api/casefiles/student/${studentId}`);
}

export function getCaseFileById(id) {
  return apiRequest(`/api/casefiles/${id}`);
}

export function closeCaseFile(id) {
  return apiRequest(`/api/casefiles/${id}/close`, {
    method: "PATCH",
  });
}

export function reopenCaseFile(id) {
  return apiRequest(`/api/casefiles/${id}/reopen`, {
    method: "PATCH",
  });
}