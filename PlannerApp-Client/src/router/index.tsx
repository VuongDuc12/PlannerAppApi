// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import HomePage from '../pages/client/HomePage';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import UsersPage from '../pages/admin/UsersPage';
import SubjectsPage from '../pages/admin/CoursesPage';
import LoginPage from '../pages/auth/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import TopicsPage from '../pages/admin/TopicsPage';
import PlanTemplatesPage from '../pages/admin/PlanTemplatesPage';
import StudyPlanAdminPage from '../pages/admin/StudyPlanAdminPage';
import StudyPlanListPage from '../pages/admin/StudyPlanListPage';
import StudyPlanDetailPage from '../pages/admin/StudyPlanDetailPage';
import StudyPlanTasksPage from '../pages/admin/StudyPlanTasksPage';
import StudyPlanCoursesPage from '../pages/admin/StudyPlanCoursesPage';
import StudyPlanCourseDetailPage from '../pages/admin/StudyPlanCourseDetailPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> }
     
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'subjects', element: <SubjectsPage /> },
          { path: 'topics', element: <TopicsPage /> },
          { path: 'plan-templates', element: <PlanTemplatesPage /> },
          { path: 'studyplans', element: <StudyPlanAdminPage /> },
          { path: 'studyplans/user/:userId', element: <StudyPlanListPage /> },
          { path: 'studyplans/plan/:planId/detail', element: <StudyPlanDetailPage /> },
          { path: 'studyplans/plan/:planId/tasks', element: <StudyPlanTasksPage /> },
          { path: 'studyplans/plan/:planId/courses', element: <StudyPlanCoursesPage /> },
          { path: 'studyplans/plan/:planId/courses/:courseId', element: <StudyPlanCourseDetailPage /> },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

export default router;
