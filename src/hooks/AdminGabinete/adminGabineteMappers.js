import {
  getRoleIdByName,
  isUserInRole,
  mapUserFormDataToCreatePayload,
  mapUserFormDataToUpdatePayload,
  mapUserToDetail,
  mapUserToFormData,
  mapUserToManagementRow,
} from "../../utils/userMappers";

const GABINETE_ROLE = "Gabinete";

export function getGabineteRoleId(roles) {
  return getRoleIdByName(roles, GABINETE_ROLE);
}

export function isGabineteUser(user, gabineteRoleId) {
  return isUserInRole(user, gabineteRoleId, GABINETE_ROLE);
}

export function mapGabineteUserToRow(user) {
  const row = mapUserToManagementRow(user);

  return {
    ...row,
    gabineteName: row.fullName,
  };
}

export function mapGabineteToDetail(user) {
  const detail = mapUserToDetail(user);

  return {
    ...detail,
    gabineteName: detail.fullName,
  };
}

export function mapUserToGabineteFormData(user) {
  return mapUserToFormData(user);
}

export function mapGabineteFormDataToCreatePayload(userData) {
  return mapUserFormDataToCreatePayload(userData, GABINETE_ROLE);
}

export function mapGabineteFormDataToUpdatePayload(userData) {
  return mapUserFormDataToUpdatePayload(userData, GABINETE_ROLE);
}