import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { getAllCourseTopics, createCourseTopic, updateCourseTopic, deleteCourseTopic, getAllCourses } from '../../api/authApi';
import type { CourseTopic, CreateCourseTopicDto, UpdateCourseTopicDto, PaginatedResponse } from '../../types/courseTopic';
import type { Course } from '../../types/course';
import toast from 'react-hot-toast';

const TopicModal = ({ isOpen, onClose, onSave, topic, courses }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void; 
  topic: CourseTopic | null;
  courses: Course[];
}) => {
  const [formData, setFormData] = useState({
    courseId: 0,
    topicName: '',
    description: ''
  });

  useEffect(() => {
    if (topic) {
      setFormData({
        courseId: topic.courseId,
        topicName: topic.topicName,
        description: topic.description
      });
    } else {
      // Reset for new topic
      setFormData({ courseId: 0, topicName: '', description: '' });
    }
  }, [topic, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'courseId' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.courseId === 0) {
      toast.error('Vui lòng chọn môn học');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{topic ? 'Chỉnh sửa topic' : 'Tạo topic mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Môn học</label>
            <select 
              name="courseId" 
              value={formData.courseId} 
              onChange={handleChange} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              required
            >
              <option value={0}>Chọn môn học</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên topic</label>
            <input 
              type="text" 
              name="topicName" 
              value={formData.topicName} 
              onChange={handleChange} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Hủy</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">{topic ? 'Lưu thay đổi' : 'Tạo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TopicsPage = () => {
  const [topics, setTopics] = useState<CourseTopic[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<CourseTopic | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await getAllCourseTopics({
        pageNumber: 1,
        pageSize: 100
      });
      const data = response.data.data || response.data;
      setTopics(data.items || data);
    } catch (err) {
      setError('Không thể tải danh sách topic.');
      toast.error('Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses({
        pageNumber: 1,
        pageSize: 100
      });
      const data: PaginatedResponse<Course> = response.data;
      setCourses(data.items);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchCourses();
  }, []);
  
  const handleCreate = () => {
    setCurrentTopic(null);
    setIsModalOpen(true);
  };

  const handleEdit = (topic: CourseTopic) => {
    setCurrentTopic(topic);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa topic này?')) {
        toast.promise(
            deleteCourseTopic(id).then(() => {
                fetchTopics(); // Refresh list on success
            }),
            {
                loading: 'Đang xóa...',
                success: <b>Xóa topic thành công!</b>,
                error: <b>Xóa topic thất bại.</b>,
            }
        );
    }
  };
  
  const handleSave = async (data: any) => {
    const isUpdating = !!currentTopic;
    
    const apiCall = () => {
        if(isUpdating) {
            return updateCourseTopic(currentTopic.id, data);
        } else {
            return createCourseTopic(data);
        }
    };

    toast.promise(
        apiCall().then(() => {
            fetchTopics();
            setIsModalOpen(false);
        }),
        {
            loading: isUpdating ? 'Đang cập nhật...' : 'Đang tạo...',
            success: <b>{isUpdating ? 'Cập nhật topic thành công!' : 'Tạo topic thành công!'}</b>,
            error: <b>Đã có lỗi xảy ra.</b>,
        }
    );
  };

  const getCourseName = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.courseName : 'Không xác định';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error && topics.length === 0) return <div className="text-red-500 text-center p-8">Lỗi: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý topic môn học</h1>
          <p className="mt-1 text-gray-600">Thêm, sửa, và xóa topic môn học khỏi hệ thống.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
          <FiPlus className="h-5 w-5 mr-2" />
          Thêm topic
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Môn học</th>
                        <th scope="col" className="px-6 py-3">Tên topic</th>
                        <th scope="col" className="px-6 py-3">Mô tả</th>
                        <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(topic => (
                        <tr key={topic.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {getCourseName(topic.courseId)}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{topic.topicName}</td>
                            <td className="px-6 py-4 max-w-xs truncate">{topic.description}</td>
                            <td className="px-6 py-4 flex justify-center space-x-3">
                                <button onClick={() => handleEdit(topic)} className="text-indigo-600 hover:text-indigo-900"><FiEdit size={18} /></button>
                                <button onClick={() => handleDelete(topic.id)} className="text-rose-600 hover:text-rose-900"><FiTrash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {topics.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">Không có topic nào</div>
          </div>
        )}
      </div>
      
      <TopicModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        topic={currentTopic}
        courses={courses}
      />
    </div>
  );
};

export default TopicsPage; 