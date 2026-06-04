import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import './Sidebar.css';
import Logo from '../Logo/Loco';
import Button from '../Button/Button';
import SidebarNavItem from '../SidebarNavItem/SidebarNavItem';
import { menuByRole } from '../../data/menuByRole';
import { useNavigate } from 'react-router-dom';
import { clearSession } from "../../utils/session";

function Sidebar({ role }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = menuByRole[role] || [];
    const navigate = useNavigate();

    const handleLogout = () => {
        clearSession();
        navigate('/login');
    };

    const handleToggleMenu = () => {
        setIsOpen((currentValue) => !currentValue);
    };

    const handleCloseMenu = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-mobile-header">
                <Logo className="sidebar-logo" />

                <div className="sidebar-mobile-actions">
                    <button
                        type="button"
                        className="sidebar-icon-button"
                        onClick={handleLogout}
                        aria-label="Cerrar sesión"
                        title="Cerrar sesión"
                    >
                        <LogOut size={22} strokeWidth={2} />
                    </button>

                    <button
                        type="button"
                        className="sidebar-icon-button"
                        onClick={handleToggleMenu}
                        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X size={24} strokeWidth={2} />
                        ) : (
                            <Menu size={24} strokeWidth={2} />
                        )}
                    </button>
                </div>
            </div>

            <div className="sidebar-content">
                <Logo className="sidebar-logo sidebar-desktop-logo" />

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <SidebarNavItem
                            key={item.path || item.label}
                            item={item}
                            onClick={handleCloseMenu}
                        />
                    ))}
                </nav>

                <Button
                    className="sidebar-btn-end sidebar-logout-desktop"
                    type="button"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;
