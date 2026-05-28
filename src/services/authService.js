// ========================================
// Auth Service
// Pendiente de integración con backend
// ========================================

//login()
import { apiRequest } from "./api";

export async function login(credentials) {
  return apiRequest("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
//logout()

//refreshSession()