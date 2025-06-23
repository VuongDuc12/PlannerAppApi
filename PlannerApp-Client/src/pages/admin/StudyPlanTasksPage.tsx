import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
// You need to implement getTasksByPlan in your API file if not present
// Example: export const getTasksByPlan = (planId: number) => api.get(`/StudyTask/plan/${planId}`);
import { getTasksByPlan } from '../../api/authApi';

const StudyPlanTasksPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const plan = location.state?.plan;
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (planId) {
      getTasksByPlan(Number(planId)).then(res => {
        setTasks(res.data.data);
        setLoading(false);
      });
    }
  }, [planId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link to={-1 as any} className="text-indigo-600 hover:underline">← Quay lại</Link>
        <h2 className="text-xl font-semibold">Danh sách nhiệm vụ của kế hoạch: {plan?.planName || planId}</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="border-b py-2">
                <span className="font-medium">{task.taskName}</span>
                <span className="ml-2 text-gray-500">({task.status})</span>
                {/* Thêm các trường khác nếu cần */}
              </li>
            ))}
            {tasks.length === 0 && <div>Không có nhiệm vụ nào.</div>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudyPlanTasksPage; 