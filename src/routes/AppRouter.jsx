import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RoleRoute from './RoleRoute';
import Login from '../pages/Login/Login';
import GabDashboard from '../pages/Gabinete/GabDashboard/GabDashboard';
import GabStudents from "../pages/Gabinete/GabStudents/GabStudents";
import TeacherDashboard from '../pages/Teacher/TeacherDashboard/TeacherDashboard';
import TeacherStudents from '../pages/Teacher/TeacherStudents/TeacherStudents';
import StudentDashboard from '../pages/StudentDashboard/StudentDashboard';
import DirectDashboard from '../pages/DirectDashboard/DirectDashboard';
import AdminDashboard from '../pages/Admin/AdminDashboard/AdminDashboard';
import AdminStudents from '../pages/Admin/AdminStudents/AdminStudents';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/gabinete"
          element={
            <RoleRoute allowedRoles={['gab']}>
              <GabDashboard />
            </RoleRoute>} />
        <Route
          path="/dashboard/gabinete/alumnos"
          element={
            <RoleRoute allowedRoles={['gab']}>
              <GabStudents />
            </RoleRoute>} />
        <Route
          path="/dashboard/docente"
          element={
            <RoleRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </RoleRoute>} />
        <Route
          path="/dashboard/docente/mis-alumnos"
          element={
            <RoleRoute allowedRoles={['teacher']}>
              <TeacherStudents/>
            </RoleRoute>} />
        <Route
          path="/dashboard/estudiante"
          element={
            <RoleRoute allowedRoles={['student']}>
              <StudentDashboard />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/directivo"
          element={
            <RoleRoute allowedRoles={['direct']}>
              <DirectDashboard />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/admin"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleRoute>
          } />
          <Route
          path="/dashboard/admin/gestionar-alumnos"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminStudents />
            </RoleRoute>
          } />

        <Route
          path="*"
          element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;