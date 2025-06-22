import React from 'react';
import { FiUsers, FiBookOpen, FiClock, FiTrendingUp, FiUserCheck, FiBarChart, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const stats = [
  { label: 'Người dùng hoạt động', value: '27/80', icon: <FiUsers className="h-6 w-6 text-indigo-500" /> },
  { label: 'Môn học', value: '3,298', icon: <FiBookOpen className="h-6 w-6 text-cyan-500" /> },
  { label: 'Số lượng sinh viên', value: '1,200', icon: <FiClock className="h-6 w-6 text-amber-500" /> },
  { label: 'Tốc độ phát triển', value: '64%', icon: <FiTrendingUp className="h-6 w-6 text-emerald-500" /> },
  { label: 'Sinh viên tiềm năng', value: '86%', icon: <FiUserCheck className="h-6 w-6 text-rose-500" /> },
  { label: 'Lượt truy cập', value: '+34%', icon: <FiBarChart className="h-6 w-6 text-violet-500" /> },
];

const subjects = [
  { name: 'Lập trình phân tán', percent: 74, img: `https://i.pravatar.cc/150?u=a042581f4e29026704d` },
  { name: 'Android', percent: 52, img: `https://i.pravatar.cc/150?u=a042581f4e29026705d` },
  { name: 'Cấu trúc dữ liệu giải thuật', percent: 36, img: `https://i.pravatar.cc/150?u=a042581f4e29026706d` },
];

const devSubjects = [
  { name: 'Tư tưởng hồ chí minh', percent: 95, img: `https://i.pravatar.cc/150?u=a042581f4e29026707d` },
  { name: 'Bóng đá', percent: 92, img: `https://i.pravatar.cc/150?u=a042581f4e29026708d` },
  { name: 'Chơi game', percent: 89, img: `https://i.pravatar.cc/150?u=a042581f4e29026709d` },
];

const students = [
  { name: 'Vương Văn H', score: 637, percent: 98, img: `https://i.pravatar.cc/150?u=a042581f4e29026701d`, rank: 1, up: true },
  { name: 'Phan Văn A', score: 637, percent: 88, img: `https://i.pravatar.cc/150?u=a042581f4e29026702d`, rank: 2, up: false },
  { name: 'Nguyễn Thị A', score: 500, percent: 90, img: `https://i.pravatar.cc/150?u=a042581f4e29026703d`, rank: 3, up: true },
  { name: 'Đinh Thị B', score: 480, percent: 85, img: `https://i.pravatar.cc/150?u=a042581f4e29026714d`, rank: 4, up: false },
];

// Component Card Thống kê
const StatCard = ({ item }: { item: typeof stats[0] }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 transition-transform transform hover:-translate-y-1">
    <div className="bg-gray-100 p-3 rounded-full">
      {item.icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{item.label}</p>
      <p className="text-2xl font-bold text-gray-800">{item.value}</p>
    </div>
  </div>
);

// Component Môn học với thanh tiến độ
const SubjectProgress = ({ subject, color }: { subject: typeof subjects[0], color: string }) => (
  <div>
    <div className="flex items-center mb-2">
      <img src={subject.img} alt={subject.name} className="h-9 w-9 rounded-full mr-3 object-cover"/>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{subject.name}</p>
      </div>
      <span className={`text-sm font-semibold ${color}`}>{subject.percent}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`${color.replace('text-', 'bg-')} h-2 rounded-full`} style={{ width: `${subject.percent}%` }}></div>
    </div>
  </div>
);

// Component Danh sách Sinh viên
const StudentListItem = ({ student }: { student: typeof students[0] }) => (
  <li className="flex items-center space-x-4 py-3">
    <span className="text-lg font-bold text-gray-400 w-5 text-center">{student.rank}</span>
    <img src={student.img} alt={student.name} className="h-10 w-10 rounded-full object-cover"/>
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{student.name}</p>
      <p className="text-sm text-gray-500">{student.score} Điểm - {student.percent}% Tiến độ</p>
    </div>
    {student.up ? 
      <FiArrowUp className="h-5 w-5 text-emerald-500" /> : 
      <FiArrowDown className="h-5 w-5 text-rose-500" />
    }
  </li>
);

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
        <p className="mt-1 text-gray-600">Tổng quan dữ liệu và hoạt động gần đây.</p>
      </div>

      {/* Grid các card thống kê */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      {/* Grid nội dung chính */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cột chính (bên trái) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Môn học nổi bật</h3>
            <div className="space-y-5">
              {subjects.map(s => <SubjectProgress key={s.name} subject={s} color="text-rose-500"/>)}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Môn học phát triển</h3>
             <div className="space-y-5">
              {devSubjects.map(s => <SubjectProgress key={s.name} subject={s} color="text-emerald-500"/>)}
            </div>
          </div>
        </div>

        {/* Cột phụ (bên phải) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sinh viên tiêu biểu</h3>
            <ul className="divide-y divide-gray-200">
              {students.map((student) => (
                <StudentListItem key={student.name} student={student} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;