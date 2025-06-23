// src/layouts/AdminLayout.tsx
import React, { useState, createContext, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FiMenu, FiBell, FiSearch, FiSettings } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

// Context để các trang con có thể set tiêu đề động
export const AdminPageContext = createContext({
  setTitle: (title: string) => {},
  setDescription: (desc: string) => {},
});

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [pageDesc, setPageDesc] = useState<string | null>(null);

  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    const pathMap: { [key: string]: string } = {
      'admin': 'Dashboard',
      'users': 'Quản lý người dùng',
      'subjects': 'Quản lý môn học',
      'topics': 'Quản lý topic môn học',
      'plan-templates': 'Quản lý mẫu kế hoạch',
      'studyplans': 'Quản lý kế hoạch học tập',
    };
    const path = location.pathname.split('/').pop() || 'admin';
    return pathMap[path] || 'Dashboard';
  };

  const getDescription = () => {
    if (pageDesc) return pageDesc;
    return 'Quản lý hệ thống TLU Study Planner';
  };

  const getBreadcrumb = () => {
    const pathMap: { [key: string]: string } = {
      'admin': 'Dashboard',
      'users': 'Người dùng',
      'subjects': 'Môn học',
      'topics': 'Topic môn học',
      'plan-templates': 'Mẫu kế hoạch',
      'studyplans': 'Kế hoạch học tập',
    };
    const path = location.pathname.split('/').pop() || 'admin';
    return pathMap[path] || 'Dashboard';
  };

  return (
    <AdminPageContext.Provider value={{ setTitle: setPageTitle, setDescription: setPageDesc }}>
    <div className="flex h-screen bg-gray-50 font-sans">
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Left side - Mobile menu and title */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <FiMenu className="h-5 w-5" />
              </button>
              
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p className="text-sm text-gray-500">{getDescription()}</p>
              </div>
            </div>

            {/* Right side - Search, notifications, settings */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <div className="absolute left-3 text-gray-400">
                  <FiSearch className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 relative">
                <FiBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200">
                <FiSettings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:hidden">{getPageTitle()}</h2>
                  <nav className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Admin</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{getBreadcrumb()}</span>
                  </nav>
                </div>
                
                {/* Page Actions - Will be overridden by individual pages */}
                <div className="flex items-center space-x-3">
                  {/* This area can be used by individual pages for action buttons */}
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
    </AdminPageContext.Provider>
  );
};

export default AdminLayout;
