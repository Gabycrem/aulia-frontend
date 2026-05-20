import { NavLink } from 'react-router-dom';
import './SidebarNavItem.css';

function SidebarNavItem({
    to,
    children,
    onClick,
}) {
    return (
        <NavLink
            onClick={onClick}
            className={({ isActive }) =>
                isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item'
            }
            to={to}
            end
        >
            {children}
        </NavLink>
    );
}

export default SidebarNavItem;