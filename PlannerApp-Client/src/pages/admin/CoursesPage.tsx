import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../../api/authApi';
import type { Course, CreateCourseDto, UpdateCourseDto, PaginatedResponse } from '../../types/course';
import toast from 'react-hot-toast';

const SubjectModal = ({ isOpen, onClose, onSave, subject }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; subject: Course | null }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    credits: 0,
    description: ''
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        courseName: subject.courseName,
        credits: subject.credits,
        description: subject.description
      });
    } else {
      // Reset for new subject
      setFormData({ courseName: '', credits: 0, description: '' });
    }
  }, [subject, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'credits' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{subject ? 'Chỉnh sửa môn học' : 'Tạo môn học mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên môn học</label>
            <input 
              type="text" 
              name="courseName" 
              value={formData.courseName} 
              onChange={handleChange} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số tín chỉ</label>
            <input 
              type="number" 
              name="credits" 
              value={formData.credits} 
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
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">{subject ? 'Lưu thay đổi' : 'Tạo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Course | null>(null);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await getAllCourses({
        pageNumber: 1,
        pageSize: 100
      });
      const data: PaginatedResponse<Course> = response.data;
      setSubjects(data.items);
    } catch (err) {
      setError('Không thể tải danh sách môn học.');
      toast.error('Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  
  const handleCreate = () => {
    setCurrentSubject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (subject: Course) => {
    setCurrentSubject(subject);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
        toast.promise(
            deleteCourse(id).then(() => {
                fetchSubjects(); // Refresh list on success
            }),
            {
                loading: 'Đang xóa...',
                success: <b>Xóa môn học thành công!</b>,
                error: <b>Xóa môn học thất bại.</b>,
            }
        );
    }
  };
  
  const handleSave = async (data: any) => {
    const isUpdating = !!currentSubject;
    
    const apiCall = () => {
        if(isUpdating) {
            return updateCourse(currentSubject.id, data);
        } else {
            return createCourse(data);
        }
    };

    toast.promise(
        apiCall().then(() => {
            fetchSubjects();
            setIsModalOpen(false);
        }),
        {
            loading: isUpdating ? 'Đang cập nhật...' : 'Đang tạo...',
            success: <b>{isUpdating ? 'Cập nhật môn học thành công!' : 'Tạo môn học thành công!'}</b>,
            error: <b>Đã có lỗi xảy ra.</b>,
        }
    );
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
  
  if (error && subjects.length === 0) return <div className="text-red-500 text-center p-8">Lỗi: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý môn học</h1>
          <p className="mt-1 text-gray-600">Thêm, sửa, và xóa môn học khỏi hệ thống.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
          <FiPlus className="h-5 w-5 mr-2" />
          Thêm môn học
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tên môn học</th>
                        <th scope="col" className="px-6 py-3">Số tín chỉ</th>
                        <th scope="col" className="px-6 py-3">Mô tả</th>
                        <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subject => (
                        <tr key={subject.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{subject.courseName}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {subject.credits} tín chỉ
                                </span>
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate">{subject.description}</td>
                            <td className="px-6 py-4 flex justify-center space-x-3">
                                <button onClick={() => handleEdit(subject)} className="text-indigo-600 hover:text-indigo-900"><FiEdit size={18} /></button>
                                <button onClick={() => handleDelete(subject.id)} className="text-rose-600 hover:text-rose-900"><FiTrash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">Không có môn học nào</div>
          </div>
        )}
      </div>
      
      <SubjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} subject={currentSubject}/>
    </div>
  );
};

export default SubjectsPage; 