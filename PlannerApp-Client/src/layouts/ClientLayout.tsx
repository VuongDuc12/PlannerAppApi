// src/layouts/ClientLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiInfo, FiBook, FiCalendar, FiUser, FiMenu, FiX, FiLogIn, FiZap, FiHeart, FiCoffee, FiUsers, FiTrendingUp, FiTarget, FiStar } from 'react-icons/fi';

const ClientLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: <FiHome className="w-5 h-5" />, color: 'from-blue-500 to-indigo-500' },
    { to: '/about', label: 'Giới thiệu', icon: <FiInfo className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { to: '/courses', label: 'Khóa học', icon: <FiBook className="w-5 h-5" />, color: 'from-green-500 to-teal-500' },
    { to: '/planner', label: 'Lập kế hoạch', icon: <FiCalendar className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiZap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    TLU Study Planner
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">Đại học Thủy Lợi</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    isActive(item.to)
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-lg shadow-purple-500/25 transform scale-105'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-white/50 hover:transform hover:scale-105'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive(item.to)
                      ? 'bg-white/20'
                      : `bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 group-hover:scale-110`
                  }`}>
                    <div className={isActive(item.to) ? 'text-white' : 'text-white'}>
                      {item.icon}
                    </div>
                  </div>
                  <span>{item.label}</span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-white/50 rounded-2xl transition-all duration-300 group"
              >
                <FiLogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Đăng nhập</span>
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 group"
              >
                <FiZap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Đăng ký</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-2xl text-gray-700 hover:text-purple-600 hover:bg-white/50 transition-all duration-300 group"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6 group-hover:scale-110 transition-transform" />
                ) : (
                  <FiMenu className="w-6 h-6 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/90 backdrop-blur-sm">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                    isActive(item.to)
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-white/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive(item.to)
                      ? 'bg-white/20'
                      : `bg-gradient-to-r ${item.color} opacity-60`
                  }`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-white/20 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-white/50 rounded-2xl transition-all duration-300"
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl font-medium text-center hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiZap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    TLU Study Planner
                  </h3>
                  <p className="text-purple-300 text-sm">Học thông minh, không học cực</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Công cụ quản lý học tập thông minh giúp sinh viên Đại học Thủy Lợi học tập hiệu quả hơn với AI và gamification.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg flex items-center">
                <FiTarget className="w-5 h-5 mr-2 text-purple-400" />
                Tính năng
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiStar className="w-4 h-4 mr-2 text-purple-400" />
                  Quản lý môn học thông minh
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiStar className="w-4 h-4 mr-2 text-purple-400" />
                  Lập kế hoạch học tập AI
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiStar className="w-4 h-4 mr-2 text-purple-400" />
                  Theo dõi tiến độ real-time
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiStar className="w-4 h-4 mr-2 text-purple-400" />
                  Gamification & Huy hiệu
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg flex items-center">
                <FiUsers className="w-5 h-5 mr-2 text-purple-400" />
                Hỗ trợ
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiCoffee className="w-4 h-4 mr-2 text-purple-400" />
                  Hướng dẫn sử dụng
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiCoffee className="w-4 h-4 mr-2 text-purple-400" />
                  FAQ & Tài liệu
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiCoffee className="w-4 h-4 mr-2 text-purple-400" />
                  Liên hệ hỗ trợ 24/7
                </li>
                <li className="flex items-center hover:text-purple-300 transition-colors">
                  <FiCoffee className="w-4 h-4 mr-2 text-purple-400" />
                  Phản hồi & Góp ý
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg flex items-center">
                <FiHeart className="w-5 h-5 mr-2 text-purple-400" />
                Liên hệ
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                  support@tlustudyplanner.com
                </li>
                <li className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                  (024) 1234-5678
                </li>
                <li className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                  Đại học Thủy Lợi, Hà Nội
                </li>
                <li className="flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                  Giờ làm việc: 8:00 - 18:00
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 TLU Study Planner. Tất cả quyền được bảo lưu. 
              <span className="text-purple-400 ml-2">Made with Ducdev04 for TLU Students</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
