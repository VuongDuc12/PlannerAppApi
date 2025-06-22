import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { loginUser, registerUser } from '../../api/authApi';

// Helper Components (defined outside the main component)

const RightPanel = () => (
  <div
    className="hidden lg:flex w-1/2 bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1170')" }}
  >
    <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
      <div className="text-white text-center p-12">
        <h2 className="text-4xl font-bold mb-4">Chào mừng trở lại!</h2>
        <p className="text-xl">Đăng nhập để tiếp tục quản lý công việc và kế hoạch của bạn một cách hiệu quả.</p>
      </div>
    </div>
  </div>
);

const LoginForm = ({ onSubmit, data, onChange, error }: any) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiUser className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="text"
        name="username"
        placeholder="Tên đăng nhập hoặc Email"
        value={data.username}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiLock className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={data.password}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center text-gray-600">
        <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <span className="ml-2">Ghi nhớ tôi</span>
      </label>
      <a href="#" className="font-semibold text-indigo-600 hover:underline">
        Quên mật khẩu?
      </a>
    </div>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
    >
      Đăng nhập
    </button>
  </form>
);

const RegisterForm = ({ onSubmit, data, onChange, error }: any) => (
  <form className="space-y-6" onSubmit={onSubmit}>
     <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiUser className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="text"
        name="fullName"
        placeholder="Họ và tên"
        value={data.fullName}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiMail className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiLock className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={data.password}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
     <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiLock className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        value={data.confirmPassword}
        onChange={onChange}
        required
        className="w-full pl-10 pr-3 py-3 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
    >
      Đăng kí
    </button>
  </form>
);

// Main Component
const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(loginData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        navigate('/admin');
      } else {
        setError(response.data.message || 'Đăng nhập không thành công.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    try {
      const username = registerData.email.split('@')[0];
      const apiData = {
        username: username,
        email: registerData.email,
        password: registerData.password,
        fullName: registerData.fullName,
        role: 'User', // Default role
      };
      const response = await registerUser(apiData);
      if (response.data.success) {
        setActiveTab('login');
        setRegisterData({ email: '', password: '', confirmPassword: '', fullName: '' });
        alert('Đăng kí thành công! Vui lòng đăng nhập.');
      } else {
        setError(response.data.message || 'Đăng kí không thành công.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">TLU Planner</h1>
            <p className="text-gray-600 mt-2">Chào mừng đến với trang quản lý của Admin</p>
          </header>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 p-1 bg-gray-200 rounded-lg">
               <button
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`w-28 py-2 rounded-md font-semibold text-sm transition-colors duration-300 ${
                  activeTab === 'login' ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`w-28 py-2 rounded-md font-semibold text-sm transition-colors duration-300 ${
                  activeTab === 'register' ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                Đăng kí
              </button>
            </div>
          </div>
          
          {activeTab === 'login' ? (
            <LoginForm 
              onSubmit={handleLoginSubmit}
              data={loginData}
              onChange={handleLoginChange}
              error={error}
            />
          ) : (
            <RegisterForm 
              onSubmit={handleRegisterSubmit}
              data={registerData}
              onChange={handleRegisterChange}
              error={error}
            />
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Hoặc tiếp tục với</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-indigo-500 transition-colors"><FaGoogle /></a>
              <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-indigo-500 transition-colors"><FaFacebook /></a>
              <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-indigo-500 transition-colors"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <RightPanel />
      </main>
    </div>
  );
};

export default LoginPage; 