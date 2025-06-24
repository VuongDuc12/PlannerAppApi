import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudyPlanAdminSummary } from '../../api/authApi';
import { AdminPageContext } from '../../layouts/AdminLayout';
import { FiEye, FiCalendar, FiBookOpen, FiCheckCircle, FiUser, FiClock, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface StudyPlanSummary {
  id: number;
  planName: string;
  startDate: string;
  endDate: string;
  semester: string;
  academicYear: string;
  courseCount: number | null;
  completed: boolean | null;
  status: string;
}

interface UserPlanSummary {
  userId: string;
  userName: string;
  userEmail: string;
  totalPlans: number;
  activePlans: number;
  completedPlans: number;
  pendingPlans: number;
  plans: StudyPlanSummary[];
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
    setDescription && setDescription('Thống kê và xem danh sách kế hoạch học tập của sinh viên');
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewUserPlans = (user: UserPlanSummary) => {
    navigate(`/admin/studyplans/user/${user.userId}`, { 
      state: { 
        user: {
          id: user.userId,
          name: user.userName,
          email: user.userEmail
        }
      } 
    });
  };

  const handleViewPlanDetail = (plan: StudyPlanSummary) => {
    navigate(`/admin/studyplans/${plan.id}/detail`, { 
      state: { plan } 
    });
  };

  // Filter users based on search and status
  const filteredUsers = adminSummary?.users.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'completed' && user.completedPlans > 0) ||
                         (filterStatus === 'active' && user.activePlans > 0) ||
                         (filterStatus === 'pending' && user.pendingPlans > 0);
    
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
            <input
              type="text"
              placeholder="Tìm theo tên hoặc email sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="active">Có kế hoạch đang học</option>
              <option value="completed">Có kế hoạch hoàn thành</option>
              <option value="pending">Có kế hoạch chờ bắt đầu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FiUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sinh viên nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.userId} className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* User Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <FiUser className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.userName}</h3>
                      <p className="text-sm text-gray-600">{user.userEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewUserPlans(user)}
                    className="flex items-center space-x-2 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <FiEye size={14} />
                    <span>Xem tất cả kế hoạch</span>
                  </button>
                </div>
              </div>

              {/* User Statistics */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.totalPlans}</p>
                    <p className="text-xs text-gray-600">Tổng kế hoạch</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{user.activePlans}</p>
                    <p className="text-xs text-gray-600">Đang học</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{user.completedPlans}</p>
                    <p className="text-xs text-gray-600">Hoàn thành</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{user.pendingPlans}</p>
                    <p className="text-xs text-gray-600">Chờ bắt đầu</p>
                  </div>
                </div>
              </div>

              {/* Recent Plans */}
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Kế hoạch gần đây</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {user.plans.slice(0, 6).map((plan) => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 mr-2">
                          {plan.planName}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          plan.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : plan.status === 'Active'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {plan.status === 'Completed' ? 'Hoàn thành' : 
                           plan.status === 'Active' ? 'Đang học' : 'Chờ bắt đầu'}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="h-3 w-3" />
                          <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiBookOpen className="h-3 w-3" />
                          <span>{plan.courseCount || 0} môn học</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewPlanDetail(plan)}
                        className="w-full text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Xem chi tiết →
                      </button>
                    </div>
                  ))}
                </div>
                {user.plans.length > 6 && (
                  <div className="text-center mt-3">
                    <button
                      onClick={() => handleViewUserPlans(user)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Xem tất cả {user.plans.length} kế hoạch
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyPlanAdminPage; 