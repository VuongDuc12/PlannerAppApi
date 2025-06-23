import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCoursesByPlan } from '../../api/authApi';

const StudyPlanCoursesPage = () => {
  const { planId } = useParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (planId) {
      getCoursesByPlan(Number(planId)).then(res => {
        setCourses(res.data.data);
        setLoading(false);
      });
    }
  }, [planId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link to={-1 as any} className="text-indigo-600 hover:underline">← Quay lại</Link>
        <h2 className="text-xl font-semibold">Danh sách môn học đăng ký</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <ul className="space-y-2">
            {courses.map(course => (
              <li key={course.id} className="border-b py-2">
                <span className="font-medium">Mã môn: {course.courseId}</span>
                {/* Nếu API trả về tên môn, hiển thị thêm */}
                {/* <span className="ml-2">{course.courseName}</span> */}
              </li>
            ))}
            {courses.length === 0 && <div>Không có môn học nào.</div>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudyPlanCoursesPage; 