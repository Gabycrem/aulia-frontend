import logoAulia from '../../assets/logos/logo-aulia.png';

import './Logo.css';

function Logo({
    className = '',
}) {
    return (
        <img
            src={logoAulia}
            alt="Logo AULIA"
            className={className}
        />
    );
}

export default Logo;