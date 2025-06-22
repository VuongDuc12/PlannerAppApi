import React from 'react';
import { FiUsers, FiBookOpen, FiClock, FiTrendingUp, FiUserCheck, FiBarChart, FiArrowUp, FiArrowDown, FiEye, FiDownload, FiCalendar, FiTarget } from 'react-icons/fi';

const stats = [
  { 
    label: 'Tổng người dùng', 
    value: '2,847', 
    change: '+12%',
    changeType: 'increase',
    icon: <FiUsers className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50'
  },
  { 
    label: 'Môn học đang hoạt động', 
    value: '156', 
    change: '+8%',
    changeType: 'increase',
    icon: <FiBookOpen className="h-6 w-6" />,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50'
  },
  { 
    label: 'Sinh viên đăng ký', 
    value: '1,847', 
    change: '+23%',
    changeType: 'increase',
    icon: <FiUserCheck className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50'
  },
  { 
    label: 'Tỷ lệ hoàn thành', 
    value: '89%', 
    change: '+5%',
    changeType: 'increase',
    icon: <FiTarget className="h-6 w-6" />,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50'
  },
];

const recentActivities = [
  { 
    user: 'Nguyễn Văn An', 
    action: 'đã hoàn thành môn học', 
    subject: 'Lập trình Web',
    time: '2 phút trước',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d'
  },
  { 
    user: 'Trần Thị Bình', 
    action: 'đã đăng ký môn học mới', 
    subject: 'Cơ sở dữ liệu',
    time: '5 phút trước',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d'
  },
  { 
    user: 'Lê Văn Cường', 
    action: 'đã đạt được huy hiệu', 
    subject: 'Học tập xuất sắc',
    time: '10 phút trước',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d'
  },
  { 
    user: 'Phạm Thị Dung', 
    action: 'đã hoàn thành bài tập', 
    subject: 'Lập trình Java',
    time: '15 phút trước',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
];

const topSubjects = [
  { name: 'Lập trình Web', students: 234, completion: 89, color: 'from-blue-500 to-indigo-600' },
  { name: 'Cơ sở dữ liệu', students: 189, completion: 76, color: 'from-emerald-500 to-teal-600' },
  { name: 'Lập trình Java', students: 156, completion: 82, color: 'from-purple-500 to-pink-600' },
  { name: 'Toán rời rạc', students: 134, completion: 68, color: 'from-orange-500 to-red-600' },
];

const topStudents = [
  { name: 'Nguyễn Văn An', score: 98, subjects: 12, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d', rank: 1 },
  { name: 'Trần Thị Bình', score: 95, subjects: 10, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d', rank: 2 },
  { name: 'Lê Văn Cường', score: 92, subjects: 11, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d', rank: 3 },
  { name: 'Phạm Thị Dung', score: 89, subjects: 9, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', rank: 4 },
];

// Stat Card Component
const StatCard = ({ stat }: { stat: typeof stats[0] }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change}
          </span>
          <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
        <div className="text-white">
          {stat.icon}
        </div>
      </div>
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({ activity }: { activity: typeof recentActivities[0] }) => (
  <div className="flex items-start space-x-3 py-3">
    <img src={activity.avatar} alt={activity.user} className="w-8 h-8 rounded-full object-cover" />
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900">
        <span className="font-medium">{activity.user}</span> {activity.action}
        <span className="font-medium text-blue-600"> {activity.subject}</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
    </div>
  </div>
);

// Subject Card Component
const SubjectCard = ({ subject }: { subject: typeof topSubjects[0] }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium text-gray-900">{subject.name}</h4>
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
        <FiBookOpen className="w-4 h-4 text-white" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Sinh viên</span>
        <span className="font-medium text-gray-900">{subject.students}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Hoàn thành</span>
        <span className="font-medium text-gray-900">{subject.completion}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${subject.color}`} 
          style={{ width: `${subject.completion}%` }}
        ></div>
      </div>
    </div>
  </div>
);

// Student Card Component
const StudentCard = ({ student }: { student: typeof topStudents[0] }) => (
  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="relative">
      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-white">{student.rank}</span>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 truncate">{student.name}</p>
      <p className="text-sm text-gray-500">{student.subjects} môn học</p>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-gray-900">{student.score}%</p>
      <p className="text-xs text-gray-500">Điểm TB</p>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Top Students */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sinh viên xuất sắc</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-3">
              {topStudents.map((student) => (
                <StudentCard key={student.name} student={student} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Subjects */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Môn học nổi bật</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topSubjects.map((subject) => (
            <SubjectCard key={subject.name} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;