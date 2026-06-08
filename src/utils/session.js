export function getSessionUser() {
  const storedUser = sessionStorage.getItem("aulia_user");

  if (!storedUser) {
    return null;
  }

  try {
    const sessionUser = JSON.parse(storedUser);
    const decodedToken = decodeToken(sessionUser.token);

    return {
      ...decodedToken,
      ...sessionUser,
      id: sessionUser.id || decodedToken?.id,
    };
  } catch {
    clearSession();
    return null;
  }
}

export function getSessionToken() {
  const sessionUser = getSessionUser();

  return sessionUser?.token || null;
}

export function clearSession() {
  sessionStorage.removeItem("aulia_user");
}

export function isTokenExpired(token) {
  const decodedToken = decodeToken(token);

  if (!decodedToken?.exp) {
    return true;
  }

  return Date.now() >= decodedToken.exp * 1000;
}

export function hasValidSession() {
  const token = getSessionToken();

  if (!token) {
    return false;
  }

  return !isTokenExpired(token);
}

function decodeToken(token) {
  if (!token) {
    return null;
  }

  try {
    const tokenData = token.split(".")[1];
    const normalizedTokenData = tokenData.replace(/-/g, "+").replace(/_/g, "/");

    return JSON.parse(atob(normalizedTokenData));
  } catch {
    return null;
  }
}

export function updateSessionUser(userData) {
  const currentUser = getSessionUser();

  if (!currentUser) {
    return;
  }

  sessionStorage.setItem(
    "aulia_user",
    JSON.stringify({
      ...currentUser,
      ...userData,
      token: currentUser.token,
    })
  );
}