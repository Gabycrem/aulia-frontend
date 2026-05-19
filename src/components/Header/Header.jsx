import './Header.css';

function Header({ role }) {

    const storedUser = sessionStorage.getItem('aulia_user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const roleLabels = {
        admin: 'ADMINISTRADOR',
        gab: 'GABINETE',
        teacher: 'DOCENTE',
        student: 'ESTUDIANTE',
        direct: 'DIRECTIVO',
    };

    const fullName = user
        ? `${user.firstName} ${user.lastName}`
        : 'Usuario';
    const email = user?.email || '';

    return (
        <header className="header">

            <div className="header-role">
                {roleLabels[user?.role || role]}
            </div>

            <div className="header-user">

                <img
                    src="https://i.pravatar.cc/40"
                    alt="Foto de perfil"
                    className="header-user-image"
                />

                <div className="header-user-info">

                    <span className="header-user-name">
                        {fullName}
                    </span>

                    <span className="header-user-email">
                        {email}
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Header;