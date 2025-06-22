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
];

const SidebarContent = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    onLinkClick(); // Close sidebar on mobile after logout
  };

  return (
    <div className="flex h-full flex-col bg-gray-800 text-white">
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-700">
        <div className="flex items-center">
          <FiGrid className="h-8 w-8 text-indigo-400" />
          <span className="ml-3 text-xl font-bold">TLU Planner</span>
        </div>
        <button onClick={onLinkClick} className="lg:hidden p-1 text-gray-400 hover:text-white">
          <FiX size={24} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="ml-4">{link.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center">
          <img
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            src={`https://ui-avatars.com/api/?name=${user.fullName || 'User'}&background=random&color=fff`}
            alt="User avatar"
          />
          <div className="ml-3 overflow-hidden">
            <p className="truncate text-sm font-semibold">{user.fullName || 'Guest'}</p>
            <p className="truncate text-xs text-gray-400">{user.email || ''}</p>
          </div>
          <button onClick={handleLogout} title="Đăng xuất" className="ml-auto p-2 rounded-md transition-colors hover:bg-gray-700">
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};


const Sidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (isOpen: boolean) => void }) => {
  return (
    <>
      {/* Mobile Sidebar: Overlay, shown/hidden by `sidebarOpen` state */}
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
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar: Always visible, part of the layout */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <SidebarContent onLinkClick={() => {}} /> {/* onLinkClick does nothing on desktop */}
      </div>
    </>
  );
};

export default Sidebar;
