import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { getSessionUser, updateSessionUser } from "../../utils/session";
import "./Header.css";

function Header({ role }) {
  const [user, setUser] = useState(() => getSessionUser());

  useEffect(() => {
    async function loadUserProfile() {
      if (!user?.id || user?.email) {
        return;
      }

      try {
        const response = await getUserById(user.id);
        const fullUser = response?.user || response?.data || response;

        if (!fullUser) {
          return;
        }

        const updatedUser = {
          ...user,
          ...fullUser,
        };

        updateSessionUser(updatedUser);
        setUser(updatedUser);
      } catch {
        // No bloquea el header si no se puede cargar el perfil.
      }
    }

    loadUserProfile();
  }, [user]);

  const roleLabels = {
    Admin: "ADMINISTRADOR",
    Gabinete: "GABINETE",
    Docente: "DOCENTE",
    Alumno: "ESTUDIANTE",
    Directivo: "DIRECTIVO",
  };

  const roleLabel = roleLabels[user?.role || role] || "USUARIO";

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "Usuario";

  const displayEmail = user?.email || "Sin email registrado";

  return (
    <header className="header">
      <div className="header-role">{roleLabel}</div>

      <div className="header-user">
        <img
          src="https://i.pravatar.cc/40"
          alt="Foto de perfil"
          className="header-user-image"
        />

        <div className="header-user-info">
          <span className="header-user-name">{displayName}</span>

          <span className="header-user-email">{displayEmail}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;