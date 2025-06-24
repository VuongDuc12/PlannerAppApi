import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getStudyPlanById } from '../../api/authApi';
import { AdminPageContext } from '../../layouts/AdminLayout';
import { FiCalendar, FiClock, FiBookOpen, FiCheckCircle, FiXCircle, FiArrowLeft, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

interface Course {
  id: number;
  courseName: string;
  credits: number;
  description: string;
  topics: any[] | null;
}

interface PlanCourse {
  id: number;
  studyPlanId: number;
  courseId: number;
  userId: string;
  course: Course;
  tasks: any[] | null;
}

interface StudyPlan {
  id: number;
  userId: string;
  planName: string;
  startDate: string;
  endDate: string;
  semester: string;
  academicYear: string;
  weeklyStudyGoalHours: number;
  courseCount: number;
  completed: boolean;
  planCourses: PlanCourse[];
}

const StudyPlanDetailPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTitle, setDescription } = useContext(AdminPageContext);

  useEffect(() => {
    if (planId) {
      getStudyPlanById(Number(planId))
        .then(res => {
          setPlan(res.data.data);
          setTitle && setTitle(`Chi tiết kế hoạch: ${res.data.data.planName}`);
          setDescription && setDescription('Thông tin chi tiết kế hoạch học tập');
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching study plan:', error);
          setLoading(false);
        });
    }
  }, [planId]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProgress = () => {
    if (!plan || plan.planCourses.length === 0) return 0;
    const completedCourses = plan.planCourses.filter(pc => pc.tasks && pc.tasks.length > 0);
    return Math.round((completedCourses.length / plan.planCourses.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-12">
        <FiXCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kế hoạch</h3>
        <p className="text-gray-500 mb-4">Kế hoạch học tập này không tồn tại hoặc đã bị xóa.</p>
        <Link to="/admin/studyplans" className="text-indigo-600 hover:text-indigo-500">
          Quay lại danh sách kế hoạch
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to={-1 as any} 
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-2xl font-bold text-gray-900">{plan.planName}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiEdit size={16} />
            <span>Chỉnh sửa</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <FiTrash2 size={16} />
            <span>Xóa</span>
          </button>
        </div>
      </div>

      {/* Plan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trạng thái</p>
              <p className={`text-lg font-semibold ${plan.completed ? 'text-green-600' : 'text-yellow-600'}`}>
                {plan.completed ? 'Hoàn thành' : 'Đang học'}
              </p>
            </div>
            {plan.completed ? (
              <FiCheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <div className="h-8 w-8 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Số môn học</p>
              <p className="text-lg font-semibold text-gray-900">{plan.courseCount}</p>
            </div>
            <FiBookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mục tiêu giờ/tuần</p>
              <p className="text-lg font-semibold text-gray-900">
                {plan.weeklyStudyGoalHours || 'Chưa đặt'}
              </p>
            </div>
            <FiClock className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiến độ</p>
              <p className="text-lg font-semibold text-gray-900">{calculateProgress()}%</p>
            </div>
            <div className="relative">
              <svg className="h-8 w-8 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${calculateProgress()}, 100`}
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FiCalendar className="h-5 w-5 text-indigo-600" />
            <span>Thông tin cơ bản</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Ngày bắt đầu:</span>
              <span className="text-sm text-gray-900">{formatDate(plan.startDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Ngày kết thúc:</span>
              <span className="text-sm text-gray-900">{formatDate(plan.endDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Học kỳ:</span>
              <span className="text-sm text-gray-900">{plan.semester || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Năm học:</span>
              <span className="text-sm text-gray-900">{plan.academicYear || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Mục tiêu giờ/tuần:</span>
              <span className="text-sm text-gray-900">
                {plan.weeklyStudyGoalHours ? `${plan.weeklyStudyGoalHours} giờ` : 'Chưa đặt'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <span>Tóm tắt tiến độ</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Tổng số môn học:</span>
              <span className="text-sm font-semibold text-gray-900">{plan.planCourses.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Môn có nhiệm vụ:</span>
              <span className="text-sm font-semibold text-gray-900">
                {plan.planCourses.filter(pc => pc.tasks && pc.tasks.length > 0).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Tổng số nhiệm vụ:</span>
              <span className="text-sm font-semibold text-gray-900">
                {plan.planCourses.reduce((total, pc) => total + (pc.tasks?.length || 0), 0)}
              </span>
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Tiến độ tổng thể</span>
                <span className="text-sm font-semibold text-gray-900">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FiBookOpen className="h-5 w-5 text-blue-600" />
              <span>Danh sách môn học ({plan.planCourses.length})</span>
            </h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FiPlus size={16} />
              <span>Thêm môn học</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {plan.planCourses.length === 0 ? (
            <div className="text-center py-8">
              <FiBookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có môn học nào</h3>
              <p className="text-gray-500">Bắt đầu bằng cách thêm môn học vào kế hoạch này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plan.planCourses.map((planCourse) => (
                <div 
                  key={planCourse.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/admin/studyplans/${plan.id}/courses/${planCourse.courseId}`, { 
                    state: { planCourse, plan } 
                  })}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">
                      {planCourse.course.courseName}
                    </h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {planCourse.course.credits} TC
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Mã môn:</span>
                      <span>{planCourse.courseId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Nhiệm vụ:</span>
                      <span>{planCourse.tasks?.length || 0} nhiệm vụ</span>
                    </div>
                    {planCourse.course.description && (
                      <p className="text-gray-500 text-xs line-clamp-2">
                        {planCourse.course.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tasks Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <span>Tổng quan nhiệm vụ</span>
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {plan.planCourses.reduce((total, pc) => total + (pc.tasks?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Tổng số nhiệm vụ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {plan.planCourses.filter(pc => pc.tasks && pc.tasks.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">Môn có nhiệm vụ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {plan.planCourses.filter(pc => pc.tasks && pc.tasks.some((task: any) => task.completed)).length}
              </div>
              <div className="text-sm text-gray-600">Nhiệm vụ hoàn thành</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate(`/admin/studyplans/${plan.id}/tasks`, { state: { plan } })}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiCheckCircle size={16} />
              <span>Xem tất cả nhiệm vụ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanDetailPage; 