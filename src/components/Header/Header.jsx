import { getSessionUser } from '../../utils/session';
import './Header.css';

function Header({ role }) {

    const user = getSessionUser();

    const roleLabels = {
        Admin: 'ADMINISTRADOR',
        Gabinete: 'GABINETE',
        Docente: 'DOCENTE',
        Alumno: 'ESTUDIANTE',
        Directivo: 'DIRECTIVO',
    };

    const roleLabel = roleLabels[user?.role || role] || "USUARIO";

    const displayName =
        user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username || "Usuario";

    const displayEmail = user?.email || "Sin email registrado";
    return (
    <header className="header">
      <div className="header-role">
        {roleLabel}
      </div>

      <div className="header-user">
        <img
          src="https://i.pravatar.cc/40"
          alt="Foto de perfil"
          className="header-user-image"
        />

        <div className="header-user-info">
          <span className="header-user-name">
            {displayName}
          </span>

          <span className="header-user-email">
            {displayEmail}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;