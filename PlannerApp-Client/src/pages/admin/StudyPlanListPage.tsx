import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getPlansByUser } from '../../api/authApi';
import { AdminPageContext } from '../../layouts/AdminLayout';

const StudyPlanListPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const user = location.state?.user;
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTitle, setDescription } = useContext(AdminPageContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle && setTitle('Kế hoạch học tập của ' + (user?.fullName || user?.userName || userId));
    setDescription && setDescription('Thống kê và danh sách kế hoạch học tập của sinh viên');
  }, [userId, user]);

  useEffect(() => {
    if (userId) {
      getPlansByUser(userId).then(res => {
        setPlans(res.data.data);
        setLoading(false);
      });
    }
  }, [userId]);

  // Helper to format date
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('vi-VN');

  // Calculate statistics
  const stats = {
    total: plans.length,
    active: plans.filter(p => !p.completed).length,
    completed: plans.filter(p => p.completed).length,
    totalCourses: plans.reduce((sum, p) => sum + (p.courseCount || 0), 0),
    avgCoursesPerPlan: plans.length > 0 ? (plans.reduce((sum, p) => sum + (p.courseCount || 0), 0) / plans.length).toFixed(1) : 0
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/admin/studyplans" className="text-indigo-600 hover:underline">← Quay lại danh sách user</Link>
        <h2 className="text-xl font-semibold">
          Kế hoạch học tập của {user?.fullName || user?.userName || userId}
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Tổng kế hoạch</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Đang học</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Hoàn thành</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{stats.totalCourses}</div>
          <div className="text-sm text-gray-600">Tổng môn học</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-2xl font-bold text-indigo-600">{stats.avgCoursesPerPlan}</div>
          <div className="text-sm text-gray-600">TB môn/kế hoạch</div>
        </div>
      </div>

      {/* Study Plans Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Danh sách kế hoạch học tập</h3>
        </div>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">Đang tải...</div>
        ) : plans.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Không có kế hoạch nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên kế hoạch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Học kỳ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mục tiêu (giờ/tuần)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số môn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr 
                    key={plan.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/studyplans/plan/${plan.id}/detail`, { state: { plan, user } })}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{plan.planName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {plan.semester} {plan.academicYear}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {plan.weeklyStudyGoalHours || 'Chưa đặt'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{plan.courseCount || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        plan.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {plan.completed ? 'Hoàn thành' : 'Đang học'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="text-indigo-600 hover:text-indigo-900">
                        Xem chi tiết
                      </span>
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

export default StudyPlanListPage; 