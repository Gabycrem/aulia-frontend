import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RoleRoute from './RoleRoute';
import Login from '../pages/Login/Login';
import GabDashboard from '../pages/Gabinete/GabDashboard/GabDashboard';
import GabStudents from "../pages/Gabinete/GabStudents/List/GabStudents";
import GabStudentCaseDetail from "../pages/Gabinete/GabStudents/Detail/GabStudentCaseDetail";
import GabNewCase from "../pages/Gabinete/GabStudents/NewCase/GabNewCase";
import GabAgenda from '../pages/Gabinete/GabAgenda/GabAgenda';
import GabReferrals from '../pages/Gabinete/GabReferrals/GabReferrals';
import GabAlerts from '../pages/Gabinete/GabAlerts/GabAlerts';
import GabInterventions from "../pages/Gabinete/GabInterventions/List/GabInterventions";
import GabInterventionForm from "../pages/Gabinete/GabInterventions/Form/GabInterventionForm";
import TeacherDashboard from '../pages/Teacher/TeacherDashboard/TeacherDashboard';
import TeacherStudents from '../pages/Teacher/TeacherStudents/TeacherStudents';
import TeacherReferral from '../pages/Teacher/TeacherReferral/TeacherReferral';
import TeacherAgenda from '../pages/Teacher/TeacherAgenda/TeacherAgenda';
import StudentDashboard from '../pages/StudentDashboard/StudentDashboard';
import DirectDashboard from '../pages/DirectDashboard/DirectDashboard';
import AdminDashboard from '../pages/Admin/AdminDashboard/AdminDashboard';
import AdminStudents from '../pages/Admin/AdminStudents/List/AdminStudents';
import AdminStudentDetail from "../pages/Admin/AdminStudents/Detail/AdminStudentDetail";
import AdminStudentForm from "../pages/Admin/AdminStudents/Form/AdminStudentForm";
import AdminTeachers from "../pages/Admin/AdminTeachers/List/AdminTeachers";
import AdminTeacherForm from "../pages/Admin/AdminTeachers/Form/AdminTeacherForm";
import AdminTeacherDetail from "../pages/Admin/AdminTeachers/Detail/AdminTeacherDetail";
import AdminTeacherAssignments from "../pages/Admin/AdminTeachers/Assignments/AdminTeacherAssignments";
import AdminGabinete from "../pages/Admin/AdminGab/List/AdminGabinete";
import AdminGabineteForm from "../pages/Admin/AdminGab/Form/AdminGabineteForm";
import AdminGabineteDetail from "../pages/Admin/AdminGab/Detail/AdminGabineteDetail";
import AdminSubjects from "../pages/Admin/AdminSettings/Subjects/AdminSubjects";
import AdminCourses from "../pages/Admin/AdminSettings/Courses/AdminCourses";
import AdminRoles from "../pages/Admin/AdminSettings/Roles/AdminRoles";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* Rutas del Flujo de GABINETE */}
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
          path="/dashboard/gabinete/alumnos/:studentId/caso"
          element={
            <RoleRoute allowedRoles={["Gabinete"]}>
              <GabStudentCaseDetail />
            </RoleRoute>} />
        <Route
          path="/dashboard/gabinete/casos/nuevo"
          element={
            <RoleRoute allowedRoles={["Gabinete"]}>
              <GabNewCase />
            </RoleRoute>
          }
        />
        <Route
          path="/dashboard/gabinete/agenda"
          element={
            <RoleRoute allowedRoles={['Gabinete']}>
              <GabAgenda />
            </RoleRoute>} />
        <Route
          path="/dashboard/gabinete/derivaciones"
          element={
            <RoleRoute allowedRoles={['Gabinete']}>
              <GabReferrals />
            </RoleRoute>
          }
        />
        <Route
          path="/dashboard/gabinete/alertas"
          element={
            <RoleRoute allowedRoles={['Gabinete']}>
              <GabAlerts />
            </RoleRoute>
          }
        />
        <Route
          path="/dashboard/gabinete/intervenciones"
          element={
            <RoleRoute allowedRoles={["Gabinete"]}>
              <GabInterventions />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/gabinete/intervenciones/nueva"
          element={
            <RoleRoute allowedRoles={["Gabinete"]}>
              <GabInterventionForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/gabinete/alumnos/:studentId/intervencion/nueva"
          element={
            <RoleRoute allowedRoles={["Gabinete"]}>
              <GabInterventionForm />
            </RoleRoute>
          }
        />
        {/*---------------------------- */}
        {/* Rutas del Flujo de DOCENTE */}
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
          path="/dashboard/docente/solicitar-intervencion"
          element={
            <RoleRoute allowedRoles={['Docente']}>
              <TeacherReferral />
            </RoleRoute>} />
        <Route
          path="/dashboard/docente/agenda"
          element={
            <RoleRoute allowedRoles={['Docente']}>
              <TeacherAgenda />
            </RoleRoute>
          }
        />
        {/*---------------------------- */}
        {/* Rutas del Flujo de ALUMNO */}
        <Route
          path="/dashboard/estudiante"
          element={
            <RoleRoute allowedRoles={['Alumno']}>
              <StudentDashboard />
            </RoleRoute>
          } />
        {/*---------------------------- */}
        {/* Rutas del Flujo de DIRECTIVO */}
        <Route
          path="/dashboard/directivo"
          element={
            <RoleRoute allowedRoles={['Directivo']}>
              <DirectDashboard />
            </RoleRoute>
          } />
        {/*---------------------------- */}
        {/* Rutas del Flujo de ADMIN */}
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
          path="/dashboard/admin/gestionar-docentes"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminTeachers />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/docentes/nuevo"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminTeacherForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/docentes/:id/editar"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminTeacherForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/docentes/:id"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminTeacherDetail />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/docentes/:id/asignaciones"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminTeacherAssignments />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/gestionar-gabinete"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminGabinete />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/gabinete/nuevo"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminGabineteForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/gabinete/:id"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminGabineteDetail />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/gabinete/:id/editar"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminGabineteForm />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/configuracion/materias"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminSubjects />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/configuracion/cursos"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminCourses />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard/admin/configuracion/roles"
          element={
            <RoleRoute allowedRoles={["Admin"]}>
              <AdminRoles />
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