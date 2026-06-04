export const initialUserData = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function normalizeUserResponse(response) {
  return response?.user || response?.data || response || null;
}

export function normalizeUsersResponse(response) {
  const users =
    response?.users?.rows ||
    response?.users?.data ||
    response?.users ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(users) ? users : [];
}

export function normalizeRolesResponse(response) {
  const roles =
    response?.roles?.rows ||
    response?.roles?.data ||
    response?.roles ||
    response?.data ||
    response?.rows ||
    response ||
    [];

  return Array.isArray(roles) ? roles : [];
}

export function getRoleIdByName(roles, roleName) {
  const role = roles.find((role) => role.name === roleName);

  return role?.id || null;
}

export function isUserInRole(user, roleId, roleName) {
  const userRoleName =
    user.Role?.name ||
    user.role?.name ||
    user.roleName ||
    user.role;

  if (userRoleName) {
    return userRoleName === roleName;
  }

  return Number(user.roleId) === Number(roleId);
}

export function mapUserToFormData(user) {
  return {
    username: user.username || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    password: "",
    active: Boolean(user.active),
  };
}

export function mapUserFormDataToCreatePayload(userData, roleName) {
  return {
    username: userData.username.trim(),
    firstName: userData.firstName.trim(),
    lastName: userData.lastName.trim(),
    email: userData.email.trim(),
    password: userData.password,
    role: roleName,
  };
}

export function mapUserFormDataToUpdatePayload(userData, roleName) {
  const payload = {
    username: userData.username.trim(),
    firstName: userData.firstName.trim(),
    lastName: userData.lastName.trim(),
    email: userData.email.trim(),
    active: userData.active,
    role: roleName,
  };

  if (userData.password.trim()) {
    payload.password = userData.password;
  }

  return payload;
}

export function mapUserToManagementRow(user, extraData = {}) {
  return {
    id: user.id,
    fullName:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Usuario sin nombre",
    username: user.username || "-",
    email: user.email || "-",
    status: user.active ? "Activo" : "Inactivo",
    ...extraData,
  };
}

export function mapUserToDetail(user) {
  return {
    id: user.id,
    fullName:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Usuario sin nombre",
    username: user.username || "-",
    email: user.email || "-",
    status: user.active ? "Activo" : "Inactivo",
  };
}