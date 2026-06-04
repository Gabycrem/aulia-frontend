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
    return null;
  }
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