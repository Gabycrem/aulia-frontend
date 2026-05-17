import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import './StudentDashboard.css';
function StudentDashboard() {
    return (
        <DashboardLayout role="student">
            <section className="student-dashboard">
                <h1 className="student-dashboard-title">
                    ¿Cómo te sientís hoy?
                </h1>
            </section>
        </DashboardLayout>
    );
}

export default StudentDashboard;