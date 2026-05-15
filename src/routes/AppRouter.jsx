import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login/Login';
import GabDashboard from '../pages/GabDashboard/GabDashboard';
import TeacherDashboard from '../pages/TeacherDashboard/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard/StudentDashboard';
import DirectDashboard from '../pages/DirectDashboard/DirectDashboard';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard/gabinete" element={<GabDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/directivo" element={<DirectDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;