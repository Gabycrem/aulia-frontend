import './DashboardLayout.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

function DashboardLayout({ role, children }) {
    return (
        <div className='dashboard-layout'>
            <Sidebar role={role} />
            <div className='dashboard-main'>
                <Header role={role} />
                <main className='dashboard-content'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;