import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudyPlanAdminSummary } from '../../api/authApi';
import { AdminPageContext } from '../../layouts/AdminLayout';
import { FiEye, FiUser, FiBookOpen, FiCheckCircle, FiClock, FiTrendingUp, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface UserPlanSummary {
  userId: string;
  userName: string;
  userEmail: string;
  totalPlans: number;
  activePlans: number;
  completedPlans: number;
  pendingPlans: number;
}

interface StudyPlanAdminSummary {
  totalUsers: number;
  totalPlans: number;
  totalActivePlans: number;
  totalCompletedPlans: number;
  totalPendingPlans: number;
  users: UserPlanSummary[];
}

const StudyPlanAdminPage = () => {
  const [adminSummary, setAdminSummary] = useState<StudyPlanAdminSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'active' | 'pending'>('all');
  const navigate = useNavigate();
  const { setTitle, setDescription } = useContext(AdminPageContext);

  useEffect(() => {
    setTitle && setTitle('Quản lý kế hoạch học tập');
    setDescription && setDescription('Thống kê và danh sách sinh viên có kế hoạch học tập');
  }, []);

  useEffect(() => {
    fetchAdminSummary();
  }, []);

  const fetchAdminSummary = async () => {
    try {
      setLoading(true);
      const response = await getStudyPlanAdminSummary();
      setAdminSummary(response.data.data);
    } catch (error) {
      console.error('Error fetching admin summary:', error);
      toast.error('Không thể tải dữ liệu quản lý kế hoạch học tập');
    } finally {
      setLoading(false);
    }
  };

  const handleViewUserPlans = (user: UserPlanSummary) => {
    navigate(`/admin/studyplans/user/${user.userId}`, { 
      state: { 
        user: {
          userId: user.userId,
          fullName: user.userName,
          email: user.userEmail
        }
      } 
    });
  };

  // Filter users based on search and status
  const filteredUsers = adminSummary?.users.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'completed' && (user.completedPlans || 0) > 0) ||
                         (filterStatus === 'active' && (user.activePlans || 0) > 0) ||
                         (filterStatus === 'pending' && (user.pendingPlans || 0) > 0);
    
    return matchesSearch && matchesStatus;
  }) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý kế hoạch học tập</h1>
          <p className="text-gray-600 mt-1">
            Thống kê tổng quan về kế hoạch học tập của sinh viên
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng sinh viên</p>
              <p className="text-2xl font-bold text-gray-900">{adminSummary?.totalUsers || 0}</p>
            </div>
            <FiUser className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng kế hoạch</p>
              <p className="text-2xl font-bold text-gray-900">{adminSummary?.totalPlans || 0}</p>
            </div>
            <FiBookOpen className="h-8 w-8 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang học</p>
              <p className="text-2xl font-bold text-yellow-600">{adminSummary?.totalActivePlans || 0}</p>
            </div>
            <FiClock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">{adminSummary?.totalCompletedPlans || 0}</p>
            </div>
            <FiCheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chờ bắt đầu</p>
              <p className="text-2xl font-bold text-purple-600">{adminSummary?.totalPendingPlans || 0}</p>
            </div>
            <FiTrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm sinh viên</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc email sinh viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tất cả sinh viên</option>
              <option value="active">Có kế hoạch đang học</option>
              <option value="completed">Có kế hoạch hoàn thành</option>
              <option value="pending">Có kế hoạch chờ bắt đầu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Danh sách sinh viên</h3>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <FiUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sinh viên nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sinh viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng kế hoạch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đang học
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoàn thành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chờ bắt đầu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                          <div className="text-sm text-gray-500">{user.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{user.totalPlans || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-yellow-600">{user.activePlans || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">{user.completedPlans || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-purple-600">{user.pendingPlans || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewUserPlans(user)}
                        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900"
                      >
                        <FiEye size={14} />
                        <span>Xem kế hoạch</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanAdminPage; 