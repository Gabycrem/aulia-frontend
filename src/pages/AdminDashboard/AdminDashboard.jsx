import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import './AdminDashboard.css';
function AdminDashboard() {
    return (
        <DashboardLayout role="admin">
            <section className="admin-dashboard">
                <h1>Dashboard de Admin</h1>
            </section>
        </DashboardLayout>
    );
}

export default AdminDashboard;