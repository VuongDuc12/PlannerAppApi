import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getTasksByPlanCourse } from '../../api/authApi';
import { AdminPageContext } from '../../layouts/AdminLayout';
import { FiArrowLeft, FiBookOpen, FiCheckCircle, FiClock, FiFileText, FiLink, FiCalendar, FiUser, FiPlus } from 'react-icons/fi';

interface StudyLog {
  id: number;
  taskId: number;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  notes: string;
}

interface TaskResource {
  id: number;
  taskId: number;
  resourceName: string;
  resourceType: string;
  resourceUrl: string;
  description: string;
}

interface StudyTask {
  id: number;
  planCourseId: number;
  studyPlanId: number;
  studyPlanName: string;
  courseId: number;
  courseName: string;
  courseTopicId: number | null;
  taskName: string;
  taskDescription: string;
  estimatedHours: number;
  dueDate: string;
  scheduledDate: string;
  status: string;
  completionDate: string | null;
  logs: StudyLog[];
  resources: TaskResource[];
}

interface PlanCourse {
  id: number;
  studyPlanId: number;
  courseId: number;
  course: {
    id: number;
    courseCode: string;
    courseName: string;
    credits: number;
    description: string;
  };
}

interface StudyPlan {
  id: number;
  planName: string;
  userId: string;
}

const StudyPlanCourseDetailPage = () => {
  const { planId, courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTitle, setDescription } = useContext(AdminPageContext);
  
  const planCourse = location.state?.planCourse as PlanCourse;
  const plan = location.state?.plan as StudyPlan;
  const user = location.state?.user;

  useEffect(() => {
    if (planCourse) {
      setTitle && setTitle(`Chi tiết môn học: ${planCourse.course.courseName}`);
      setDescription && setDescription(`Thông tin chi tiết môn học và các nhiệm vụ`);
    }
  }, [planCourse]);

  useEffect(() => {
    if (planCourse?.id) {
      fetchTasks();
    }
  }, [planCourse]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasksByPlanCourse(planCourse.id);
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'InProgress':
        return 'bg-blue-100 text-blue-800';
      case 'ToDo':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'Hoàn thành';
      case 'InProgress':
        return 'Đang thực hiện';
      case 'ToDo':
        return 'Chưa bắt đầu';
      default:
        return status;
    }
  };

  const calculateTotalStudyTime = () => {
    return tasks.reduce((total, task) => {
      return total + task.logs.reduce((taskTotal, log) => taskTotal + log.durationMinutes, 0);
    }, 0);
  };

  const handleBackNavigation = () => {
    if (plan) {
      navigate(`/admin/studyplans/plan/${plan.id}/detail`, { state: { plan, user } });
    } else {
      navigate('/admin/studyplans');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!planCourse) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy thông tin môn học</h3>
        <p className="text-gray-500 mb-4">Vui lòng quay lại trang trước.</p>
        <button 
          onClick={handleBackNavigation}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBackNavigation}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-2xl font-bold text-gray-900">{planCourse.course.courseName}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus size={16} />
            <span>Thêm nhiệm vụ</span>
          </button>
        </div>
      </div>

      {/* Course Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FiBookOpen className="h-5 w-5 text-blue-600" />
          <span>Thông tin môn học</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Mã môn học:</span>
              <span className="text-sm text-gray-900">{planCourse.course.courseCode}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Tên môn học:</span>
              <span className="text-sm text-gray-900">{planCourse.course.courseName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Số tín chỉ:</span>
              <span className="text-sm text-gray-900">{planCourse.course.credits}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Kế hoạch:</span>
              <span className="text-sm text-gray-900">{plan?.planName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Số nhiệm vụ:</span>
              <span className="text-sm text-gray-900">{tasks.length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Tổng thời gian học:</span>
              <span className="text-sm text-gray-900">{calculateTotalStudyTime()} phút</span>
            </div>
          </div>
        </div>
        {planCourse.course.description && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">Mô tả:</span>
            <p className="text-sm text-gray-900 mt-1">{planCourse.course.description}</p>
          </div>
        )}
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <span>Danh sách nhiệm vụ ({tasks.length})</span>
          </h3>
        </div>
        
        <div className="p-6">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có nhiệm vụ nào</h3>
              <p className="text-gray-500">Bắt đầu bằng cách thêm nhiệm vụ cho môn học này.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{task.taskName}</h4>
                      {task.taskDescription && (
                        <p className="text-sm text-gray-600 mt-1">{task.taskDescription}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="h-4 w-4" />
                      <span>Hạn: {task.dueDate ? formatDate(task.dueDate) : 'Chưa đặt'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiClock className="h-4 w-4" />
                      <span>Ước tính: {task.estimatedHours || 0} giờ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiFileText className="h-4 w-4" />
                      <span>Logs: {task.logs.length}</span>
                    </div>
                  </div>

                  {/* Study Logs */}
                  {task.logs.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Lịch sử học tập:</h5>
                      <div className="space-y-2">
                        {task.logs.map((log) => (
                          <div key={log.id} className="bg-gray-50 rounded p-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span>{formatDateTime(log.startTime)} - {formatDateTime(log.endTime)}</span>
                              <span className="font-medium">{log.durationMinutes} phút</span>
                            </div>
                            {log.notes && <p className="text-gray-600 mt-1">{log.notes}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {task.resources.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Tài liệu:</h5>
                      <div className="space-y-2">
                        {task.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center space-x-2 text-xs">
                            <FiLink className="h-3 w-3 text-blue-500" />
                            <a 
                              href={resource.resourceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {resource.resourceName}
                            </a>
                            <span className="text-gray-500">({resource.resourceType})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCourseDetailPage; 