// src/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FiMenu } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar visibility
  const location = useLocation();

  const getPageTitle = () => {
    // A simple function to create a readable title from the URL path
    const path = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Sidebar now handles its own mobile/desktop presentation */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header (Visible only on mobile) */}
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <FiMenu className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{getPageTitle()}</h1>
          <div className="w-8" /> {/* Spacer to balance the title */}
        </header>
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
