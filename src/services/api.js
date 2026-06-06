const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthToken() {
    const sessionUser = sessionStorage.getItem("aulia_user");

    if (!sessionUser) {
        return null;
    }

    try {
        const parsedUser = JSON.parse(sessionUser);
        return parsedUser.token || null;
    } catch {
        return null;
    }
}

export async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();

    let response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
    } catch {
        throw new Error(
            'No se pudo conectar con el servidor. Verificá que el backend esté disponible e intentá nuevamente.'
        );
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const error = new Error(data?.message || 'Error en la petición');
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}