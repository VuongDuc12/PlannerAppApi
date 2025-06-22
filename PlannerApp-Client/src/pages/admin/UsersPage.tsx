import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../api/authApi';
import UserTableSkeleton from '../../components/UserTableSkeleton';
import toast from 'react-hot-toast';

// TypeScript Interfaces based on your DTOs
interface User {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  roles: string[];
  emailConfirmed: boolean;
}

const UserModal = ({ isOpen, onClose, onSave, user }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; user: User | null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    role: 'User'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        password: '', // Password should not be pre-filled
        role: user.roles?.[0] || 'User',
      });
    } else {
      // Reset for new user
      setFormData({ fullName: '', userName: '', email: '', password: '', role: 'User' });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{user ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          {!user && (
             <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
          )}
           <div>
            <label className="block text-sm font-medium text-gray-700">Vai trò</label>
            <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>User</option>
                <option>Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Hủy</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">{user ? 'Lưu thay đổi' : 'Tạo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if(response.data.success) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message);
        toast.error('Tải danh sách người dùng thất bại.');
      }
    } catch (err) {
      setError('Không thể tải danh sách người dùng.');
      toast.error('Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleCreate = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        toast.promise(
            deleteUser(id).then(() => {
                fetchUsers(); // Refresh list on success
            }),
            {
                loading: 'Đang xóa...',
                success: <b>Xóa người dùng thành công!</b>,
                error: <b>Xóa người dùng thất bại.</b>,
            }
        );
    }
  };
  
  const handleSave = async (data: any) => {
    const isUpdating = !!currentUser;
    
    const apiCall = () => {
        if(isUpdating) {
            const updateData = {
                fullName: data.fullName,
                userName: data.userName,
                email: data.email,
            }
            return updateUser(currentUser.id, updateData);
        } else {
            return createUser(data);
        }
    };

    toast.promise(
        apiCall().then(() => {
            fetchUsers();
            setIsModalOpen(false);
        }),
        {
            loading: isUpdating ? 'Đang cập nhật...' : 'Đang tạo...',
            success: (res: any) => <b>{res.data?.message || (isUpdating ? 'Cập nhật thành công!' : 'Tạo người dùng thành công!')}</b>,
            error: (err) => <b>{err.response?.data?.message || 'Đã có lỗi xảy ra.'}</b>,
        }
    );
  };

  if (loading) return <UserTableSkeleton />;
  if (error && users.length === 0) return <div className="text-red-500 text-center p-8">Lỗi: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
          <p className="mt-1 text-gray-600">Thêm, sửa, và xóa người dùng khỏi hệ thống.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
          <FiPlus className="h-5 w-5 mr-2" />
          Thêm người dùng
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Họ và tên</th>
                        <th scope="col" className="px-6 py-3">Tên đăng nhập</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Vai trò</th>
                        <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                            <td className="px-6 py-4">{user.userName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                {user.roles.map(role => (
                                    <span key={role} className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${role === 'Admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                                        {role}
                                    </span>
                                ))}
                            </td>
                            <td className="px-6 py-4 flex justify-center space-x-3">
                                <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900"><FiEdit size={18} /></button>
                                <button onClick={() => handleDelete(user.id)} className="text-rose-600 hover:text-rose-900"><FiTrash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} user={currentUser}/>
    </div>
  );
};

export default UsersPage;
