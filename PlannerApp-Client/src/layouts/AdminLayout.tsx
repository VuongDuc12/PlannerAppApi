// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
 // Assuming you have a Sidebar component
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Adjust the import path as necessary
const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
