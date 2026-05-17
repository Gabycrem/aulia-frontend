import './Header.css';

function Header() {
    return (
        <header className="header">

            <div className="header-role">
                GABINETE
            </div>

            <div className="header-user">

                <img
                    src="https://i.pravatar.cc/40"
                    alt="Foto de perfil"
                    className="header-user-image"
                />

                <div className="header-user-info">

                    <span className="header-user-name">
                        Usuario Prueba
                    </span>

                    <span className="header-user-email">
                        usuarioprueba@gmail.com
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Header;