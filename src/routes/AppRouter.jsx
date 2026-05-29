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
import AdminStudents from '../pages/Admin/AdminStudents/List/AdminStudents';
import AdminStudentDetail from "../pages/Admin/AdminStudents/Detail/AdminStudentDetail";
import AdminStudentForm from "../pages/Admin/AdminStudents/Form/AdminStudentForm";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/gabinete"
          element={
            <RoleRoute allowedRoles={['Gabinete']}>
              <GabDashboard />
            </RoleRoute>} />
        <Route
          path="/dashboard/gabinete/alumnos"
          element={
            <RoleRoute allowedRoles={['Gabinete']}>
              <GabStudents />
            </RoleRoute>} />
        <Route
          path="/dashboard/docente"
          element={
            <RoleRoute allowedRoles={['Docente']}>
              <TeacherDashboard />
            </RoleRoute>} />
        <Route
          path="/dashboard/docente/mis-alumnos"
          element={
            <RoleRoute allowedRoles={['Docente']}>
              <TeacherStudents />
            </RoleRoute>} />
        <Route
          path="/dashboard/estudiante"
          element={
            <RoleRoute allowedRoles={['Estudiante']}>
              <StudentDashboard />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/directivo"
          element={
            <RoleRoute allowedRoles={['Directivo']}>
              <DirectDashboard />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/admin"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/admin/gestionar-alumnos"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <AdminStudents />
            </RoleRoute>
          } />
        <Route
          path="/dashboard/admin/alumnos/nuevo"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminStudentForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/alumnos/:id"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminStudentDetail />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/alumnos/:id/editar"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminStudentForm />
            </RoleRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;