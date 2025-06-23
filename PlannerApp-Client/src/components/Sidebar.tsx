// src/components/Sidebar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiBookOpen, FiClipboard, FiFileText, FiLogOut, FiGrid, FiX } from 'react-icons/fi';

const navLinks = [
  { to: '/admin', icon: <FiHome size={20} />, text: 'Thống kê' },
  { to: '/admin/users', icon: <FiUsers size={20} />, text: 'Quản lý người dùng' },
  { to: '/admin/subjects', icon: <FiBookOpen size={20} />, text: 'Quản lý môn học' },
  { to: '/admin/topics', icon: <FiClipboard size={20} />, text: 'Quản lý topic môn học' },
  { to: '/admin/plan-templates', icon: <FiFileText size={20} />, text: 'Quản lý mẫu kế hoạch' },
  { to: '/admin/studyplans', icon: <FiFileText size={20} />, text: 'Quản lý kế hoạch học tập' },
];

const SidebarContent = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    onLinkClick();
  };

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 h-20 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FiGrid className="h-7 w-7 text-white" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">TLU Planner</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
        <button 
          onClick={onLinkClick} 
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-200 ${
              'bg-gray-100 group-hover:bg-gray-200'
            }`}>
              <div className="text-gray-500 group-hover:text-gray-700">
                {link.icon}
              </div>
            </div>
            <span>{link.text}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-100 p-4">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
          <div className="flex items-center">
            <div className="relative">
              <img
                className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white shadow-md"
                src={`https://ui-avatars.com/api/?name=${user.fullName || 'User'}&background=4f46e5&color=fff&size=128`}
                alt="User avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4 flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-gray-900">{user.fullName || 'Guest'}</p>
              <p className="truncate text-xs text-gray-500">{user.email || ''}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              title="Đăng xuất" 
              className="p-2 rounded-xl transition-all duration-200 hover:bg-red-50 hover:text-red-600 group"
            >
              <FiLogOut size={18} className="group-hover:scale-105 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (isOpen: boolean) => void }) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
        <SidebarContent onLinkClick={() => {}} />
      </div>
    </>
  );
};

export default Sidebar;
