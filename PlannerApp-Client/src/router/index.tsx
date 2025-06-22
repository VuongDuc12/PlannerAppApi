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
