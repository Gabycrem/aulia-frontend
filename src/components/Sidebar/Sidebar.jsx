import './Sidebar.css';
import logoAulia from '../../assets/logos/logo-aulia.png';
import Logo from '../Logo/Loco';
import Button from '../Button/Button';
import SidebarNavItem from '../SidebarNavItem/SidebarNavItem';
import { menuByRole } from '../../data/menuByRole';
import { useNavigate } from 'react-router-dom';

function Sidebar({ role }) {
    const menuItems = menuByRole[role] || [];
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('aulia_user');
        navigate('/login');
    };
    return (
        <aside className='sidebar'>
            <Logo className='sidebar-logo' />
            <nav className='sidebar-nav'>
                {menuItems.map((item) => (
                    <SidebarNavItem 
                        key={item.path}
                        to={item.path}
                    >
                        {item.label}
                    </SidebarNavItem>
                ))}
            </nav>
            <Button className='sidebar-btn-end' type='button' onClick={handleLogout}>Cerrar Sesión</Button>
        </aside>
    );
}

export default Sidebar;