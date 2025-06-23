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
    setDescription && setDescription('Danh sách kế hoạch học tập của sinh viên');
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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link to="/admin/studyplans" className="text-indigo-600 hover:underline">← Quay lại danh sách user</Link>
        <h2 className="text-xl font-semibold">
          Danh sách kế hoạch của {user?.fullName || user?.userName || userId}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center">Đang tải...</div>
        ) : (
          plans.length === 0 ? (
            <div className="col-span-full text-center">Không có kế hoạch nào.</div>
          ) : (
            plans.map(plan => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/admin/studyplans/${plan.id}/courses`, { state: { plan } })}
                title="Xem danh sách môn học đăng ký của kế hoạch này"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-indigo-700">{plan.planName}</h3>
                  {/* Trạng thái hoàn thành: bạn cần backend trả về, ví dụ: plan.completed */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {plan.completed ? 'Hoàn thành' : 'Đang học'}
                  </span>
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Thời gian:</span> {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Học kỳ:</span> {plan.semester} | <span className="font-medium">Năm học:</span> {plan.academicYear}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Mục tiêu giờ/tuần:</span> {plan.weeklyStudyGoalHours ?? 'Chưa đặt'}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Số môn đăng ký:</span> {plan.courseCount}
                </div>
                <div className="mt-2">
                  <span className="text-blue-600 text-sm underline">Xem môn học</span>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default StudyPlanListPage; 