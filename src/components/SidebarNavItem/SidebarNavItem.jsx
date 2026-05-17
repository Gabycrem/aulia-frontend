import { NavLink } from 'react-router-dom';
import './SidebarNavItem.css';

function SidebarNavItem({
    to,
    children,
}) {
    return (
        <NavLink
            className='sidebar-nav-item'
            to={to}
            end
        >
            {children}
        </NavLink>
    );
}

export default SidebarNavItem;