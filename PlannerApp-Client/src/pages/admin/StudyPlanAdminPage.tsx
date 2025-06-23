import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPlanStats } from '../../api/authApi';

const StudyPlanAdminPage = () => {
  const [userStats, setUserStats] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPlanStats().then(res => setUserStats(res.data.data));
  }, []);

  const handleViewPlans = (user: any) => {
    navigate(`/admin/studyplans/${user.userId}`, { state: { user } });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Thống kê Study Plan theo User</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Số lượng plan</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userStats.map(user => (
              <tr key={user.userId} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.fullName || user.userName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.planCount}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button
                    onClick={() => handleViewPlans(user)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Xem kế hoạch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyPlanAdminPage; 